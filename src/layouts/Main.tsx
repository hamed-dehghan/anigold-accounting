import Header from "../common/header/Header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import SidebarComponent from "../common/sidbar";
import { Breadcrumbs } from "../common/breadCrumb";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Header />
      <SidebarComponent />
      <SidebarInset className="overflow-x-hidden  ">
        <div className="flex flex-col gap-2 pl-6 pr-3 md:px-6 pt-0 bg-MainColor h-full">
          <Breadcrumbs />
          {/* Ensure the Outlet content does not overflow */}
          <div className="w-full mr-[6px] overflow-x-auto">
            <Toaster position="bottom-left" style={{
              direction:'rtl'
            }}/>

            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}