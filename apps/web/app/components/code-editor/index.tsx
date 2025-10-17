"use client";

import Editor from "@monaco-editor/react";
import { Button } from "@repo/ui/components/shadcn/button";
import { useState } from "react";

export default function CodeEditor({
  onSubmit,
}: {
  onSubmit: (code: string) => void;
}) {
  const [code, setCode] = useState("// Write your solution here");

  return (
    <section className="mt-8 w-full max-w-3xl mx-auto space-y-4">
      <Editor
        height="300px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          automaticLayout: true,
        }}
        className="rounded-lg border border-border shadow-md overflow-hidden"
      />

      <Button onClick={() => onSubmit(code)} className="w-full">
        Submit Solution
      </Button>
    </section>
  );
}
