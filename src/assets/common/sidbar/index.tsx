import {  useState } from "react";
import { AppSidebar } from "./sidbar";
import { useLocation } from "react-router-dom";

const SidebarComponent = () => {
  // React Router
  const location = useLocation();

  // State
  const [ClickedItem, setClickedItem] = useState(false); // Determine if the item in the sidebar is open or closed


  return (
    <>
      <AppSidebar
        ClickedItem={ClickedItem}
        setClickedItem={setClickedItem}
        location={location} // Pass location to AppSidebar
      />
    </>
  );
};

export default SidebarComponent;