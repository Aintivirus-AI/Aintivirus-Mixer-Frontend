import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { ArrowDownIcon } from '../icons';

import { siteConfig } from '@/config/site';
// import Button from "../button";

const MobileMenu = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  return (
    <div
      className={clsx(
        'fixed right-0 top-0 z-40 h-full w-full transform bg-black-70/80 backdrop-blur-[54px] transition-transform duration-300 ease-in-out md:w-64 xl:hidden',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <ul className="mt-24 flex flex-col space-y-6 px-6 font-semibold text-white">
        {siteConfig.navItems.map((item, idx) => {
          // Check if any child is active
          const isChildActive = item.children?.some(
            (child) => pathname === child.href || pathname.includes(child.href)
          );
          const isParentActive =
            pathname === item.href || pathname.includes(item.href) || pathname.includes(item.name.toLowerCase());

          return (
            <li key={idx}>
              {item.children ? (
                <div>
                  <button
                    className={clsx(
                      'flex w-full items-center justify-between transition-colors duration-200 hover:text-white',
                      isParentActive || isChildActive ? 'font-bold text-white' : 'text-white/70'
                    )}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <span className="flex items-center gap-1">
                      {item.name}
                      {item.target === '_blank' && <span className="ml-1">↗</span>}
                    </span>
                    <ArrowDownIcon
                      className={clsx(
                        'h-4 w-4 transition-transform duration-300 ease-in-out',
                        openSubmenu === item.name ? 'rotate-180' : 'rotate-0'
                      )}
                    />
                  </button>

                  <div
                    className={clsx(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      openSubmenu === item.name ? 'mt-3 max-h-96 opacity-100' : 'mt-0 max-h-0 opacity-0'
                    )}
                  >
                    <ul className="ml-4 space-y-3">
                      {item.children.map((child, childIdx) => {
                        const isChildItemActive = pathname === child.href || pathname.includes(child.href);

                        return (
                          <li
                            key={childIdx}
                            className={clsx(
                              'transform transition-all duration-300 ease-in-out',
                              openSubmenu === item.name ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-0'
                            )}
                            style={{
                              transitionDelay: openSubmenu === item.name ? `${childIdx * 50}ms` : '0ms',
                            }}
                          >
                            <Link
                              className={clsx(
                                'block flex items-center gap-1 text-sm transition-colors duration-200 hover:text-white',
                                isChildItemActive ? 'font-bold text-white' : 'text-white/70'
                              )}
                              href={child.href}
                              target={child.target}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>{child.name}</span>
                              {/* {child.target === '_blank' && <span className="ml-1">↗</span>} */}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  className={clsx(
                    'flex items-center gap-1 transition-colors duration-200 hover:text-white',
                    isParentActive ? 'font-bold text-white' : 'text-white/70'
                  )}
                  href={item.href}
                  target={item.target}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {/* {item.target === '_blank' && <span className="ml-1">↗</span>} */}
                </Link>
              )}
            </li>
          );
        })}
        {/* <Link
          href="https://raydium.io/swap/?inputMint=BAezfVmia8UYLt4rst6PCU4dvL2i2qHzqn4wGhytpNJW&outputMint=sol"
          target="_blank"
        >
          <Button variantColor="blue">Buy AINTI</Button>
        </Link> */}
      </ul>
    </div>
  );
};

export default MobileMenu;
