'use client';

import { FaHeartCirclePlus } from 'react-icons/fa6';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductType } from '@/types/ProductTypes';
import toast from 'react-hot-toast';

const AddToWishlistButton = ({
  name,
  id,
  image,
  unit_amount,
  text,
}: ProductType & { text?: string }) => {
  const wishlistStore = useWishlistStore();

  const addToWishlist = () => {
    const existingItem = wishlistStore.wishList.find(wishItem => wishItem.id === id);

    if (existingItem) {
      toast.error(`${name} is already in your wishlist`);
    } else {
      wishlistStore.addToWishlist({
        name,
        id,
        image,
        unit_amount,
        quantity: 1,
      });
      toast.success(`${name} added to wishlist`);
    }
  };
  return (
    <div onClick={addToWishlist} className="flex items-center">
      <FaHeartCirclePlus className="mr-2" />
      {text}
    </div>
  );
};

export default AddToWishlistButton;
