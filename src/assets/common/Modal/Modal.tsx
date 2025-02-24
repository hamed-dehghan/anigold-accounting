import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogOverlay,
} from "../../../components/ui/dialog";
import { useModal } from "../../../store/modal";

type ModalProps = {
    children: React.ReactNode; // The trigger (e.g., a button)
    content: React.ReactNode; // The content to display inside the modal
    className?: string; // Optional class for custom styling
};

const Modal: React.FC<ModalProps> = ({ children, content, className }) => {
    const { isOpen, setIsOpen } = useModal();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogOverlay>
                <DialogContent
                    className={className || "overflow-y-auto md:overflow-hidden max-w-screen-md rounded-[4px] flex-shrink-0  pr-1 !py-0"}
                >
                    {content}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    );
};

export default Modal;