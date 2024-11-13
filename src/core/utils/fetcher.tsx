import { Element, ElementIcon, TagsImage, WeaponIcon, WeaponType } from '@src/domain/constant'

export const getEmote = (emote: string) => `https://cdn.wanderer.moe/genshin-impact/emotes/${emote}.png`

export const getElementImage = (value: string) => `/asset/elements/${ElementIcon[value]}`

export const getTalentWeaponImage = (value: string) => `/asset/talent/${WeaponIcon[value]}`

export const getAvatar = (path: string) => `/asset/avatar/bust/T_IconRole_Pile_${path}_UI.webp`

export const getSideAvatar = (order: string) =>
  order ? `/asset/avatar/portrait/T_IconRoleHead256_${order}_UI.webp` : ''

export const getGachaAvatar = (path: string) => (path ? `/asset/avatar/gacha/UI_Gacha_AvatarImg_${path}.webp` : '')

export const getTalentIcon = (path: string) => `/asset/talent/${path}.webp`

export const getWeaponImage = (path: string) => (path ? `/asset/weapon/${path}` : '')

export const getEchoImage = (path: string) => `/asset/echo/${path}.webp`

export const getTagsImage = (path: string) => `/asset/icons/${TagsImage[path]}.webp`