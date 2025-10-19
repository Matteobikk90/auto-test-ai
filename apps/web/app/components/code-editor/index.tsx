"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto rounded-lg border border-border shadow-md overflow-hidden">
      <Editor
        height="320px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
