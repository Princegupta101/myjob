
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Product } from '@/types';

interface AnalyticsChartsProps {
  products: Product[];
}

export default function AnalyticsCharts({ products }: AnalyticsChartsProps) {
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    count: value,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Product Category Distribution</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}