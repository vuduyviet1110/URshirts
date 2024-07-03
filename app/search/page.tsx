'use client';

import { useSearchStore } from '@/store/useSearchStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const SearchPage = () => {
  const keyword_search = useSearchStore(state => state.keyword);
  const isSearching = useSearchStore(state => state.start_searching);

  const fetchProducts = async (keyword_search: string) => {
    const res = await fetch(`/api/product/?q=${keyword_search}`, {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
    return res.json();
  };

  const setEndSearching = useSearchStore(state => state.setEndSearching);
  useEffect(() => {
    if (isSearching) {
      setEndSearching;
    }
  }, [isSearching, setEndSearching]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search-query', keyword_search],
    queryFn: () => (isSearching ? fetchProducts(keyword_search) : undefined),
  });

  if (isLoading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        An error occurred: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen mx-16 mt-16">
      <div className="col-span-1 text-center">
        <h3 className="text-lg font-bold">Searching with keyword: {keyword_search}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data !== undefined ? (
          data.map((prod: any) => (
            <div key={prod.id} className="bg-white shadow-xl rounded-lg p-4">
              <img
                src={prod.image || 'balo.jpg'}
                alt={prod.name || 'Product Image'}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h4 className="text-lg font-bold mt-4">{prod.name}</h4>
              <p className="text-gray-500">{prod.unit_amount}</p>
            </div>
          ))
        ) : (
          <h3 className="text-lg font-bold text-blue-500"> No matching product found</h3>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
