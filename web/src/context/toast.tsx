import {
  createContext,
  use,
  useCallback,
  useState,
  type ReactNode,
} from "react";

export type Toast = {
  id: string;
  title: string;
  detail: string;
  type: "error" | "info" | "success";
};

type ToastCtx = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastCtx>({} as ToastCtx);

interface ProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    setToasts((old) => [...old, { id: crypto.randomUUID(), ...toast }]);
  }, []);

  const removeToast = useCallback(
    (id: string) => setToasts((old) => old.filter((toast) => toast.id !== id)),
    [],
  );

  return (
    <ToastContext
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext>
  );
}

export function useToast() {
  const ctx = use(ToastContext);

  if (!ctx) throw new Error("Deve ser utilizado dentro de um ToastProvider");

  return ctx;
}
