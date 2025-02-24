// Specification.tsx
import TooltipProvider from "../../common/Tooltips";
import doesTextFitInContainer from "../../lib/doestTextFitIncontainer";
import { SpecificationsProps } from "./type";

export const Specifications = ({
  info,
  labels,
  className,
  itemClassName,
}: SpecificationsProps) => (
  <div className={`text-gray_45 flex ml-2 flex-wrap h-[21px] items-center mt-3 pr-[9px]  ${className}`}>
    {Object.entries(labels).map(([key, value]) => {
      const text = info[key] || "--";
      const label = `${value}: ${text}`;

      const isTextFit = doesTextFitInContainer(
        label,
        105,
        "IRANSansWeb",
        "400",
        "14px"
      );

      return (
        <div
          key={key}
          className={` truncate ${itemClassName}`}
        >
          <TooltipProvider content={label} delay={700} isShowTooltip={isTextFit}>
            <div className="flex items-center gap-1">
              <span>{value}:</span>
              <span className="truncate">{text}</span>
            </div>
          </TooltipProvider>
        </div>
      );
    })}
  </div>
);