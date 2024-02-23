export interface MealAdd {
    category: string,
    description: string,
    calories: number,
}

export interface ApiMeal {
    [id: string]: MealAdd[]
}

export interface Meal  extends MealAdd{
    id: string
}

