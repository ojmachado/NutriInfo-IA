import { LanguageCode, Translation } from './types';

export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  'pt-BR': {
    title: 'NutriInfo IA',
    subtitle: 'Descubra o valor nutricional dos seus alimentos favoritos',
    searchPlaceholder: 'Ex: Maçã, Pão Francês, Arroz com Feijão...',
    searchButton: 'Buscar informações nutricionais',
    loading: 'Analisando alimento...',
    errorGeneric: 'Ops! Não conseguimos encontrar este alimento com precisão. Tente ser mais específico, por exemplo: "Maçã Fuji" ou "Peito de frango grelhado".',
    errorApiKey: 'Chave de API não configurada. Por favor, verifique suas variáveis de ambiente.',
    calories: 'Calorias',
    protein: 'Proteínas',
    carbs: 'Carboidratos',
    fat: 'Gorduras',
    fiber: 'Fibras',
    sugar: 'Açúcares',
    sodium: 'Sódio',
    servingSize: 'Porção',
    macroDistribution: 'Distribuição de Macronutrientes',
    footer: 'Desenvolvido com Google Gemini'
  },
  'en-US': {
    title: 'NutriInfo AI',
    subtitle: 'Discover the nutritional value of your favorite foods',
    searchPlaceholder: 'Ex: Apple, Bagel, Rice and Beans...',
    searchButton: 'Search Nutrition Info',
    loading: 'Analyzing food...',
    errorGeneric: 'Oops! We couldn\'t find this food precisely. Try being more specific, for example: "Fuji Apple" or "Grilled Chicken Breast".',
    errorApiKey: 'API Key not configured. Please check your environment variables.',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fats',
    fiber: 'Fiber',
    sugar: 'Sugar',
    sodium: 'Sodium',
    servingSize: 'Serving Size',
    macroDistribution: 'Macronutrient Distribution',
    footer: 'Powered by Google Gemini'
  }
};

export const MOCK_DATA = {
  foodName: "Exemplo (Mock)",
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
  servingSize: "100g",
  emoji: "🍎"
};