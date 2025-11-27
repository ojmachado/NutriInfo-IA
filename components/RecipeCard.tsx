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
            className={`ml-2 p-1.5 rounded-full shrink-0 transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-slate-300 bg-slate-50 hover:bg-slate-100 hover:text-red-400'
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

        {/* Compact Nutrition Info */}
        <div className="flex items-center justify-between text-xs mt-auto mb-4 pt-3 border-t border-slate-50">
           <div className="font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1.5 rounded-md">
             {recipe.calories} <span className="font-normal text-slate-500">kcal</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="px-2 py-1.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100/50" title={t.protein}>
               {recipe.protein}g <span className="font-normal text-blue-400 text-[10px]">P</span>
             </div>
             <div className="px-2 py-1.5 rounded-md bg-green-50 text-green-700 font-bold border border-green-100/50" title={t.carbs}>
               {recipe.carbs}g <span className="font-normal text-green-400 text-[10px]">C</span>
             </div>
             <div className="px-2 py-1.5 rounded-md bg-yellow-50 text-yellow-700 font-bold border border-yellow-100/50" title={t.fat}>
               {recipe.fat}g <span className="font-normal text-yellow-400 text-[10px]">G</span>
             </div>
           </div>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => onViewRecipe(recipe)}
            className="w-full py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-brand-100"
          >
            {t.viewRecipe}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe);
            }}
            className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 border group/btn ${
              isFavorite 
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {!isFavorite ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {t.addToFavorites}
              </>
            ) : (
              <>
                {/* Default State: Saved */}
                <span className="flex items-center gap-2 group-hover/btn:hidden">
                  <svg className="w-4 h-4 fill-current" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {t.saved}
                </span>
                
                {/* Hover State: Remove */}
                <span className="hidden group-hover/btn:flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {t.removeFromFavorites}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};