import { useState } from "react";
import {
  Files,
  FolderPlus,
  FilePlus,
  RefreshCw,
  ChevronDown,
  ChevronsDown,
  Folder,
  File,
} from "lucide-react";
import BottomBar from "./BottomBar";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-full">
      {/* LEFT ICON BAR */}
      <div className="w-12 bg-[#333] flex flex-col items-center py-2">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Files size={20} />
        </button>
      </div>

      {/* EXPLORER PANEL */}
      <div
        className={`${
          open ? "w-64" : "w-0"
        } bg-[#252526] transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-2 py-1 border-b border-gray-700">
          {/* Left text */}
          <span className="text-xs">EXPLORER</span>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2">
            <FilePlus
              size={14}
              className="cursor-pointer hover:text-blue-400"
            />
            <FolderPlus
              size={14}
              className="cursor-pointer hover:text-blue-400"
            />
            <RefreshCw
              size={14}
              className="cursor-pointer hover:text-blue-400"
            />

            {/* ✅ Collapse All Folders Icon */}
            <ChevronsDown
              size={14}
              className="cursor-pointer hover:text-blue-400"
            />
          </div>
        </div>

        {/* FILE TREE */}
        <div className="p-2 text-sm space-y-1">
          <div className="flex items-center gap-1">
            <Folder size={14} /> COPILOTPROJECT
          </div>

          <div className="ml-3 flex items-center gap-1">
            <Folder size={14} /> client
          </div>

          <div className="ml-6 flex items-center gap-1">
            <File size={14} /> App.jsx
          </div>
        </div>

        {/* BOTTOM */}
        <BottomBar />
      </div>
    </div>
  );
};

export default Sidebar;
