import { useState, useEffect } from "react";
import {
  Files,
  FolderPlus,
  FilePlus,
  Trash2,
  ChevronsDown,
} from "lucide-react";
import {
  VscFolder,
  VscFile,
  VscChevronRight,
  VscChevronDown,
} from "react-icons/vsc";
import BottomBar from "./BottomBar";
import { createFile, getFiles, deleteFile } from "../sevices/file/index.js";
import {
  createFolder,
  getFolders,
  deleteFolder,
} from "../sevices/folder/index.js";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [tree, setTree] = useState([
    { id: "root", name: "ROOT", type: "folder", children: [] },
  ]);


  const fetchAll = async () => {
    try {
      const [filesRes, foldersRes] = await Promise.all([
        getFiles(),
        getFolders(),
      ]);

      console.log("filesRes:", filesRes); // ← add karo
      console.log("foldersRes:", foldersRes); // ← add karo

      const folders = (foldersRes?.folders || []).map((name) => ({
        id: `folder-${name}`,
        name,
        type: "folder",
        children: [],
      }));

      const files = (filesRes?.files || []).map((name) => ({
        id: `file-${name}`,
        name,
        type: "file",
      }));

      console.log("folders:", folders); // ← add karo
      console.log("files:", files); // ← add karo

      setTree([
        {
          id: "root",
          name: "ROOT",
          type: "folder",
          children: [...folders, ...files],
        },
      ]);

      setExpanded({ root: true });
    } catch (err) {
      console.error("fetchAll error:", err);
    }
  };

  //Page load pe backend se data laao
  useEffect(() => {
    fetchAll();
  }, []);

  // Folder toggle
  const toggleFolder = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  //Folder create — backend + frontend
  const handleAddFolder = async () => {
    const name = prompt("Folder name");
    if (!name) return;

    await createFolder({ folderName: name });
    await fetchAll(); // backend se fresh data laao
  };

  // File create — backend + frontend
  const handleAddFile = async () => {
    const name = prompt("File name");
    if (!name) return;

    await createFile({ fileName: name, content: "" });
    await fetchAll(); // backend se fresh data laao
  };

  // Delete — backend + frontend
  const handleDelete = async (node) => {
    if (node.type === "file") {
      await deleteFile(node.name);
    } else {
      await deleteFolder(node.name);
    }
    await fetchAll(); // backend se fresh data laao
  };

  // Render Tree
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
            onClick={() => {
              setSelectedId(node.id);
              if (node.type === "folder") toggleFolder(node.id);
            }}
          >
            <div className="flex items-center gap-1">
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
              {node.type === "folder" ? (
                <VscFolder size={14} />
              ) : (
                <VscFile size={14} />
              )}
              {node.name}
            </div>

            {node.id !== "root" && (
              <Trash2
                size={12}
                className="hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(node);
                }}
              />
            )}
          </div>

          {node.children && isOpen && renderTree(node.children, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full">
      <div className="w-12 bg-[#333] flex flex-col items-center py-2">
        <button onClick={() => setOpen(!open)}>
          <Files size={20} />
        </button>
      </div>

      <div className={`${open ? "w-64" : "w-0"} bg-[#252526] flex flex-col`}>
        <div className="flex justify-between px-2 py-1 border-b border-gray-700">
          <span className="text-xs">EXPLORER</span>
          <div className="flex gap-2">
            <FilePlus
              size={14}
              onClick={handleAddFile}
              className="cursor-pointer hover:text-white"
            />
            <FolderPlus
              size={14}
              onClick={handleAddFolder}
              className="cursor-pointer hover:text-white"
            />
            <ChevronsDown size={14} />
          </div>
        </div>

        <div className="p-2 text-sm">{renderTree(tree)}</div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Sidebar;
