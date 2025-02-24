// Header.tsx
import { Button } from "../ui/button";
import Icon from "../../lib/icon";
import TooltipProvider from "../../common/Tooltips";
import { HeaderProps } from "./type";

export const Header = ({
  info,
  onEdit,
  onClose,
  isEditMode,
  className,
  headerTitlePrefix = "مشاهده",
  infoTooltipContent = "اینجا میتوانید جزییات را مشاهده کنید",
}: HeaderProps) => (
  <div className={` h-[76px] flex flex-col  md:justify-between md:flex-row items-center ${className}   `}>
    <div className="h-[75px] flex items-center gap-1 md:gap-2 text-gray_45 w-fit   truncate ">
      <span>{headerTitlePrefix}:</span>
      <span>{info.type || ""}</span>
      <TooltipProvider content={infoTooltipContent} isShowTooltip={false}>
        <Icon
          icon="question"
          className="w-6 h-6 border p-1 rounded-[50px] fill-white"
        />
      </TooltipProvider>
    </div>

    <div className="flex items-center gap-4">
      {isEditMode === 'view' && onEdit && (
        <Button
          variant="ghost"
          size="icon"
          className="w-[21px] h-[20px] bg-yellow_5 hover:bg-yellow_5 rounded-[8px] py-[2px]"
          onClick={onEdit}
        >
          <Icon icon="edite" />
        </Button>
      )}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="w-[21px] h-[20px]  md:hover:bg-MainColor  rounded-[20px] py-[7px]"
          onClick={onClose}
        >
          <Icon icon="xmark" size={13} />
        </Button>
      )}
    </div>
  </div>
);