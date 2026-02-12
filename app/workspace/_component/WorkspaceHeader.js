import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WorkspaceHeader({ fileName, onSave }) {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Image src={"/logoipsum-364.svg"} width={140} height={100} alt="1" />
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-2 items-center">
        <Button onClick={onSave}>Save</Button> {/* ✅ Triggers the Save */}
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
