export type Menu = {
  id: string
  name: string
  description: string
  ingredients: RequireIngredient[]
  category: string
  servings: number
  created_by: string
  imageUrl: string
  steps: Step[]
}
export type Step = {
  step_no: number
  step: string
}

export type RequireIngredient = {
  name: string
  required_quantity: string
  ingredient_id: string
}

export type Ingredient = {
  id: string
  name: string
  category: string
}

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
  expCat?: string
}

export type SortItem = {
  key: string
  value: 'asc' | 'desc'
}
