import { auth } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = (req) => {
  const { userId } = auth(req);
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => {
      const user = handleAuth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(() => {
      console.log("Course image upload complete");
    }),

  courseAttachment: f(["text", "image", "audio", "video", "pdf"])
    .middleware(async (req) => {
      const user = handleAuth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(() => {
      console.log("Course attachment upload complete");
    }),

  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(async (req) => {
      const user = handleAuth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(() => {
      console.log("Chapter video upload complete");
    }),
};
