import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata }) => {
    return { uploadedBy: metadata };
  }),
  chapterVideo : f({
    video: { maxFileCount: 1, maxFileSize: "512GB" }
  }).onUploadComplete(({file}) => {
    return { url: file.url };
  })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
