import { ReactNode } from "react";
import {
  Dialog as DialogRoot,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./primitive";

export type BaseDialogProps = {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

type DialogPros = BaseDialogProps & {
  title: string;
  description?: string;
  content: ReactNode;
};

export function Dialog({
  children,
  content,
  title,
  description,
  open,
  setOpen,
}: DialogPros) {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      {children && (
        <DialogTrigger asChild className="cursor-pointer">
          {children}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription />
          )}
        </DialogHeader>
        {content}
      </DialogContent>
    </DialogRoot>
  );
}
