'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

interface TabItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
}

const LinkTabs = ({ tabs, className }: TabsProps) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'flex w-fit items-center gap-2 rounded-full bg-black-70/80 px-[6px] py-[6px] lg:gap-6 lg:px-[14px]',
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.href || tab.isActive;

        return (
          <Link
            key={index}
            className={clsx(
              'rounded-full p-2 font-calSans text-xs transition-all duration-200 lg:px-6 lg:py-3 lg:text-sm',
              isActive ? 'bg-black-130 text-white' : 'text-white/70 hover:bg-black-130 hover:text-white'
            )}
            href={tab.href}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default LinkTabs;
