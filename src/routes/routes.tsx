import MainLayout from "../layouts/Main";
import { lazy } from "react"
import DefinitionsPage from '../pages/DefinitionsPages/DefinitionsPage/DefinitionsPage';
import Definition_CustomerType from '../pages/DefinitionsPages/Definition_CustomerType/Definition_CustomerType';
import Definition_Zone from '../pages/DefinitionsPages/Definition_Zone/Definition_Zone';
import Definition_BankBranch from '../pages/DefinitionsPages/Definition_BankBranch/Definition_BankBranch';
import Definition_Stone from '../pages/DefinitionsPages/Definition_Stone/Definition_Stone';
import Definition_Currency from '../pages/DefinitionsPages/Definition_Currency/Definition_Currency';
import Definition_Laboratory from '../pages/DefinitionsPages/Definition_Laboratory/Definition_Laboratory';
import Definition_Bankaccount from '../pages/DefinitionsPages/Definition_Bankaccount/Definition_Bankaccount';
import Definition_Incometype from '../pages/DefinitionsPages/Definition_Incometype/Definition_Incometype';
import Definition_Costtype from '../pages/DefinitionsPages/Definition_Costtype/Definition_Costtype';
import Definition_Storage from '../pages/DefinitionsPages/Definition_Storage/Definition_Storage';
import Definition_Income from '../pages/DefinitionsPages/Definition_Income/Definition_Income';
import Definition_Cost from '../pages/DefinitionsPages/Definition_Cost/Definition_Cost';
import { FaFileAlt, FaChartBar, FaTools, FaCogs, FaUser } from "react-icons/fa";
import { MdApps } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import Spinner from '../common/loading/spinner';
import Customer from '../pages/Customer/Customer';
import Login from "../pages/Login/Login";
import Products from "../pages/Products";
// routes.ts
interface Route {
  path: string;
  element: React.ReactNode;
  breadcrumb?: string | React.ReactNode;
  auth?: string;
  layout?: React.ReactNode;
  lastRoute?: boolean
}
// const AllDocuments = lazy(() => import('../pages/documents/allDocuments'))
const routes: Route[] = [
  {
    path: "/",
    element: '#',
    breadcrumb: "پیشخوان",
  },
  // {
  //   path: "/documents/AllDocuments",
  //   element: <AllDocuments />,
  //   breadcrumb: "اسناد",
  //   auth: "user",
  //   lastRoute: false
  // },
  {
    breadcrumb: 'تعاریف',
    path: '/definitions',
    layout: <MainLayout />,
    element: '#',
    auth: "user",
  },
  {
    path: "/definitions/Products",
    element: <Products />,
    layout: <MainLayout />,
    breadcrumb: ' مشاهده همه محصولات',
    auth: "user",
    lastRoute: false
  },
  {
    path: "/definitions/customers",
    element: <Customer />,
    breadcrumb: "تعریف مشتری",
    auth: "admin",
    lastRoute: true
  },
  {
    path: "/definitions/products",
    element: <Customer />,
    breadcrumb: "تعریف محصول",
    auth: "admin",
    lastRoute: true
  },
  {
    path: "/definitions/:page",
    element: <DefinitionsPage />,
    breadcrumb: "تعاریف کل",
    auth: "admin",
    lastRoute: true
  },
];

export default routes;