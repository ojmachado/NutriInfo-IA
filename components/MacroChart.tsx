import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Translation } from '../types';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
  t: Translation;
}

export const MacroChart: React.FC<MacroChartProps> = ({ protein, carbs, fat, t }) => {
  const data = [
    { name: t.protein, value: protein, color: '#3b82f6' }, // Blue
    { name: t.carbs, value: carbs, color: '#22c55e' },    // Green
    { name: t.fat, value: fat, color: '#eab308' },        // Yellow
  ].filter(item => item.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="h-64 w-full">
      <h3 className="text-center text-sm font-semibold text-slate-500 mb-2">{t.macroDistribution}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}g`, '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
