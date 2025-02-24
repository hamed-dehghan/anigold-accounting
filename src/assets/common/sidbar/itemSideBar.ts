type SubMenuItem = {
  title: string;
  url: string;
  icon: string;
};

type SidebarItem = {
  title: string;
  url: string;
  icon: string;
  subMenu?: SubMenuItem[];
  separator?: boolean; // Corrected property name and moved to SidebarItem
};

export const itemsSidBar: SidebarItem[] = [
  {
    title: 'اسناد',
    url: '/documents',
    icon: 'doc',
    subMenu: [
      {
        title: 'مشاهده همه اسناد',
        url: '/documents/all',
        icon: 'doc',
      },
      {
        title: 'مشاهده همه اسناد دریافتی',
        url: '/documents/recive',
        icon: 'doc',
      },
      {
        title: 'مشاهده همه اسناد پرداختی',
        url: '/documents/send',
        icon: 'doc',
      },
    ],
  },
  {
    title: 'برچسب ۱',
    url: '/tag1',
    icon: 'tag',
  },
  {
    title: 'برچسب ۲',
    url: '/tag2',
    icon: 'tag',
    separator: true,
  },
  {
    title: 'برچسب ۳',
    url: '/tag3',
    icon: 'tag',
  },
  {
    title: 'برچسب ۴',
    url: '/tag4',
    icon: 'tag',
    subMenu: [
      {
        title: 'مشاهده همه اسناد',
        url: '#',
        icon: 'doc',
      },
      {
        title: 'مشاهده همBreadcrumbsه اسناد دریافتی',
        url: '#',
        icon: 'doc',
      },
      {
        title: 'مشاهده همه اسناد پرداختی',
        url: '#',
        icon: 'doc',
      },
    ],
  },
  {
    title: 'برچسب ۵',
    url: '/tag5',
    icon: 'tag',
  },
  {
    title: 'برچسب ۶',
    url: '/tag6',
    icon: 'tag',
    separator: true,
  },
  {
    title: 'برچسب ۷',
    url: '/tag7',
    icon: 'tag',
  },
  {
    title: 'برچسب ۸',
    url: '/tag8',
    icon: 'tag',
  },
];