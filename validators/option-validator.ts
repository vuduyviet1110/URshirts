// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950


import { PRODUCT_PRICES } from '@/config/product'

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  {
    label: 'White',
    value: 'white',
    tw: 'white', 
  },
  { label: 'Brown', value: 'brown', tw: 'brown-950' },
] as const

export const ShirtType = {
  name: 'type',
  options: [
    {
      label: 'T-Shirt',
      value: 'TShirt',
    },
    {
      label: 'long-Sleeve Shirt',
      value: 'longSleeve',
    },
    {
      label: 'Polo Shirt',
      value: 'polo',
    },
   
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: 'Soft Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant coating',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Smooth Finish',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: 'Textured Finish',
      value: 'textured',
      description: 'Soft grippy texture',
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const