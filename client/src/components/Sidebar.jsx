// import { useState } from "react";
// import {
//   Files,
//   FolderPlus,
//   FilePlus,
//   RefreshCw,
//   ChevronsDown,
//   Folder,
//   File,
// } from "lucide-react";
// import BottomBar from "./BottomBar";

// const Sidebar = () => {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="flex h-full">
//       {/* LEFT ICON BAR */}
//       <div className="w-12 bg-[#333] flex flex-col items-center py-2">
//         <button
//           onClick={() => setOpen(!open)}
//           className="p-2 hover:bg-gray-700 rounded"
//         >
//           <Files size={20} />
//         </button>
//       </div>

//       {/* EXPLORER PANEL */}
//       <div
//         className={`${
//           open ? "w-64" : "w-0"
//         } bg-[#252526] transition-all duration-300 overflow-hidden flex flex-col`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-2 py-1 border-b border-gray-700">
//           {/* Left text */}
//           <span className="text-xs">EXPLORER</span>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center gap-2">
//             <FilePlus
//               size={14}
//               className="cursor-pointer hover:text-blue-400"
//             />
//             <FolderPlus
//               size={14}
//               className="cursor-pointer hover:text-blue-400"
//             />
//             <RefreshCw
//               size={14}
//               className="cursor-pointer hover:text-blue-400"
//             />

//             {/* ✅ Collapse All Folders Icon */}
//             <ChevronsDown
//               size={14}
//               className="cursor-pointer hover:text-blue-400"
//             />
//           </div>
//         </div>

//         {/* FILE TREE */}
//         <div className="p-2 text-sm space-y-1">
//           <div className="flex items-center gap-1">
//             <Folder size={14} /> COPILOTPROJECT
//           </div>

//           <div className="ml-3 flex items-center gap-1">
//             <Folder size={14} /> client
//           </div>

//           <div className="ml-6 flex items-center gap-1">
//             <File size={14} /> App.jsx
//           </div>
//         </div>

//         {/* BOTTOM */}
//         <BottomBar />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import {
  Files,
  FolderPlus,
  FilePlus,
  Folder,
  File,
  Trash2,
  ChevronsDown,
} from "lucide-react";
import BottomBar from "./BottomBar";

// ✅ VS Code Icons
import {
  VscFolder,
  VscFile,
  VscChevronRight,
  VscChevronDown,
} from "react-icons/vsc";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);

  // 🔥 NEW: expand state
  const [expanded, setExpanded] = useState({ 1: true });

  const [tree, setTree] = useState([
    {
      id: 1,
      name: "ROOT",
      type: "folder",
      children: [],
    },
  ]);

  // 🔹 toggle folder
  const toggleFolder = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🔹 ADD NODE
  const addNode = (nodes, parentId, newNode) => {
    return nodes.map((node) => {
      if (node.id === parentId && node.type === "folder") {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addNode(node.children, parentId, newNode),
        };
      }
      return node;
    });
  };

  // 🔹 DELETE NODE
  const deleteNode = (nodes, id) => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: deleteNode(node.children, id),
          };
        }
        return node;
      });
  };

  // 🔹 CREATE FOLDER
  const handleAddFolder = () => {
    const name = prompt("Folder name");
    if (!name) return;

    const newFolder = {
      id: Date.now(),
      name,
      type: "folder",
      children: [],
    };

    setTree((prev) => addNode(prev, selectedId, newFolder));

    // 🔥 auto expand parent
    setExpanded((prev) => ({ ...prev, [selectedId]: true }));
  };

  // 🔹 CREATE FILE
  const handleAddFile = () => {
    const name = prompt("File name");
    if (!name) return;

    const newFile = {
      id: Date.now(),
      name,
      type: "file",
    };

    setTree((prev) => addNode(prev, selectedId, newFile));
  };

  // 🔹 DELETE HANDLER
  const handleDelete = (id) => {
    setTree((prev) => deleteNode(prev, id));
  };

  // 🔹 RENDER TREE
  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      const isOpen = expanded[node.id];

      return (
        <div key={node.id}>
          <div
            className={`flex items-center justify-between px-1 rounded cursor-pointer ${
              selectedId === node.id ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            style={{ marginLeft: level * 10 }}
            onClick={() => setSelectedId(node.id)}
          >
            <div className="flex items-center gap-1">
              
              {/* 🔥 Arrow */}
              {node.type === "folder" && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(node.id);
                  }}
                >
                  {isOpen ? <VscChevronDown /> : <VscChevronRight />}
                </span>
              )}

              {/* 🔥 ICON (replaced only) */}
              {node.type === "folder" ? (
                <VscFolder size={14} />
              ) : (
                <VscFile size={14} />
              )}

              {node.name}
            </div>

            {/* 🔥 Delete */}
            {node.id !== 1 && (
              <Trash2
                size={12}
                className="hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(node.id);
                }}
              />
            )}
          </div>

          {/* 🔥 children show only if expanded */}
          {node.children && isOpen && renderTree(node.children, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full">
      {/* LEFT */}
      <div className="w-12 bg-[#333] flex flex-col items-center py-2">
        <button onClick={() => setOpen(!open)}>
          <Files size={20} />
        </button>
      </div>

      {/* PANEL */}
      <div className={`${open ? "w-64" : "w-0"} bg-[#252526] flex flex-col`}>
        {/* HEADER */}
        <div className="flex justify-between px-2 py-1 border-b border-gray-700">
          <span className="text-xs">EXPLORER</span>

          <div className="flex gap-2">
            <FilePlus size={14} onClick={handleAddFile} />
            <FolderPlus size={14} onClick={handleAddFolder} />
            <ChevronsDown size={14} />
          </div>
        </div>

        {/* TREE */}
        <div className="p-2 text-sm">{renderTree(tree)}</div>

        <BottomBar />
      </div>
    </div>
  );
};

export default Sidebar;