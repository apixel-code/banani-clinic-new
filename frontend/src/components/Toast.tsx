import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed top-20 right-4 z-[200] flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-white font-medium text-sm max-w-xs toast-enter ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={16} /></button>
    </div>
  );
}

interface ToastState { message: string; type: 'success' | 'error'; id: number; }
type ToastCb = (msg: string, type?: 'success' | 'error') => void;
let _id = 0;
let _cb: ToastCb | null = null;

export function useToast(): ToastCb {
  return (msg, type = 'success') => { if (_cb) _cb(msg, type); };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  useEffect(() => {
    _cb = (msg, type = 'success') => setToasts((p) => [...p, { message: msg, type, id: ++_id }]);
    return () => { _cb = null; };
  }, []);
  return (
    <>
      {children}
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />
      ))}
    </>
  );
}
