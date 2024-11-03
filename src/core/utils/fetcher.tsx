import { Element, ElementIcon, WeaponIcon, WeaponType } from '@src/domain/constant'

export const getEmote = (emote: string) => `https://cdn.wanderer.moe/genshin-impact/emotes/${emote}.png`

export const getElementImage = (value: string) => `/asset/elements/${ElementIcon[value]}`

export const getTalentWeaponImage = (value: string) => `/asset/talent/${WeaponIcon[value]}`

export const getAvatar = (path: string) => `/asset/avatar/bust/T_IconRole_Pile_${path}_UI.webp`

export const getSideAvatar = (order: string) => (order ? `/asset/avatar/portrait/T_IconRoleHead256_${order}_UI.webp` : '')

export const getGachaAvatar = (path: string) => (path ? `/asset/avatar/gacha/UI_Gacha_AvatarImg_${path}.webp` : '')

export const getTalentIcon = (path: string) => `/asset/talent/${path}.webp`

export const getWeaponImage = (path: string) => `/asset/weapon/T_IconWeapon${path}_UI.webp`

export const getArtifactImage = (path: string, type: number) => `/asset/artifact/${path}_${type}.png`

export const getEnemyImage = (path: string) => `/asset/monster/${path}.png`
