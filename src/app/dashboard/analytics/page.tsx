'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product } from '@/types';
import AnalyticsCharts from '@/components/AnalyticsCharts';

export default function Analytics() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log('Products fetched successfully'); 
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        router.push('/auth/login'); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary">Analytics Charts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
            <AnalyticsCharts products={products} />
        </>
      )}
    </div>
  );
}