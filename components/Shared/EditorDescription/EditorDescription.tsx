"use client";

import dynamic from "next/dynamic";
import { useMemo, useCallback } from "react";
import "react-quill-new/dist/quill.snow.css";

export type EditorDescriptionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EditorDescription = ({ value, onChange }: EditorDescriptionProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { 
      ssr: false,
      loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded border"></div>
    }),
    []
  );

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'list', 'link'
  ];

  const handleChange = useCallback((content: string) => {
    if (content !== value) {
      onChange(content);
    }
  }, [value, onChange]);

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Escribe la descripción del capítulo aquí..."
        preserveWhitespace={false}
      />
    </div>
  );
};
