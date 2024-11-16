import classNames from 'classnames'
import _ from 'lodash'
import { useLocalUpdater } from '@src/core/hooks/useLocalUpdater'
import { toLocalStructure } from '@src/core/utils/converter'
import { useGetGenshinData } from '@src/data/api/genshin'
import { useStore } from '@src/data/providers/app_store_provider'
import { CommonModal } from '@src/presentation/components/common_modal'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'

export const ImportExport = observer(() => {
  const { modalStore, settingStore, importStore, toastStore } = useStore()

  const { data, updateData } = useLocalUpdater('wuwa')

  const saveFile = async (blob: Blob, suggestedName: string) => {
    const blobURL = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobURL
    a.download = suggestedName
    a.style.display = 'none'
    document.body.append(a)
    a.click()
    // Revoke the blob URL and remove the element.
    setTimeout(() => {
      URL.revokeObjectURL(blobURL)
      a.remove()
    }, 1000)
  }

  const onOpenConfirmModal = useCallback((char: number, build: number, artifact: number, onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-circle-question text-yellow"
        title="Overwrite Data?"
        desc={`The file contains ${char} resonators, ${build} builds and ${artifact} echoes.\nAre you sure you want to overwrite the current data with this?`}
        onConfirm={onConfirm}
      />
    )
  }, [])

  return (
    <div className="w-full h-full pb-5 overflow-y-auto">
      <div
        className={classNames(
          'flex flex-col w-full gap-5 p-5 text-white max-w-[1200px] mx-auto',
          _.size(importStore.characters) ? 'h-fit' : 'h-full'
        )}
      >
        <div className="space-y-2">
          <div className="font-bold">Calculator Data Management</div>
          <div className="flex gap-x-2">
            <PrimaryButton
              title="Import from File"
              onClick={() => {
                document.getElementById('importer').click()
              }}
            />
            <PrimaryButton
              title="Export to File"
              onClick={() => {
                const blob = new Blob([data], { type: 'text/json;charset=utf-8' })
                saveFile(blob, 'mdc_ww_export.json')
              }}
            />
          </div>
          <input
            id="importer"
            className="hidden"
            type="file"
            multiple={false}
            accept=".json"
            onChange={(event) => {
              const file = event.target.files[0]
              const reader = new FileReader()
              reader.addEventListener('load', (event) => {
                const data = JSON.parse(event.target.result.toString())
                if (data?.format !== 'MDC')
                  return toastStore.openNotification({
                    title: 'No Data Found or JSON Format Mismatched',
                    icon: 'fa-solid fa-exclamation-circle',
                    color: 'red',
                  })
                onOpenConfirmModal(data?.characters?.length, data?.builds?.length, data?.artifacts?.length, () => {
                  localStorage.setItem(`wuwa_local_storage`, event.target.result.toString())
                  updateData(event.target.result.toString())
                  toastStore.openNotification({
                    title: 'Data Imported Successfully',
                    icon: 'fa-solid fa-circle-check',
                    color: 'green',
                  })
                })
              })
              reader.readAsText(file)
            }}
          />
        </div>
      </div>
    </div>
  )
})
