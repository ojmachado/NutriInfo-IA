import React, { useState, useEffect } from 'react';
import { LanguageCode, NutritionData, Recipe } from './types';
import { TRANSLATIONS } from './constants';
import { fetchNutritionFromGemini } from './services/geminiService';
import { LanguageSwitch } from './components/LanguageSwitch';
import { NutritionCard } from './components/NutritionCard';
import { RecipeCard } from './components/RecipeCard';
import { FavoritesModal } from './components/FavoritesModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<LanguageCode>('pt-BR');
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Favorites State
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nutriGeminiFavorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('nutriGeminiFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const t = TRANSLATIONS[language];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setNutritionData(null);

    try {
      const data = await fetchNutritionFromGemini(query, language);
      setNutritionData(data);
    } catch (err: any) {
      if (err.message === 'API_KEY_MISSING') {
        setError(t.errorApiKey);
      } else {
        setError(t.errorGeneric);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const exists = prev.some(r => r.name === recipe.name);
      if (exists) {
        return prev.filter(r => r.name !== recipe.name);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isRecipeFavorite = (recipe: Recipe) => {
    return favorites.some(r => r.name === recipe.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 flex flex-col">
      {/* Navbar / Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥑</span>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800 hidden sm:block">
              {t.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
              title={t.savedRecipes}
            >
              <svg className="w-6 h-6" fill={favorites.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <LanguageSwitch currentLang={language} onToggle={setLanguage} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {language === 'pt-BR' ? 
              <>Nutrição Inteligente <span className="text-brand-600">ao seu alcance</span></> : 
              <>Smart Nutrition <span className="text-brand-600">at your fingertips</span></>
            }
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {t.subtitle}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-6 py-4 rounded-full border-2 border-slate-200 shadow-sm text-lg focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-200 transition-all pl-12 bg-white text-slate-900 placeholder:text-slate-400"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-brand-600 transition-colors"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 bg-brand-600 hover:bg-brand-700 text-white px-6 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-4xl">
          {error && (
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-6 py-4 rounded-xl text-center max-w-2xl mx-auto mb-8 animate-fade-in shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium text-sm sm:text-base leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {loading && !nutritionData && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
               <div className="relative w-20 h-20 mb-4">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
               </div>
               <p className="animate-pulse font-medium">{t.loading}</p>
            </div>
          )}

          {nutritionData && !loading && (
            <div className="space-y-10 animate-fade-in">
              <NutritionCard data={nutritionData} t={t} />
              
              {nutritionData.recipes && nutritionData.recipes.length > 0 && (
                <div className="pt-4 border-t border-slate-200/60">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    {t.recipesTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {nutritionData.recipes.map((recipe, index) => (
                      <RecipeCard
                        key={index}
                        recipe={recipe}
                        isFavorite={isRecipeFavorite(recipe)}
                        onToggleFavorite={toggleFavorite}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!nutritionData && !loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center opacity-60 mt-8">
              <div className="p-4">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-3xl">⚡</div>
                <h3 className="font-semibold text-slate-800 mb-1">{language === 'pt-BR' ? 'Instantâneo' : 'Instant'}</h3>
                <p className="text-sm text-slate-500">{language === 'pt-BR' ? 'Resultados em segundos usando IA avançada.' : 'Results in seconds using advanced AI.'}</p>
              </div>
              <div className="p-4">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-3xl">🍎</div>
                <h3 className="font-semibold text-slate-800 mb-1">{language === 'pt-BR' ? 'Qualquer Alimento' : 'Any Food'}</h3>
                <p className="text-sm text-slate-500">{language === 'pt-BR' ? 'Frutas, pratos complexos ou lanches rápidos.' : 'Fruits, complex dishes, or quick snacks.'}</p>
              </div>
              <div className="p-4">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-3xl">📊</div>
                <h3 className="font-semibold text-slate-800 mb-1">{language === 'pt-BR' ? 'Detalhado' : 'Detailed'}</h3>
                <p className="text-sm text-slate-500">{language === 'pt-BR' ? 'Macros, calorias e sugestões de receitas.' : 'Macros, calories, and recipe suggestions.'}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>{t.footer}</p>
        </div>
      </footer>

      {/* Favorites Modal */}
      <FavoritesModal 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        t={t}
      />
    </div>
  );
};

export default App;