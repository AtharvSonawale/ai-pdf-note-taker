"use client";

import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import WorkspaceHeader from "../_component/WorkspaceHeader";
import PDFViewer from "../_component/PDFViewer";
import TextEditor from "../_component/TextEditor";

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId });
  const textEditorRef = useRef(null);

  const handleSave = () => {
    document.getElementById("saveButton")?.click(); // ✅ Trigger hidden button in TextEditor
  };

  return (
    <div>
      {fileInfo && (
        <WorkspaceHeader fileName={fileInfo.fileName} onSave={handleSave} />
      )}
      <div className="grid grid-cols-2 gap-5">
        <TextEditor fileId={fileId} ref={textEditorRef} />
        <PDFViewer fileUrl={fileInfo?.fileUrl} />
      </div>
    </div>
  );
}

export default Workspace;
