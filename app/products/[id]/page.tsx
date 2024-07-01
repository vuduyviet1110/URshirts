'use client';

import formatPrice from '@/utils/formatPrice';
import AddToWishlistButton from '@/app/(wishlist)/components/AddToWishlistButton';
import ReviewStar from '@/components/StarReview';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loading from '@/app/loading';
import ImageManifier from '@/components/ImageMagnifier';
import AddToCart from '@/app/(shoppingcart)/components/ui/AddToCart';
import toast from 'react-hot-toast';

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [selectedSize, setSelectedSize] = useState('');

  const showToast = () => {
    toast.error('Please choose a size first');
  };
  const isSizeSelected = selectedSize !== '';

  const {
    data: currentShirt,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['detail-product', params.id],
    queryFn: () =>
      fetch(`/api/product/${params.id}`).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      }),
    retry: true,
    retryDelay: 500,
  });

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <div className="min-h-screen">Error: {error.message}</div>;
  return (
    <div className=" justify-between grid grid-cols-1  md:grid-cols-2">
      <div className=" grid col-span-1 ">
        <ImageManifier
          imageUrl={typeof currentShirt?.image === 'string' ? currentShirt?.image : ''}
        />
      </div>

      <div className="min-h-screen w-full col-span-1 lg:col-span-1 flex-col bg-white">
        <div className="flex flex-1 overflow-y-scroll">
          <div aria-hidden="true" />
          <div className="px-8 pb-12 pt-8">
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <h2 className="tracking-tight font-bold text-3xl">Shirt: {currentShirt?.name}</h2>
              <div className="w-full h-px bg-zinc-200 my-6" />
              <div className="flex flex-col gap-6">
                <div className="relative flex flex-col gap-3 w-full">
                  <div className="text-xl font-semibold flex items-center">
                    <span className="mr-2">Total Review: </span>
                    <ReviewStar rating={4} /> <p className="ml-3">(300)</p>
                  </div>
                  <div className="flex ">
                    <div className="text-lg font-semibold mr-3">Purachased:</div>
                    <p>343</p>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="text-lg font-semibold">Description:</div>
                    <p>{currentShirt?.description}</p>
                  </div>
                  <div className="flex items-center ">
                    <div className="text-lg font-semibold mr-2">Size:</div>

                    <select
                      value={selectedSize}
                      onChange={e => setSelectedSize(e.target.value)}
                      className="my-2 p-2 border rounded-md"
                    >
                      <option value="">Select Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 ">
                  <div>
                    <p className="font-medium text-zinc-950">Highlights</p>
                    <ol className="mt-3 text-zinc-700 list-disc list-inside">
                      <li>1+ year warranty color intact</li>
                      <li>Free shipping worldwide</li>
                      <li>Packaging made from recycled materials</li>
                      <li>5 year print warranty</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-950">Materials</p>
                    <ol className="mt-3 text-zinc-700 list-disc list-inside">
                      <li>High-quality, durable material</li>
                      <li>100% eco-friendly</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-8 h-16">
          <div className=" w-full">
            <span className="mr-2 font-semibold">Total: </span>
            {formatPrice(currentShirt?.unit_amount as number)}
          </div>
          <div className="w-full h-full mt-4 flex items-center">
            <button className="flex items-center bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
              <AddToWishlistButton
                name={currentShirt.name}
                image={currentShirt.image}
                id={currentShirt.id}
                unit_amount={currentShirt.unit_amount}
                quantity={currentShirt.quantity}
                text="Add to wishlist"
              />
            </button>

            <div className="ml-4 flex gap-6 items-center">
              <button className="flex items-center bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
                <AddToCart
                  name={currentShirt.name}
                  image={currentShirt.image}
                  price={currentShirt.unit_amount}
                  id={currentShirt.price_id!}
                  sizeSelect={isSizeSelected}
                  size={selectedSize}
                  onClick={!isSizeSelected ? showToast : undefined}
                  currency="USD"
                  redirect={true}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
