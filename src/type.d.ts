export interface Meal {
    category: string,
    description: string,
    calories: number,
}

export interface ApiMeal {
    [id: string]: Meal[]
}