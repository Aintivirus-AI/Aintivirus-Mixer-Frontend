import clsx from 'clsx';
import React, { FC } from 'react';
import { tv } from 'tailwind-variants';

import { Spinner } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variantColor?: 'primary' | 'black' | 'blue' | 'danger';
  variants?: 'outline' | 'filled';
  isLoading?: boolean;
}

const buttonStyles = tv({
  base: 'flex items-center justify-center gap-2 rounded-[12px] px-1 py-2 text-[15px] font-semibold lg:px-4',
  variants: {
    variantColor: {
      primary: 'bg-black-130/50 text-white/70',
      black: 'bg-black-130 text-white',
      blue: 'font-inter min-h-[48px] min-w-[141px] rounded-[14px] px-[22px] py-[10px] capitalize tracking-[-0.9px] text-white disabled:cursor-not-allowed disabled:opacity-50',
      danger: 'bg-red-500 text-white',
    },
    variants: {
      outline: 'border border-primary bg-transparent text-primary',
      filled: '',
    },
  },
  compoundVariants: [
    {
      variantColor: 'blue',
      variants: 'outline',
      className: 'rounded-[14px] border-2 border-blue-50 !bg-transparent text-white',
    },
    {
      variantColor: 'blue',
      variants: 'filled',
      className: 'bg-[linear-gradient(95deg,#024AEC_0.86%,#03BEFF_96.99%)] shadow-blue-grow',
    },
  ],
  defaultVariants: {
    variantColor: 'primary',
    variants: 'filled',
  },
});

const Button: FC<ButtonProps> = ({
  children,
  className,
  variantColor = 'primary',
  variants = 'filled',
  disabled,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={clsx(buttonStyles({ variantColor, variants }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
