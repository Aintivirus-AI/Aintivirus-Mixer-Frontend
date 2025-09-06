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
    { name: 'Bridge', href: 'https://bridge.aintivirus.ai'},
    {
      name: "Gift Card / E Sim",
      href: "https://aintivirus.ai/esim",
    },
    { name: "Merch", href: "https://aintivirus.ai/merch" },
    {
      name: "Media",
      href: "https://aintivirus.ai/media",
      children: [
        {
          name: "Digital Freedom",
          href: "https://aintivirus.ai/digital-freedom",
        },
        { name: "Blog", href: "https://aintivirus.ai/blog" },
        { name: "Privacy", href: "https://aintivirus.ai/privacy" },
        { name: "Podcast", href: "https://aintivirus.ai/podcast" },
        { name: "RWS Season 1", href: "https://aintivirus.ai/rws-series" },
      ],
    },
    {
      name: "NFT",
      href: "https://aintivirus.ai/macfee-archive",
      children: [
        { name: "Archived Video", href: "https://aintivirus.ai/videos" },
        { name: "Archived Ebook", href: "https://aintivirus.ai/ebooks" },
        { name: "McAfee Mixology", href: "https://aintivirus.ai/mixology" },
      ],
    },
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
