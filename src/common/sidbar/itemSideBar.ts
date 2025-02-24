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
    title: 'تعاریف',
    url: '/definitions',
    icon: 'tag',
    separator: true,
    subMenu: [
      {
        title: 'تعریف مشتری',
        url: '/definitions/customers',
        icon: 'doc',
      },
      
      {
        title: 'تعاریف کل',
        url: '/definitions/CustomerType',
        icon: 'doc',
      },
      {
        title: 'محصولات',
        url: '/definitions/Products',
        icon: 'tag',
      },
    ],
  },
  {
    title: 'خروج',
    url: '/Login',
    icon: 'tag',
   
  },
  
];