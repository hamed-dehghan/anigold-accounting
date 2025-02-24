import { Button } from "../ui/button";
import Icon from "../../lib/icon";
import TooltipProvider from "../../common/Tooltips/index";
import { DocumentInfo } from "./Types";

type HeaderProps = {
    info: DocumentInfo;
    onEdit: () => void;
    onClose: () => void;
    isEditMode: boolean;
};

export const Header = ({ info, onEdit, onClose, isEditMode }: HeaderProps) => (
    <div 
    className="h-[76px] flex-shrink-0 flex justify-between items-center pr-3 "
    >
        <div className="h-[75px] flex justify-start items-center gap-2 text-gray_45 w-[303px]">
            <span>مشاهده سند:</span>
            <span>{info.typeDoc}</span>
            <TooltipProvider content="اینجا میتوانید جزییات سند را مشاهده کنید" isShowTooltip={false}>
                <Icon icon="question" className="w-6 h-6 border p-1 rounded-[50px] fill-white text-blue" />
            </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
            {!isEditMode && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-[21px] h-[20px] flex-shrink-0 bg-yellow_5 hover:bg-yellow_5 rounded-[8px] py-[2px]"
                    onClick={onEdit}
                >
                    <Icon icon="edite" />
                </Button>
            )}
            <Button
                variant="ghost"
                size="icon"
                className="w-[21px] h-[20px] flex-shrink-0 bg-MainColor hover:bg-MainColor rounded-[20px] py-[7px]"
                onClick={onClose}
            >
                <Icon icon="xmark" size={13} />
            </Button>
        </div>
    </div>
);