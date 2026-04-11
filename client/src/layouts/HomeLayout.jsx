import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import ChatPanel from "../components/ChatPanel";

const HomeLayout = () => {
  return (
    <div className="h-screen flex bg-[#1e1e1e] text-white">
      <Sidebar />
      <Editor />
      <ChatPanel />
    </div>
  );
};

export default HomeLayout;
