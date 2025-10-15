"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import { Input } from "@repo/ui/components/shadcn/input";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { useRef, useState } from "react";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/files", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");

      onUpload(json.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Upload failed", { description: msg, duration: 2000 });
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFile = e.target.files?.[0];
    if (!newFile) return toast.error("No file selected", { duration: 2000 });
    setFile(newFile);
    uploadFile(newFile);
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      <Button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}>
        {uploading ? "Uploading..." : file ? "Replace Image" : "Select Image"}
      </Button>
    </div>
  );
}
