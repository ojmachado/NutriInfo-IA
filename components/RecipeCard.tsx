import React from 'react';
import { Recipe, Translation } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  t: Translation;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite, t }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 leading-tight">{recipe.name}</h3>
          <button
            onClick={() => onToggleFavorite(recipe)}
            className={`ml-2 p-1.5 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-red-400'
            }`}
            aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <svg 
              className={`w-6 h-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-3">{recipe.description}</p>
        
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 bg-slate-50 p-2 rounded-lg inline-flex">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recipe.prepTime}
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs border-t border-slate-100 pt-3">
          <div>
            <span className="block font-bold text-slate-700">{recipe.calories}</span>
            <span className="text-slate-400">kcal</span>
          </div>
          <div>
            <span className="block font-bold text-blue-600">{recipe.protein}g</span>
            <span className="text-slate-400">Prot</span>
          </div>
          <div>
            <span className="block font-bold text-green-600">{recipe.carbs}g</span>
            <span className="text-slate-400">Carb</span>
          </div>
          <div>
            <span className="block font-bold text-yellow-600">{recipe.fat}g</span>
            <span className="text-slate-400">Gord</span>
          </div>
        </div>
      </div>
    </div>
  );
};