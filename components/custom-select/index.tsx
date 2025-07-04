import { Select, SelectProps } from '@heroui/select';
import React from 'react';

const CustomSelect = ({ label, ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[15px] font-semibold">{label}</p>
      <Select
        {...props}
        classNames={{
          trigger:
            '!bg-black-100 border border-black-80 rounded-[13px] px-3 sm:px-[18px] py-[10px] h-[46px] !text-white',
          popoverContent: 'bg-black-70 border shadow-none border-black-80 !text-white',
          innerWrapper: '!text-white',
          value: '!text-white',
        }}
        listboxProps={{
          itemClasses: {
            base: 'data-[selectable=true]:focus:bg-black-90 data-[selectable=true]:focus:text-white data-[selectable=true]:focus:outline-none',
          },
        }}
      >
        {props.children}
      </Select>
    </div>
  );
};

export default CustomSelect;
