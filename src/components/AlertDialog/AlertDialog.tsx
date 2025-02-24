import { ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button, ButtonProps } from "../../components/ui/button";

interface AlertDialogModalProps {
    trigger?: ReactNode; // Custom trigger element
    title?: string; // Dialog title
    description?: string; // Dialog description
    children?: ReactNode; // Custom content for the dialog body
    footer?: ReactNode; // Custom footer content
    isOpen?: boolean; // Controlled open state
    onClose?: () => void; // Callback when dialog closes
    onConfirm?: () => void; // Callback when user confirms
    triggerProps?: ButtonProps; // Props for the default trigger button
    contentClass?: string; // Custom class for the dialog content
    cancelText?: string; // Text for the cancel button
    confirmText?: string; // Text for the confirm button
}

const AlertDialogModal = ({
    trigger,
    title,
    description,
    children,
    footer,
    isOpen,
    onClose,
    onConfirm,
    triggerProps,
    contentClass,
    cancelText = "Cancel",
    confirmText = "Continue",
}: AlertDialogModalProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/* Custom Trigger */}
            {trigger ? (
                <AlertDialogTrigger asChild>
                    {trigger}
                </AlertDialogTrigger>
            ) : (
                <AlertDialogTrigger asChild>
                    <Button variant="outline" {...triggerProps}>
                        Open
                    </Button>
                </AlertDialogTrigger>
            )}

            {/* Dialog Content */}
            <AlertDialogContent className={contentClass}>
                {/* Header */}
                {/* {title && ( */}
                    <AlertDialogHeader className={`${title ? 'block' : 'hidden'}`}>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        {description && (
                            <AlertDialogDescription>
                                {description}
                            </AlertDialogDescription>
                        )}
                    </AlertDialogHeader>
                {/* )} */}

                {/* Custom Body Content */}
                {children}

                {/* Footer */}
                {footer ? (
                    <AlertDialogFooter>{footer}</AlertDialogFooter>
                ) : (
                    <AlertDialogFooter className="flex gap-3">
                        <AlertDialogCancel className="">{cancelText}</AlertDialogCancel>
                        <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-600"
                        onClick={onConfirm}>
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

// Compound Components for Better Composition
AlertDialogModal.Trigger = AlertDialogTrigger;
AlertDialogModal.Content = AlertDialogContent;
AlertDialogModal.Header = AlertDialogHeader;
AlertDialogModal.Title = AlertDialogTitle;
AlertDialogModal.Description = AlertDialogDescription;
AlertDialogModal.Footer = AlertDialogFooter;
AlertDialogModal.Cancel = AlertDialogCancel;
AlertDialogModal.Action = AlertDialogAction;

export default AlertDialogModal;