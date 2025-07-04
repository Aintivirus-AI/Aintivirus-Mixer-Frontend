'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../button';
import MobileMenu from './mobile-menu';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';
import { ArrowDownIcon, CloseIcon, MenuIcon } from '../icons';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className={clsx('fixed left-0 right-0 top-0 z-50 flex max-h-[106px] justify-center px-4')}>
        <div className="bg-back-60/10 flex h-24 w-full max-w-[var(--content-width)] items-center justify-between py-8 backdrop-blur-[7px] xl:px-[100px]">
          <div className="flex">
            <Link href="https://aintivirus.ai">
              <Image
                src="/logo.png"
                alt="logo"
                layout="intrinsic"
                width={189}
                height={30}
                className="h-[28px] w-[173px] xl:h-[30px] xl:w-[189px]"
              />
            </Link>
          </div>

          <div className="ml-auto flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-xl text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon width="21" height="18" />}
            </button>
          </div>

          <div
            className={clsx(
              'hidden items-center justify-center gap-[17px] px-[40px] py-4 text-sm font-semibold tracking-[-0.42px] xl:flex'
            )}
          >
            {siteConfig.navItems.map((item, idx) => {
              const isChildActive = item.children?.some(
                (child) => pathname === child.href || pathname.includes(child.href)
              );
              const isParentActive =
                pathname === item.href || pathname.includes(item.href) || pathname.includes(item.name.toLowerCase());

              return (
                <div key={idx} className="group relative">
                  {item?.children ? (
                    <div className="flex cursor-pointer items-center gap-1">
                      <span
                        className={clsx(
                          'text-gray-50 transition-opacity group-hover:text-white',
                          (isParentActive || isChildActive) && 'text-white'
                        )}
                      >
                        {item.name}
                      </span>
                      <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                  ) : (
                    <Link
                      className={clsx(
                        'flex items-center gap-1 text-gray-50 transition-opacity hover:text-white',
                        isParentActive && 'text-white'
                      )}
                      href={item.href}
                      target={item.target}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.children && (
                    <div className="invisible absolute right-0 top-[30px] flex w-[200px] translate-y-[-10px] transform flex-col gap-3 rounded-[20px] border border-black-80 bg-black-70 p-[8px] opacity-0 backdrop-blur-[54px] transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((child, childIdx) => {
                        const isChildItemActive = pathname === child.href || pathname.includes(child.href);

                        return (
                          <Link
                            key={childIdx}
                            className={clsx(
                              'font-inter block flex items-center justify-between rounded-[10px] px-[14px] py-[10px] text-sm font-semibold tracking-[-0.6px] text-gray-50 transition-colors duration-200 hover:bg-black-90',
                              isChildItemActive && 'bg-black-90 text-white'
                            )}
                            href={child.href}
                            target={child.target}
                          >
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Link
            href="https://raydium.io/swap/?inputMint=BAezfVmia8UYLt4rst6PCU4dvL2i2qHzqn4wGhytpNJW&outputMint=sol"
            target="_blank"
          >
            <Button className="hidden xl:flex" variantColor="blue">
              Buy AIntivirus
            </Button>
          </Link>
        </div>
      </div>

      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};

export default Navbar;
