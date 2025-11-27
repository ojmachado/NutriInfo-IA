import React from 'react';
import { Recipe, Translation } from '../types';

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  t: Translation;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  recipe, 
  t 
}) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto" aria-labelledby="recipe-modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="bg-brand-600 px-6 py-4 flex justify-between items-start shrink-0">
            <div>
              <h3 className="text-xl font-bold text-white leading-snug pr-4" id="recipe-modal-title">
                {recipe.name}
              </h3>
              <p className="text-brand-100 text-sm mt-1">{recipe.description}</p>
            </div>
            <button
              type="button"
              className="rounded-full p-2 bg-white/20 hover:bg-white/30 text-white transition-colors"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="bg-brand-50 px-6 py-3 flex flex-wrap gap-4 border-b border-brand-100 shrink-0 text-sm">
             <div className="flex items-center gap-1 text-slate-700 font-medium">
                <span className="text-brand-600">⏱</span> {recipe.prepTime}
             </div>
             <div className="flex items-center gap-1 text-slate-700 font-medium">
                <span className="text-brand-600">👥</span> {recipe.servings}
             </div>
             <div className="flex items-center gap-1 text-slate-700 font-medium">
                <span className="text-brand-600">🔥</span> {recipe.calories} kcal
             </div>
          </div>

          {/* Content Scrollable */}
          <div className="px-6 py-6 overflow-y-auto custom-scrollbar">
            
            {/* Ingredients */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg text-sm">🥗</span>
                {t.ingredients}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-brand-500 mt-1.5">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-sm">👩‍🍳</span>
                {t.instructions}
              </h4>
              <div className="space-y-4">
                {recipe.instructions && recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end shrink-0">
            <button
              type="button"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 transition-colors"
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