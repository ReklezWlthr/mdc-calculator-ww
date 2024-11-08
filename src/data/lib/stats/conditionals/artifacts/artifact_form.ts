import { Element, IArtifact, Stats } from '@src/domain/constant'
import { StatsObject } from '../../baseConstant'
import _ from 'lodash'
import { IContent } from '@src/domain/conditional'
import { findContentById, findEcho } from '@src/core/utils/finder'
import { Sonata, SonataDetail } from '@src/data/db/artifacts'

export const ArtifactForm = (rover: boolean) => {
  const content: IContent[] = [
    {
      trace: 'Sonata',
      type: 'toggle',
      text: Sonata.FIRE,
      title: Sonata.FIRE,
      content: SonataDetail[Sonata.FIRE][1].desc,
      show: true,
      default: true,
      id: Sonata.FIRE,
    },
    {
      trace: 'Sonata',
      type: 'number',
      text: Sonata.THUNDER,
      title: Sonata.THUNDER,
      content: SonataDetail[Sonata.THUNDER][1].desc,
      show: true,
      default: 1,
      min: 0,
      max: 2,
      id: Sonata.THUNDER,
    },
    {
      trace: 'Sonata',
      type: 'toggle',
      text: Sonata.WIND,
      title: Sonata.WIND,
      content: SonataDetail[Sonata.WIND][1].desc,
      show: true,
      default: true,
      id: Sonata.WIND,
    },
    {
      trace: 'Sonata',
      type: 'number',
      text: Sonata.HAVOC,
      title: Sonata.HAVOC,
      content: SonataDetail[Sonata.HAVOC][1].desc,
      show: true,
      default: 1,
      min: 0,
      max: 4,
      id: Sonata.HAVOC,
    },
    {
      trace: 'Sonata',
      type: 'toggle',
      text: Sonata.LIGHT,
      title: Sonata.LIGHT,
      content: SonataDetail[Sonata.LIGHT][1].desc,
      show: true,
      default: true,
      id: Sonata.LIGHT,
    },
    {
      trace: 'Sonata',
      type: 'number',
      text: Sonata.ICE,
      title: Sonata.ICE,
      content: SonataDetail[Sonata.ICE][1].desc,
      show: true,
      default: 1,
      min: 0,
      max: 3,
      id: Sonata.ICE,
    },
    {
      trace: 'Sonata',
      type: 'toggle',
      text: Sonata.HEAL,
      title: Sonata.HEAL,
      content: SonataDetail[Sonata.HEAL][1].desc,
      show: true,
      default: true,
      id: Sonata.HEAL,
    },
    {
      trace: 'Sonata',
      type: 'number',
      text: Sonata.ATK,
      title: Sonata.ATK,
      content: SonataDetail[Sonata.ATK][1].desc,
      show: true,
      default: 1,
      min: 0,
      max: 4,
      id: Sonata.ATK,
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Jué',
      title: 'Jué',
      content: findEcho('6000060')?.desc,
      show: true,
      default: true,
      id: '6000060',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Fallacy of No Return',
      title: 'Fallacy of No Return',
      content: findEcho('6000061')?.desc,
      show: true,
      default: true,
      id: '6000061',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Tempest Mephis',
      title: 'Tempest Mephis',
      content: findEcho('6000039')?.desc,
      show: true,
      default: true,
      id: '6000039',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Crownless',
      title: 'Crownless',
      content: findEcho('6000042')?.desc,
      show: true,
      default: true,
      id: '6000042',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Feilian Beringal',
      title: 'Feilian Beringal',
      content: findEcho('6000043')?.desc,
      show: true,
      default: true,
      id: '6000043',
    },
    {
      trace: 'Main Echo',
      type: 'number',
      text: 'Lampylumen Myriad',
      title: 'Lampylumen Myriad',
      content: findEcho('6000044')?.desc,
      show: true,
      default: 3,
      min: 0,
      max: 3,
      id: '6000044',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Mourning Aix',
      title: 'Mourning Aix',
      content: findEcho('6000045')?.desc,
      show: true,
      default: true,
      id: '6000045',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Mech Abomination',
      title: 'Mech Abomination',
      content: findEcho('6000048')?.desc,
      show: true,
      default: true,
      id: '6000048',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Thundering Mephis',
      title: 'Thundering Mephis',
      content: findEcho('390080003')?.desc,
      show: true,
      default: true,
      id: '390080003',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Bell-Borne Geochelone',
      title: 'Bell-Borne Geochelone',
      content: findEcho('390080005')?.desc,
      show: true,
      default: true,
      id: '390080005',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Inferno Rider',
      title: 'Inferno Rider',
      content: findEcho('390080007')?.desc,
      show: true,
      default: true,
      id: '390080007',
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Rover - Dreamless',
      title: 'Rover - Dreamless',
      content: findEcho('6000053')?.desc,
      show: rover,
      default: true,
      id: '6000053',
    },
  ]

  const teamContent: IContent[] = [findContentById(content, Sonata.HEAL), findContentById(content, '6000061'), findContentById(content, '390080005')]

  const allyContent: IContent[] = [
    {
      trace: 'Sonata',
      type: 'toggle',
      text: Sonata.REGEN,
      title: Sonata.REGEN,
      content: SonataDetail[Sonata.REGEN][1].desc,
      show: true,
      default: false,
      id: Sonata.REGEN,
    },
    {
      trace: 'Main Echo',
      type: 'toggle',
      text: 'Impermanence Heron',
      title: 'Impermanence Heron',
      content: findEcho('6000052')?.desc,
      show: true,
      default: false,
      id: '6000052',
    },
  ]

  return { content, teamContent, allyContent }
}
