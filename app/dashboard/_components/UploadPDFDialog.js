"use client";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";
import { toast } from "sonner";

function UploadPDFDialog({ children, isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
    if (!file) {
      alert("Please select a file.");
      setLoading(false);
      return;
    }

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });

    if (!result.ok) throw new Error("Upload failed");

    const { storageId } = await result.json();
    console.log("StorageId", storageId);
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });
    const resp = await addFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitled File",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    console.log(resp);

    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResp.data.result);
    await embeddDocument({
      splitText: ApiResp.data.result,
      fileId: fileId,
    });
    setLoading(false);
    setOpen(false);

    toast("File is ready...");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          asChild
          onClick={() => setOpen(true)}
          disabled={isMaxFile}
          className="w-full"
        >
          <span>{children}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF file</DialogTitle>
          <DialogDescription>
            <div>
              <div className="flex flex-col mt-5 gap-2 py-3 rounded-md border">
                <h2 className="p-2">Select a file to Upload</h2>
                <input
                  type="file"
                  className="rounded-md border-2 m-2 p-2"
                  accept="application/pdf"
                  onChange={OnFileSelect}
                />
              </div>
              <div className="mt-2">
                <label className="block">File Name *</label>
                <Input
                  placeholder="File Name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
