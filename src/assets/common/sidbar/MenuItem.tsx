import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
    SidebarMenuItem,
    SidebarMenuButton,
} from "../../../components/ui/sidebar";
import { NavLink } from "react-router-dom";
import Icon from "../../../lib/icon";
import { SubMenu } from "./SubMenu";

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
    separator?: boolean;
};

interface MenuItemProps {
    item: SidebarItem;
    ClickedItem: boolean;
    setClickedItem: (value: boolean | ((prev: boolean) => boolean)) => void;
    location: { pathname: string };
    state: string
}

export const MenuItem = React.memo(({ item, ClickedItem, setClickedItem, location, state }: MenuItemProps) => {
    // Determine if the current item or any of its submenu items are active
    const isActive = location.pathname === item.url || item.subMenu?.some(subItem => subItem.url === location.pathname);
    // Determine if the collapsible should be open
    const isOpen = item.subMenu?.some(subItem => subItem.url === location.pathname) || (ClickedItem && location.pathname === item.url);

    return (
        <SidebarMenuItem className={`${state === "collapsed" && 'pr-[4px]'}`}>
            {item.subMenu ? (
                <Collapsible.Root defaultOpen={isOpen} onOpenChange={(open) => setClickedItem(open)}>
                    <Collapsible.Trigger asChild>
                        <SidebarMenuButton
                            isActive={isActive}
                            asChild
                            className={`h-[45px]  ${isActive && '!pr-0'}  group  gap-[12px]   self-stretch !bg-white hover:!bg-colorTextSidbar hover:!text-white`}
                        >

                            <NavLink to={item.url} className="flex items-center gap-2   flex-1">
                                {isActive && state !== "collapsed" && (
                                    <div className="bg-colorTextSidbar w-[5px] h-[22px]  flex-shrink-0 rounded-tl-[15px] rounded-bl-[15px]"></div>
                                )}
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-4 ">
                                        <Icon icon={item.icon} className="w-[20px]w-full h-[20px] flex-shrink-0" />
                                        <span className="text-[14px] font-[400]">{item.title}</span>
                                    </div>
                                    <Icon
                                        icon={isOpen ? "cheverdown" : "chevron-left"}
                                        className="w-4 h-4 transition-transform duration-200 collapsible-open:rotate-180"
                                    />
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </Collapsible.Trigger>
                    <Collapsible.Content className="CollapsibleContent">
                        <SubMenu subMenu={item.subMenu} location={location} />
                    </Collapsible.Content>
                </Collapsible.Root>
            ) : (
                <SidebarMenuButton asChild className={`h-[46px] ${isActive && '!pr-0'}  !bg-white hover:!bg-colorTextSidbar hover:!text-white`} isActive={isActive}>
                    <NavLink to={item.url} className="flex items-center gap-2 p-2">
                        {isActive && (
                            <div className="bg-colorTextSidbar w-[5px] h-[22px] flex-shrink-0 rounded-tl-[15px] rounded-bl-[15px]"></div>
                        )}
                        <div className="flex items-center gap-4">
                            <Icon icon={item.icon} className="w-[20px] h-[20px] flex-shrink-0" />
                            <span className="text-[14px] font-[400]">{item.title}</span>
                        </div>
                    </NavLink>
                </SidebarMenuButton>
            )}
        </SidebarMenuItem>
    );
});