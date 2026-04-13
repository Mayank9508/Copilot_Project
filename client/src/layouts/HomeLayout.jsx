import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import CodeEditor from "../components/CodeEditor";

const HomeLayout = () => {
  return (
    <div className="h-screen flex bg-[#1e1e1e] text-white">
      <Sidebar />
      <CodeEditor />
      <ChatPanel />
    </div>
  );
};

export default HomeLayout;
