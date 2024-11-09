import { createUploadthing, type FileRouter } from "uploadthing/next";
 
interface UploadMetadata {
  userId: string;
}
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }: { metadata: UploadMetadata | undefined; file: { url: string } }) => {
      if (metadata?.userId) {
        console.log("Upload complete for userId:", metadata.userId);
      } else {
        console.log("Upload complete but userId is missing in metadata.");
      }
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata?.userId || "unknown" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
