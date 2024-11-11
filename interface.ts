
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


//---------------------------------------------------------
