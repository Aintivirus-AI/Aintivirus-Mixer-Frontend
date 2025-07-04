import { Textarea, TextAreaProps } from '@heroui/input';
import React from 'react';

const CustomTextArea = ({ label, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[15px] font-semibold">{label}</p>
      <Textarea
        classNames={{
          inputWrapper: '!bg-black-100 border border-black-80 rounded-[13px] px-3 sm:px-[21px] py-[10px] h-[46px]',
          input: '!text-white scrollbar-hide',
        }}
        {...props}
      />
    </div>
  );
};

export default CustomTextArea;
