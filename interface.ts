
//menu interface-----------------------------------
interface Ingredient {
  name: string;
  required_quantity: string;
  ingredient_id: string;
}

interface Step {
  step_no: number;
  step: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
  servings: number;
  created_by: string;
  image_url:string;
  steps: Step[];
}

interface Menu {
  item: MenuItem;
}


//Fridge---------------------------------------------------------
interface FridgeItem {
  id: string;
  user_id: string;
  ingredient_id: string;
  quantity: string;
  added_date: { seconds: number };
  expired_date: { seconds: number };
}
interface FridgeItemToUpdate { //+name, remaining amount (this field is for menu/[mid]/cook page)
  id: string;
  user_id: string;
  name:string;
  ingredient_id: string;
  quantity: string;
  remaining_amount: string;
  added_date: { seconds: number };
  expired_date: { seconds: number };
}
interface IngredientItem {
  id: string;
  name: string;
  category: string;
}

//pop over---------------------------------------------------------
interface SuccessPopOverProps {
  name: string;
  onClick: () => void;
}