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
