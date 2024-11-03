import _ from 'lodash'
import classNames from 'classnames'

export interface TextInputProps {
  value?: string
  placeholder?: string
  iconLeading?: string
  iconTailing?: string
  disabled?: boolean
  required?: boolean
  onChange: (value: string) => void
  style?: string
  type?: 'text' | 'number'
  max?: number
  min?: number
  small?: boolean
}

export const TextInput = (props: TextInputProps) => {
  //---------------------
  //  RENDER
  //---------------------
  return (
    <div
      className={classNames(
        'rounded-lg w-full flex items-center transition-colors px-2 py-1 duration-200 relative overflow-hidden border font-normal',
        props.disabled
          ? 'bg-primary-bg border-primary'
          : 'bg-primary-darker hover:border-primary-lighter border-primary-light',
        props.style
      )}
    >
      {props.iconLeading && <img src={props.iconLeading} className="object-cover w-6 h-6 mr-2 rounded-full" />}
      <input
        type={props.type}
        max={props.max}
        min={props.min}
        value={props?.value}
        disabled={props.disabled}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (props?.disabled) return
          if (props?.type === 'number' && !e.target?.value?.match(/-?\d*.?\d*/)) return
          if (props?.type === 'number' && props.max && parseFloat(e.target?.value) > props.max)
            return props.onChange(props.max.toString())
          if (props?.type === 'number' && props.min && parseFloat(e.target?.value) < props.min)
            return props.onChange(props.min.toString())
          props.onChange(e.target?.value)
        }}
        placeholder={props.placeholder}
        className={classNames(
          'w-full outline-none placeholder:text-primary-light text-gray transition-colors duration-200 bg-transparent',
          {
            'cursor-not-allowed': props.disabled,
            'border-TextInput-colorBorderDefault text-TextInput-colorTextDisable bg-TextInput-colorBgDisable cursor-not-allowed':
              props.disabled,
          },
          props.small ? 'text-xs' : 'text-sm'
        )}
      />
      {props.iconTailing && (
        <i
          className={classNames(
            `w-[16px] h-[16px] absolute right-[12px] text-TextInput-colorTextDefault `,
            props?.iconTailing
          )}
        />
      )}
    </div>
  )
}
