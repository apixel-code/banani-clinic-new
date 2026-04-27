import { AlertTriangle, Trash2, X } from "lucide-react";
import { useEffect } from "react";

interface DeleteConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  itemName?: string;
  confirmLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  title,
  message,
  itemName,
  confirmLabel = "Delete",
  loading = false,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, onCancel, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close delete confirmation"
        className="absolute inset-0 cursor-default"
        onClick={loading ? undefined : onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </span>
            <h2 className="font-bold" style={{ color: "#1A3A5C" }}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <p className="text-sm leading-relaxed text-gray-600">{message}</p>
          {itemName && (
            <div
              className="rounded-xl px-4 py-3 text-sm font-semibold break-words"
              style={{ backgroundColor: "#EBF4FF", color: "#1A3A5C" }}
            >
              {itemName}
            </div>
          )}
          <p className="text-xs text-gray-400">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 transition-colors"
          >
            <Trash2 size={15} />
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
