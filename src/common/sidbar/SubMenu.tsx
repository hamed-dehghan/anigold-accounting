import React from "react";
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
} from "../../components/ui/sidebar";
import { NavLink } from "react-router-dom";

// Define the types for SubMenuItem
type SubMenuItem = {
  title: string;
  url: string;
  icon: string;
};

interface SubMenuProps {
  subMenu?: SubMenuItem[];
  location: { pathname: string }; // Add location to the props interface
}

export const SubMenu = React.memo(({ subMenu, location }: SubMenuProps) => {
  return (
    <div 
    className="pr-[2px] pt-[10px]"
    >
      <SidebarMenuSub className="border-r border-l-0 h-fit py-0 ">
        {subMenu?.map((subItem) => {

          const isActiveSidebarMenuSubItem = location.pathname === subItem.url
          return (
            // 
            <SidebarMenuSubItem key={subItem.title} className={`h-[23px] rounded-sm`}>
              <SidebarMenuButton asChild className=" w-full h-[23px] hover:!bg-colorTextSidbar hover:!text-white">
                <NavLink
                  to={subItem.url}
                  className={`flex items-center gap-2 pr-1 py-0  ${isActiveSidebarMenuSubItem && 'bg-colorTextSidbar text-white'}`} // Apply styles based on isActive
                >
                  <span className="text-[13px] font-[400]">{subItem.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    </div>
  )
});