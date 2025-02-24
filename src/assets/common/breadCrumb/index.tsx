import { NavLink, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Icon from "../../../lib/icon";
import { Button } from "../../../components/ui/button";
import routes from "../../../routes/routes";
export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  return (
    <div
      className="my-[0px] mr-[20px] h-[22px] flex-shrink-0 flex items-center gap-1 mt-[87px]"
    >
      {breadcrumbs.map(({ match, breadcrumb }, i) => {

        // Handle null breadcrumb
        if (!breadcrumb) {
          return null; // Skip rendering this breadcrumb
        }

        return (
          <div key={i} className="space-x-2 flex items-center gap-1">
            {match.route?.path !== "*" && (
              <>
                {/* Render the chevron-left icon only if it's not the first breadcrumb */}
                {i > 0 && (
                  <Icon icon="chevron-left" className="w-5 h-5 text-blue" />
                )}
                <NavLink
                  className={`${location.pathname === match.pathname ? "text-gray_10" : "text-blue"
                    } text-[17px] font-[400] leading-[21px] font-Poppins`}
                  to={match.pathname}
                >
                  {typeof breadcrumb === "object" &&
                    "props" in breadcrumb &&
                    typeof breadcrumb.props.children === "string"
                    ? decodeURI(breadcrumb.props.children) + " "
                    : breadcrumb + "  "}
                </NavLink>
                {location.pathname === match.pathname && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-[50%] w-5 h-5 p-1 bg-white hover:!bg-white"
                  >
                    <Icon icon="question" className="w-5 h-5 text-blue" />
                  </Button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};