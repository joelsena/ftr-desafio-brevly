import { AnimatePresence } from "motion/react";
import { useToast } from "../context/toast";
import { Toast } from "./Toast";

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="flex flex-col p-6 gap-2 absolute bottom-0 right-0 w-[min(360px,100%)]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
