import { ImageOff, Loader2, UploadCloud } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useToast } from "./Toast";
import adminApi from "../lib/adminApi";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  previewAlt?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  folder = "banani-clinic",
  placeholder = "https://...",
  previewAlt = "Uploaded image preview",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const toast = useToast();

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file.", "error");
      event.target.value = "";
      return;
    }

    setUploading(true);
    setPreviewError(false);
    try {
      const result = await adminApi.uploadImageToCloudinary(file, folder);
      onChange(result.secure_url || result.url);
      toast("Image uploaded.", "success");
    } catch (err: any) {
      toast(err.message || "Failed to upload image.", "error");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="label mb-0">{label}</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60 transition-colors"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UploadCloud size={14} />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={upload}
      />

      <input
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          setPreviewError(false);
          onChange(event.target.value);
        }}
      />

      {value && (
        <div className="rounded-xl overflow-hidden h-40 bg-gray-100 border border-gray-100">
          {previewError ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              <ImageOff size={20} className="mr-2" />
              Image not found
            </div>
          ) : (
            <img
              src={value}
              alt={previewAlt}
              className="w-full h-full object-cover"
              onError={() => setPreviewError(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
