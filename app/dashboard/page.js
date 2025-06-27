"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Dashboard() {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  console.log(fileList);

  return (
    <div>
      <h2 className="font-medium text-3xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10">
        {fileList?.length > 0 ? (
          fileList?.map((file, index) => (
            <Link key={file.fileId || index} href={`/workspace/${file.fileId}`}>
              <div className="flex p-5 m-2.5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all">
                <Image
                  src={"/pdf-file.png"}
                  alt="file"
                  width={50}
                  height={50}
                />
                <h2 className="mt-3 font-medium text-lg">{file?.fileName}</h2>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center">
            <p className="text-gray-500 text-lg">No files uploaded yet.</p>
            <p className="text-gray-500 text-lg mt-2">
              Upload your first PDF to get started!
            </p>
            {/* You can add an upload button or any other UI element here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
