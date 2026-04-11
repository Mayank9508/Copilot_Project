const Editor = () => {
  return (
    <div className="flex-1 bg-[#1e1e1e] p-4">
      <div className="bg-[#1e1e1e] border border-gray-700 h-full rounded p-3 text-sm text-gray-300">
        {/* Dummy code UI */}
        <pre>
          {`function hello() {
  console.log("VS Code Clone 🔥");
}`}
        </pre>
      </div>
    </div>
  );
};

export default Editor;
