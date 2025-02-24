
import './Home.scss';
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Outlet, useNavigate } from 'react-router-dom';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { FaUser, FaFileAlt, FaChartBar, FaCogs, FaTools, FaPalette, FaUserTie } from "react-icons/fa";
import { MdApps, MdAreaChart } from "react-icons/md";
import { Menu, MenuItem } from '@mui/material';
import { CgProfile } from 'react-icons/cg';
import { useThemePallet } from '../../contexts/ThemeContext';
import { useActivePage } from '../../contexts/PageContext';
import { useUserData } from '../../contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from '../Login/Login';
import { Breadcrumbs } from '../../common/breadCrumb';
import { Toaster } from 'sonner';
import Header from '../../common/header/Header';
import { SidebarTrigger } from '../../components/ui/sidebar';
import logo from '../../assets/images/logo.png';
import logoBazartala from '../../assets/images/logo-bazartala.png';
import Profile from '../../assets/avatar.svg';
import Icon from '../../lib/icon';
import Search from '../../components/search';
const drawerWidth = 190;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Home() {

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/Login');
    }
    setUserData({
      token: localStorage.getItem('token'),
      is_superuser: localStorage.getItem('is_superuser') == 'true' ? true : false,
      username: localStorage.getItem('username') || 'نام کاربری',
      email: localStorage.getItem('email'),
    })
    clock()
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (path: any, child = false) => {
    console.log(child);

    if (child) {
    } else {
      if (path == '/Login') {
        localStorage.removeItem('token')
        navigate(path);
        return
      }
      navigate(path);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { theme, toggleTheme } = useThemePallet();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openThemeMode = Boolean(anchorEl);
  const handleClickThemeMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseThemeMode = (value: any) => {
    setAnchorEl(null);
  };
  const { ActivePage, setActivePage } = useActivePage();
  const { UserData, setUserData }: any = useUserData();
  const Today = new Date().toLocaleDateString('fa-IR');
  const [ClockValue, setClockValue] = React.useState(new Date().toLocaleTimeString());
  function clock() {
    setInterval(() => {
      setClockValue(new Date().toLocaleTimeString())
    }, 1000);
  }
  return (
    <div className='Home'>
      <Box sx={{ display: 'flex' }} >
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} className='AppBar !bg-[#fff]'>
          <header className="header  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 " style={{ display: 'flex' }}>
            <div className='flex justify-start gap-4 items-center w-full'>
              {/* <SidebarTrigger /> */}
              <div style={{ display: "flex", alignItems: "center", cursor: 'pointer' }} >
                <IconButton
                  style={{ marginRight: ".1rem" }}
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon className=' stroke-black' />
                </IconButton >
              </div>
              <img src={logo} alt="logo" className='w-[45px] h-[45px] flex-shrink-0 cursor-pointer' style={{ borderRadius: '50%' }} />
              <img src={logoBazartala} alt="logoBazarTall" className='w-[89px] h-[35px] flex-shrink-0 cursor-pointer hidden md:flex' />
              {/* <Search /> */}
            </div>
            <div className='flex justify-end gap-2 items-center w-full'>
              {/* Hide on mobile, show on md and larger screens */}
              <div className='gap-2 items-center hidden md:flex'>
                <Menu
                  className='changeThemeModeMenu'
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openThemeMode}
                  onClose={handleCloseThemeMode}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => toggleTheme('dark')}><span className='modeItem' style={{ background: "#000" }}></span></MenuItem>
                  <MenuItem onClick={() => toggleTheme('light')}><span className='modeItem' style={{ background: "#fff" }}></span></MenuItem>
                  <MenuItem onClick={() => toggleTheme('AniGold')}><span className='modeItem' style={{ background: "#033438" }}></span></MenuItem>
                </Menu>
                <span onClick={handleClickThemeMode} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: '.5rem' }}>
                  <FaPalette ></FaPalette>
                </span>
                <Icon icon='notification' className='w-[20px] h-[20px] flex-shrink-0 cursor-pointer lg:hidden md:block' />
                <Icon icon='email' className='w-[30px] h-[30px] flex-shrink-0 cursor-pointer hidden md:block' />
              </div>
              {/* Always show the profile icon */}
              <img src={Profile} alt="profile" className='w-[35px] h-[38px] rounded-[30px] flex-shrink-0  cursor-pointer' />
            </div>
          </header>
        </AppBar>

        {/* navbar */}
        <Drawer variant="permanent" open={open} className='Navbar'>
          {open &&
            <div className='DrawerHeader'>
              <span className='UserProfileImage'>
                <FaUserTie />
              </span>
              <div>
                {UserData?.username}
              </div>
            </div>
          }
          <List>
            {navbarItems.map((Item: any, index: any) => (
              <ListItem key={Item.id} disablePadding sx={{ display: 'block' }}>
                {Item?.showInMenu &&
                  <div style={{ display: 'flex' }}>
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                        },
                        open
                          ? {}
                          : { mr: 'auto' },
                      ]}
                    >
                      {Item?.icon}
                    </ListItemIcon>
                    <SimpleTreeView>
                      <TreeItem itemId={Item?.id} label={Item?.name} onClick={() => { handleNavigate(Item?.path, Item?.children?.length != 0) }}>
                        {Item?.children &&
                          Item?.children.map((child: any) => {
                            return child?.showInMenu && <TreeItem itemId={child?.id} label={child?.name} onClick={() => { handleNavigate(child?.path) }} />
                          })
                        }
                      </TreeItem>
                    </SimpleTreeView>
                  </div>
                }
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* body */}
        <div className="flex flex-col gap-2 p-4 pt-0 bg-MainColor h-screen  w-full">
          <Breadcrumbs />
          {/* Ensure the Outlet content does not overflow */}
          <div className="w-full mr-[6px] overflow-x-auto">
            <Toaster position="bottom-left" style={{
              direction: 'rtl'
            }} />

            <Outlet />
          </div>
        </div>
      </Box>
    </div>

  );
}



const navbarItems: any = [
  {
    id: 2,
    name: "اسناد",
    path: "/documents",
    icon: <FaFileAlt />,
    showInMenu: true,
    children: [
      {
        id: 2.6,
        name: "اسناد",
        path: "/documents/AllDocuments",
        icon: <FaChartBar />,
        showInMenu: true,
      },
    ],
  },
  {
    id: 3,
    name: "محصولات",
    path: "/Products",
    icon: <FaFileAlt />,
    showInMenu: true,
    children: []

  },
  {
    id: 1,
    name: "تعاریف",
    path: "/definitions",
    icon: <MdApps />,
    showInMenu: true,
    children: [
      {
        id: 1.1,
        name: "تعریف مشتری",
        path: "/definitions/customers",
        icon: <FaUser />,
        showInMenu: true,
      },
      {
        id: 1.2,
        name: "تعریف محصول",
        path: "/definitions/products",
        icon: <MdApps />,
        showInMenu: true,
      },
      {
        id: 1.3,
        name: "تعاریف کل",
        path: "/definitions/CustomerType",
        icon: <MdApps />,
        path: "/definitions/Zone",
        icon: <MdApps />, 
        showInMenu: true,
      },

    ],
  },
  {
    id: 6,
    name: 'خروج',
    component: <Login></Login>,
    path: '/Login',
    icon: <LogoutIcon></LogoutIcon>,
    showInMenu: true,
    children: [],
  },
];