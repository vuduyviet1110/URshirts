import { cn } from '@/lib/utils';
import { ShirtColor, ShirtType } from '@prisma/client';
import { HTMLAttributes } from 'react';
interface ShirtsProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
  color?: ShirtColor;
  Stype?: ShirtType;
}

const Shirts = ({ imgSrc, color, Stype, className, dark = false, ...props }: ShirtsProps) => {
  return (
    <div className={cn('relative pointer-events-none z-50 overflow-hidden', className)} {...props}>
      {/* eslint@next/next/no-img-element*/}
      <img
        src={
          color === 'black' && Stype === 'TShirt'
            ? '/black-tshirt.png'
            : color === 'white' && Stype === 'TShirt'
              ? '/white-tshirt.png'
              : color === 'brown' && Stype === 'TShirt'
                ? '/brown-tshirt.png'
                : color === 'white' && Stype === 'polo'
                  ? '/white-polo.png'
                  : color === 'black' && Stype === 'polo'
                    ? '/black-polo.png'
                    : color === 'brown' && Stype === 'polo'
                      ? '/brown-polo.png'
                      : '/white-tshirt.png'
        }
        className="pointer-events-none z-10 select-none"
        alt="phone image"
      />

      <div className="absolute z-15 inset-0">
        <img
          className=" object-cover min-w-full min-h-full  md:max-w-[100px] md:max-h-[160px]"
          src={imgSrc}
          alt="overlaying phone image"
        />
        <div className="pointer-events-none absolute inset-x-0 z-9 top-0 w-[53%] h-1/2 bg-gradient-to-b from-transparent" />
      </div>
    </div>
  );
};

export default Shirts;
