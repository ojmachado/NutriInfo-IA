export type LanguageCode = 'pt-BR' | 'en-US';

export interface Recipe {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
}

export interface NutritionData {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  emoji?: string;
  recipes: Recipe[];
}

export interface Translation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  loading: string;
  errorGeneric: string;
  errorApiKey: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  sodium: string;
  servingSize: string;
  macroDistribution: string;
  footer: string;
  recipesTitle: string;
  addToFavorites: string;
  removeFromFavorites: string;
  favoritesTitle: string;
  noFavorites: string;
  prepTime: string;
  close: string;
  savedRecipes: string;
}

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translation;
}