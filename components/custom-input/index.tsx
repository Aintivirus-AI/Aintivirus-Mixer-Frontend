import { Input, InputProps } from '@heroui/input';
import React from 'react';

const CustomInput = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[15px] font-semibold">{label}</p>
      <Input
        classNames={{
          inputWrapper:
            'data-[hover=true]:!bg-black-100 !bg-black-100 border border-black-80 rounded-[13px] px-3 sm:px-[21px] py-[10px] h-[46px] group-data-[focus=true]:!bg-black-100',
          input: '!text-white',
        }}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
