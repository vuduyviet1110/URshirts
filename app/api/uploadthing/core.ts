import { createUploadthing, type FileRouter } from "uploadthing/next";
 import sharp from 'sharp'
import {z} from 'zod'
import prisma from '@/lib/prismadb'
const f = createUploadthing();
 
 
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .input(z.object({configId: z.string().optional()}))
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const {configId} = metadata.input
      const res = await  fetch(file.url)
      const buffer = await res.arrayBuffer()
      const imgMetada = await sharp(buffer).metadata()
       
      const {width, height} = imgMetada

      if(!configId){
        const configuration = await prisma.configuration.create({
          data: {
            height: height || 500,
            width: width || 500,
            imageUrl: file.url
          }
        })

        return {configId :configuration.id}
      }else{
        const updatedConfiguration = await prisma.configuration.update({
          where:{
            id: configId
          },
          data:{
            croppedImageUrl: file.url
          }
        })
        return {configId: updatedConfiguration.id}
      }
      
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;