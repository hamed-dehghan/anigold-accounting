import { toast } from 'sonner';

type ToastProps = {
    message: string;
    type?: 'success' | 'error' | 'default';
    duration?: number;
    className?: string;
    icon?: React.ReactNode;
    onAction?: () => void;
    actionLabel?: string;
};

const Toast: React.FC<ToastProps> = ({ message, type = 'default', duration = 5000, className, icon, onAction, actionLabel }) => {
    const toastOptions = {
        className: className || (type === 'success' ? 'bg-green_1 text-white ' : type === 'error' ? 'bg-red_5 text-white' : ''),
        
        duration,
        icon,
        action: onAction ? { label: actionLabel || 'Action', onClick: onAction } : undefined,
        
    };

    if (type === 'success') {
        toast.success(message, toastOptions);
    } else if (type === 'error') {
        toast.error(message, toastOptions);
    } else {
        toast(message, toastOptions);
    }

    return null; // Since toast is rendered outside the component, we return null
};

export default Toast;
