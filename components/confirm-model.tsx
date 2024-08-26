import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
  } from "@/components/ui/alert-dialog";
  import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
  
  interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
    disabled?: boolean;
    header: string;
    description?: string;
  }
  
  export const ConfirmModal = ({
    children,
    onConfirm,
    disabled,
    header,
    description
  }: ConfirmModalProps) => {
    const handleClick = () => {
      onConfirm();
    };
  
    return (
        <AlertDialog>
        <AlertDialogTrigger>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{header}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                disabled={disabled}
                onClick={handleClick}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    );
  };
  