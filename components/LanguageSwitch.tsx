import React from 'react';
import { LanguageCode } from '../types';

interface LanguageSwitchProps {
  currentLang: LanguageCode;
  onToggle: (lang: LanguageCode) => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-sm border border-slate-200 p-1">
      <button
        onClick={() => onToggle('pt-BR')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
          currentLang === 'pt-BR'
            ? 'bg-green-100 text-green-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <span>🇧🇷</span>
        <span>PT</span>
      </button>
      <button
        onClick={() => onToggle('en-US')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
          currentLang === 'en-US'
            ? 'bg-blue-100 text-blue-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <span>🇺🇸</span>
        <span>EN</span>
      </button>
    </div>
  );
};
