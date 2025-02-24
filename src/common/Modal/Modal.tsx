// components/ui/modal.tsx
import { Button, ButtonProps } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./../../components/ui/dialog"
import { ReactNode } from "react"

interface ModalProps {
    trigger?: ReactNode
    title?: string
    description?: string
    children: ReactNode
    footer?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    triggerProps?: ButtonProps
    contentClass?: string
}

export const Modal = ({
    trigger,
    title,
    description,
    children,
    footer,
    isOpen,
    onClose,
    triggerProps,
    contentClass
}: ModalProps) => {
    return (
        <Dialog open={isOpen}  onOpenChange={onClose}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger || (
                        <Button variant="outline" {...triggerProps}>
                            Open Modal
                        </Button>
                    )}
                </DialogTrigger>
            )}

            <DialogContent 
            className={`${contentClass}  overflow-y-auto overflow-x-hidden  lg:overflow-hidden max-h-[95%]   lg:h-auto  max-w-screen-sm  lg:max-w-screen-lg    rounded-[4px] flex-shrink-0 bg-white  !py-0  `}
            >
                {/* {title && ( */}
                <DialogHeader className={`${title ? 'block' : 'hidden'}`}>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {/* )} */}

                <div className={``}>
                    {children}
                </div>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}

// Create compound components for better composition
Modal.Trigger = DialogTrigger
Modal.Content = DialogContent
Modal.Header = DialogHeader
Modal.Title = DialogTitle
Modal.Description = DialogDescription
Modal.Footer = DialogFooter