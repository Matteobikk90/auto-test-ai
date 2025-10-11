"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import { Input } from "@repo/ui/components/shadcn/input";
import { useRef, useState } from "react";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadFile() {
    if (!file) return alert("No file selected");
    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/files", { method: "POST", body: data });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Upload failed");
      onUpload(json.url);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}>
        {uploading ? "Uploading..." : "Select Image"}
      </Button>

      {file && (
        <Button type="button" disabled={uploading} onClick={uploadFile}>
          Upload
        </Button>
      )}
    </div>
  );
}
