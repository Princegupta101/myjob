'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product } from '@/types';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import ProductTable from '@/components/ProductTable';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log('Products fetched successfully'); // Debug log
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        router.push('/auth/login'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ProductTable products={products} />
          <AnalyticsCharts products={products} />
        </>
      )}
    </div>
  );
}