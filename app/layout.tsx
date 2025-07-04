import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import { calSans, fontSans } from '@/config/fonts';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import LinkTabs from '@/components/tabs/link-tabs';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

const tabItems = [
    { label: 'ETH - ETH', href: '/eth-eth' },
    { label: 'SOL - SOL', href: '/sol-sol' },
    { label: 'ETH - SOL', href: '/eth-sol' },
    { label: 'SOL - ETH', href: '/sol-eth' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body className={clsx('dark min-h-screen bg-black-50 font-sans antialiased', calSans.variable, fontSans.variable)}>
                <Providers>
                    <div className="relative mx-auto min-h-dvh">
                        <div className="max-h-1/2 absolute bottom-0 left-0 h-[800px] w-[800px] max-w-full rounded-full bg-[url(/bg.png)] bg-cover bg-center bg-no-repeat" />
                        <div className="flex w-full flex-col">
                            <div className="relative flex h-[100px] w-full justify-between lg:h-[110px]">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="relative h-full flex-1">
                                        <Image fill objectFit="cover" src="/frame.png" alt="frame" />
                                    </div>
                                ))}
                            </div>
                            <Navbar />
                            <LinkTabs className="relative z-10 mx-auto" tabs={tabItems} />
                            {children}
                            <div className="flex h-[80px] w-full justify-between pt-[62px] lg:h-[110px]">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="relative h-full flex-1">
                                        <Image fill objectFit="cover" src="/frame.png" alt="frame" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
