import React from 'react';
import { NutritionData, Translation } from '../types';
import { MacroChart } from './MacroChart';

interface NutritionCardProps {
  data: NutritionData;
  t: Translation;
}

const StatItem = ({ label, value, unit, colorClass = "text-slate-900" }: { label: string, value: number, unit: string, colorClass?: string }) => (
  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
    <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{label}</span>
    <span className={`text-xl font-bold ${colorClass}`}>
      {value}
      <span className="text-sm font-normal text-slate-400 ml-0.5">{unit}</span>
    </span>
  </div>
);

export const NutritionCard: React.FC<NutritionCardProps> = ({ data, t }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in transition-all duration-300">
      
      {/* Header */}
      <div className="bg-brand-600 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative z-10">
          <div className="text-6xl mb-2 filter drop-shadow-lg">{data.emoji || '🍽️'}</div>
          <h2 className="text-3xl font-bold capitalize mb-1">{data.foodName}</h2>
          <p className="text-brand-100 text-sm font-medium inline-block bg-brand-700/50 px-3 py-1 rounded-full backdrop-blur-sm">
            {t.servingSize}: {data.servingSize}
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="p-6">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <span className="text-5xl font-extrabold text-slate-800 tracking-tight">
              {data.calories}
            </span>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">{t.calories}</div>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatItem label={t.protein} value={data.protein} unit="g" colorClass="text-blue-600" />
          <StatItem label={t.carbs} value={data.carbs} unit="g" colorClass="text-green-600" />
          <StatItem label={t.fat} value={data.fat} unit="g" colorClass="text-yellow-600" />
        </div>

        {/* Visualization */}
        <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <MacroChart 
                protein={data.protein} 
                carbs={data.carbs} 
                fat={data.fat} 
                t={t} 
            />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
          <div className="text-center">
            <div className="text-sm text-slate-500 mb-1">{t.fiber}</div>
            <div className="font-semibold text-slate-700">{data.fiber}g</div>
          </div>
          <div className="text-center border-l border-slate-100">
            <div className="text-sm text-slate-500 mb-1">{t.sugar}</div>
            <div className="font-semibold text-slate-700">{data.sugar}g</div>
          </div>
          <div className="text-center border-l border-slate-100">
            <div className="text-sm text-slate-500 mb-1">{t.sodium}</div>
            <div className="font-semibold text-slate-700">{data.sodium}mg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
