import React from 'react';
import { Recipe, Translation } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  onViewRecipe: (recipe: Recipe) => void;
  t: Translation;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isFavorite, 
  onToggleFavorite,
  onViewRecipe,
  t 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-brand-700 transition-colors">{recipe.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe);
            }}
            className={`ml-2 p-1.5 rounded-full transition-all duration-200 shrink-0 ${
              isFavorite 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-red-400'
            }`}
            aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <svg 
              className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'fill-none'}`} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mb-4">
           <span className="bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {recipe.prepTime}
           </span>
           <span className="bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             {recipe.servings}
           </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs border-t border-slate-100 pt-3 mt-auto">
          <div>
            <span className="block font-bold text-slate-700">{recipe.calories}</span>
            <span className="text-slate-400">kcal</span>
          </div>
          <div>
            <span className="block font-bold text-blue-600">{recipe.protein}g</span>
            <span className="text-slate-400">P</span>
          </div>
          <div>
            <span className="block font-bold text-green-600">{recipe.carbs}g</span>
            <span className="text-slate-400">C</span>
          </div>
          <div>
            <span className="block font-bold text-yellow-600">{recipe.fat}g</span>
            <span className="text-slate-400">G</span>
          </div>
        </div>

        <button
          onClick={() => onViewRecipe(recipe)}
          className="mt-4 w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1 group-hover:bg-brand-600 group-hover:text-white"
        >
          {t.viewRecipe}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};