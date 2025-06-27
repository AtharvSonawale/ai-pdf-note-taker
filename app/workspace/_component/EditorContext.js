import React, { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const useEditorContext = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState("");

  return (
    <EditorContext.Provider value={{ editorContent, setEditorContent }}>
      {children}
    </EditorContext.Provider>
  );
};
