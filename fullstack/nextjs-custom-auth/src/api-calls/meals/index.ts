import { Ingredient } from "@/app/(public)/nutrition-meals/own-overview/CreateNewMealSection";
import axios from "axios";
export const getSingleIngredient = async (data: { ingredient: string }) => {
  return await axios.post("/api/meal/getIngredient", data);
};

export const createMeal = async (data: {
  name: string;
  description: string;
  ingredients: Ingredient[];
}) => {
  return await axios.post("/api/meal/create", data);
};
export const updateMeal = async (data: {
  name: string;
  description: string;
  ingredients: Ingredient[];
  id: string;
}) => {
  return await axios.put("/api/meal/update", data);
};

export const deleteMeal = async (data: { id: string }) => {
  return await axios.post("/api/meal/delete", { data });
};
