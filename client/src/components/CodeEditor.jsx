import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { initialFiles } from "../constant/InitalFiles.jsx";

const CodeEditor = () => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [filesCode, setFilesCode] = useState(initialFiles);

  return (
    <div className="flex-1 h-full flex flex-col">
      
      {/* 🔹 Language Selector */}
      <div className="px-1 py-2 flex w-full justify-end">
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="border rounded-lg outline-none bg-[#202122] text-white px-2 py-1"
        >
          {Object.keys(initialFiles).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Editor */}
      <div className="h-full flex-1">
        <Editor
          key={currentLanguage} // 🔥 important (force re-render)
          theme="vs-dark"
          height="100%"
          language={currentLanguage}
          value={filesCode[currentLanguage]}
          onChange={(value) => {
            setFilesCode((prev) => ({
              ...prev,
              [currentLanguage]: value || "",
            }));
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;