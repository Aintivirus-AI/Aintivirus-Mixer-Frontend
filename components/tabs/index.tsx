import React, { FC } from 'react';
import { Tabs as BaseTabs, TabsProps as TabsBaseProps } from '@heroui/tabs';

const Tabs: FC<TabsBaseProps> = ({ items, children, ...props }) => {
  return (
    <BaseTabs
      fullWidth
      classNames={{
        tabList: 'bg-black-140 p-1 rounded-xl',
        tab: 'rounded-xl px-1 py-0 sm:h-[47px]',
        cursor: 'group-data-[selected=true]:bg-black-130',
        tabContent:
          'text-white/80 font-medium text-[15px] group-data-[selected=true]:text-white group-data-[selected=true]:font-semibold',
        panel: 'p-0 mt-3',
      }}
      {...props}
    >
      {children}
    </BaseTabs>
  );
};

export default Tabs;
