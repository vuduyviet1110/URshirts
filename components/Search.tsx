'use client';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from './debounces';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiX } from 'react-icons/bi';
import formatPrice from '@/utils/formatPrice';
import Link from 'next/link';
import { LuLoader2 } from 'react-icons/lu';
import { useSearchStore } from '@/store/useSearchStore';

const Search = () => {
  const input_ref = useRef<HTMLInputElement | null>(null);
  const [SearchValue, setSearchValue] = useState('');
  const [SearchResult, setSearchResult] = useState([
    {
      id: '',
      name: '',
      price_id: '',
      unit_amount: 2444,
      image: '',
      currency: 'usd',
      description: null,
      metadata: {
        topRated: 'true',
      },
    },
  ]);
  const [ShowResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(SearchValue, 1000);
  const setSeachValue = useSearchStore(state => state.setKeyword);
  const setStartSearching = useSearchStore(state => state.setStartSearching);
  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith(' ')) {
      setSearchValue(inputValue);
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/?q=${debounced}`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const result = await res.json();
        setSearchResult(result);
        setLoading(false);
        setSeachValue(debounced);
        console.log(result);
      } catch (error) {
        console.log('error fetch api:', error);
      }
    };
    fetchApi();
  }, [debounced]);

  const HideSearch = () => {
    setShowResult(false);
  };
  return (
    <HeadlessTippy
      interactive
      visible={ShowResult && SearchResult.length > 0}
      render={attrs => (
        <div
          tabIndex={-1}
          {...attrs}
          className="  relative h-[360px] overflow-y-auto w-[280px] rounded-sm "
        >
          {ShowResult && SearchResult.length === 0 ? (
            <div className="bg-red-500 max-h-360 w-[280px]">
              <div className="flex p-2">
                <img src="/logoUrshirts.jpg" className="w-14 h-14" alt="photo" />
                <div className="w-full ml-5">
                  <span className="font-bold text-xl text-green-800">No products found</span>
                </div>
              </div>
            </div>
          ) : (
            SearchResult.map(prod => (
              <div key={prod.id} className="bg-zinc-200 max-h-360">
                <Link href={`/products/${prod.id}`} className="flex p-2">
                  <img src={prod.image} className="w-14 h-14" alt="photo" />
                  <div className="w-full flex ml-5 flex-1 flex-col">
                    <span>{prod.name}</span>
                    <span>From: {formatPrice(prod.unit_amount)}</span>
                  </div>
                </Link>
                <div className="h-[2px] w-full bg-slate-400 "></div>
              </div>
            ))
          )}
        </div>
      )}
      onClickOutside={HideSearch}
    >
      <div className="rounded-lg bg-zinc-100 p-2 max-w-[300px] flex items-center">
        <input
          value={SearchValue}
          placeholder="Search"
          className="mx-1 px-2 rounded-lg border-none focus:border-2 focus:border-blue-500 focus:outline-none"
          spellCheck={false}
          onChange={HandleSearch}
          onFocus={() => setShowResult(true)}
        />
        {!!SearchValue && !loading && (
          <button
            className=" items-center mx-2 rounded-ful flex"
            onClick={() => {
              setSearchValue('');
              input_ref.current?.focus();
              HideSearch();
            }}
          >
            <BiX className="h-5 w-5" />
          </button>
        )}

        {loading && <LuLoader2 className="animate-spin h-5 w-5  rounded-full mx-1"></LuLoader2>}
        <Tippy content="Search product">
          <button
            className="h-5 w-5 "
            onMouseDown={e => e.preventDefault()}
            onClick={() => setStartSearching()}
          >
            <Link href="/search">
              <FaMagnifyingGlass />
            </Link>
          </button>
        </Tippy>
      </div>
    </HeadlessTippy>
  );
};

export default Search;
