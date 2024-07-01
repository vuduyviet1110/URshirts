'use client';
import { useShoppingCart } from 'use-shopping-cart';
import { Product } from 'use-shopping-cart/core';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddToCart = ({
  currency,
  name,
  image,
  price,
  id,
  size,
  sizeSelect,
  onClick,
  redirect = false,
}: Product & {
  onClick?: () => void;
  redirect?: boolean;
}) => {
  const { addItem } = useShoppingCart();
  const productId = `${id}-${size}`;
  const router = useRouter();
  const product = {
    currency: currency,
    name: name,
    image: image,
    price: price,
    id: productId,
    size: size,
  };

  return (
    <button
      onClick={() => {
        if (!sizeSelect && onClick) {
          onClick();
        } else {
          addItem(product as any);
          toast.success(`${name} has been added to cart`);
          if (redirect) {
            router.push('/cart');
          }
        }
      }}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
