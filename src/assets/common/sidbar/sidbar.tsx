import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
} from "../../../components/ui/sidebar";
import { itemsSidBar } from "./itemSideBar";
// import { useSidebar } from "../../components/ui/sidebar";
import React from "react";
import { MenuItem } from "./MenuItem";
import Logo from '../../assets/images/logoAriam.svg'
// Define the props for AppSidebar
interface AppSidebarProps {
  ClickedItem: boolean;
  setClickedItem: (value: boolean | ((prev: boolean) => boolean)) => void;
  location: { pathname: string };
}
const textFooter = 'مشاوران نرم افزاری آریام'
// AppSidebar.tsx
export function AppSidebar({ ClickedItem, setClickedItem, location }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" side="right" variant="floating"
      className=" !border-none flex-shrink-0 rounded-[15px] bg-white  text-colorTextSidbar "
    >
      <SidebarContent className="bg-white hide-scrollbar  !p-0 ">
        <SidebarGroup className={`${  state !== "collapsed" && '!pr-0 '}`}>
          <SidebarGroupContent>
            <SidebarMenu >
              {itemsSidBar.map((item) => (
                <React.Fragment key={item.title}>
                  <MenuItem
                    state={state}
                    item={item}
                    ClickedItem={ClickedItem}
                    setClickedItem={setClickedItem}
                    location={location}
                  />
                  {/* Render the separator if the item has the `separator` property */}

                  {item.separator && state !== "collapsed" && <Seprator />}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {state !== "collapsed" && <Seprator />}
      <SidebarFooter className={`${state === 'collapsed' ? 'hidden' : ' bg-white flex flex-row justify-start items-center py-5 px-5'}`}>
        <img src={Logo} alt="Aryam Software Consultants Company" className="w-[38px] h-[35px] flex-shrink-0" />
        <span className="font-Poppins text-[16px]">{textFooter}</span>
      </SidebarFooter>
    </Sidebar>
  );
}


export const Seprator = React.memo(() => {
  return (
    <div className="flex py-0 px-[16px]">
      <div className="w-full border border-seprator" />
    </div>
  );
});