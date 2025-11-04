import React, { FC } from "react";
import { Tabs as BaseTabs, TabsProps as TabsBaseProps } from "@heroui/tabs";

const Tabs: FC<TabsBaseProps> = ({ items, children, ...props }) => {
  return (<>
    <BaseTabs
      fullWidth
      
      classNames={{
        tabList: "bg-black-140 p-1 rounded-xl group",
        tab: "rounded-xl px-1 py-0 sm:h-[47px]",
        cursor: "!bg-black-130",
        // NOTE: In some versions the slot is `tabContent` (not `tabWrapper`)
        tabContent:
          "text-white/80 font-medium text-[15px] group-data-[selected=true]:text-white group-data-[selected=true]:font-semibold",
        panel: "p-0 mt-3",
      }}
      {...props}
    >
      {children}
    </BaseTabs>
    <span className="bg-black-130"></span>
    </>
  );
};

export default Tabs;
