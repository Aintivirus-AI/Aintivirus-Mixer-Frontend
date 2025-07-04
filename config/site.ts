interface MenuItem {
  name: string;
  href: string;
  target?: string;
  children?: MenuItem[];
}

export type SiteConfig = {
  name: string;
  description: string;
  navItems: MenuItem[];
  navMenuItems: MenuItem[];
};

export const siteConfig: SiteConfig = {
  name: 'AintiVirus Mixer',
  description:
    "John McAfee's AI incarnate: built to defend digital freedom and carry on his mission. It’s not just protection—it’s retaliation.",
  navItems: [
    {
      name: 'Cross Chain Mixer',
      href: '/eth-sol',
      children: [
        {
          name: 'ETH-ETH',
          href: '/eth-eth',
        },
        {
          name: 'ETH-SOL',
          href: '/eth-sol',
        },
        {
          name: 'SOL-SOL',
          href: '/sol-sol',
        },
        {
          name: 'SOL-ETH',
          href: '/sol-eth',
        },
      ],
    },
    { name: 'Bridge', href: 'https://bridge.aintivirus.ai/', target: '_blank' },
    {
      name: 'Gift Card / E Sim',
      href: 'https://esim.aintivirus.ai/',
      target: '_blank',
    },
    { name: 'Merch', href: 'https://store.aintivirus.ai/', target: '_blank' },
    {
      name: 'Sell Phones',
      href: 'https://tradein.aintivirus.ai',
      target: '_blank',
    },
    { name: 'Blog', href: 'https://aintivirus.ai/explore', target: '_blank' },
  ],
  navMenuItems: [
    {
      name: 'ETH-ETH',
      href: '/eth-eth',
    },
    {
      name: 'SOL-SOL',
      href: '/sol-sol',
    },
    {
      name: 'ETH-SOL',
      href: '/eth-sol',
    },
    {
      name: 'SOL-ETH',
      href: '/sol-eth',
    },
  ],
};
