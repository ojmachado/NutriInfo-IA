import React from 'react';
import { Recipe, Translation } from '../types';
import { RecipeCard } from './RecipeCard';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  onViewRecipe: (recipe: Recipe) => void;
  t: Translation;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({ 
  isOpen, 
  onClose, 
  favorites, 
  onToggleFavorite,
  onViewRecipe,
  t 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-slate-200">
          
          {/* Header */}
          <div className="bg-white px-4 py-4 sm:px-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
            <h3 className="text-xl font-bold leading-6 text-slate-900" id="modal-title">
              {t.favoritesTitle}
            </h3>
            <button
              type="button"
              className="rounded-full p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">{t.close}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="bg-slate-50/50 px-4 py-6 sm:px-6 max-h-[70vh] overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                  <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-900">{t.noFavorites}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.subtitle}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe, index) => (
                  <RecipeCard
                    key={`${recipe.name}-${index}`}
                    recipe={recipe}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                    onViewRecipe={onViewRecipe}
                    t={t}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-slate-100">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};