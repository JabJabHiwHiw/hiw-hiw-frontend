import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

//menu interface-----------------------------------
export interface MenuIngredient {
    id: string;
    name: string;
    required_quantity: string;
    ingredient_id: string;
}

export interface CookingStep {
    step_no: number;
    step: string; 
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    ingredients: MenuIngredient[];
    steps: CookingStep[];
    category: string;
    servings: number;
    created_by: string;
    image_url: string;
}

//fridge interface--------------------------------------------------------
export interface FridgeItem {
    id: string;                      
    user_id: string;                
    ingredient_id: string;          
    quantity: string;               
    added_date: Timestamp;          
    expired_date: Timestamp;        
}

// FridgeItemsResponse interface representing the response for fridge items
export interface FridgeItemsResponse {
    items: FridgeItem[];            
    error: string;                  
}
