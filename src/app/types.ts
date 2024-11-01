export type MenuDetail = {
  id: string
  name: string
  description: string
  imageUrl: string
  isFavorite: boolean
  isOwner: boolean
}

export type UserData = {
  id: string
  username: string
  email: string
  profileImageURL: string
}

export type Menus = {
  menus: MenuDetail[]
}

export type Notification = {
  id: string
  message: string
  expireDate: string
}

export type FridgeItem = {
  name: string
  quantity: string
  addedDate: Date
  expiredDate: Date
  category: string
  expTag?: string
}

export type SortItem = {
  key: string
  value: 'asc' | 'desc'
}
