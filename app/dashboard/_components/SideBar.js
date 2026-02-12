"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPDFDialog from "./UploadPDFDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const { user } = useUser();
  const path = usePathname();

  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  // Log user email and upgrade status
  console.log("User Email:", user?.primaryEmailAddress?.emailAddress);
  console.log("Upgrade Status:", GetUserInfo?.upgrade);

  // Determine if the upload button should be disabled
  const isMaxFile = !GetUserInfo?.upgrade && fileList?.length >= 5;

  return (
    <div className="shadow-md h-screen p-7">
      <Image src={"/logoipsum-364.svg"} alt="logo" width={170} height={120} />
      <div className="mt-10">
        <div onClick={() => setOpen(true)}>
          <UploadPDFDialog isMaxFile={isMaxFile}>
            <Button className="w-full" disabled={isMaxFile}>
              + Upload Button
            </Button>
          </UploadPDFDialog>
        </div>
        <Link href="/dashboard">
          <div
            className={`flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${
              path === "/dashboard" ? "bg-slate-200" : ""
            }`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>

        <Link href="/dashboard/upgrade">
          <div
            className={`flex gap-2 items-center p-2 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${
              path === "/dashboard/upgrade" ? "bg-slate-200" : ""
            }`}
          >
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
        <div className="absolute bottom-24 w-[80%]">
          {GetUserInfo?.upgrade ? (
            <>
              <p className="text-sm mt-1">Unlimited PDF Uploads</p>
              <p className="text-sm text-gray-400 mt-2">
                Enjoy unlimited uploads with your upgraded plan!
              </p>
            </>
          ) : (
            <>
              <Progress value={(fileList?.length / 5) * 100} />
              <p className="text-sm mt-1">
                {fileList?.length ?? 0} out of 5 PDFs Uploaded
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Upgrade to upload more PDFs
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
