import { prisma } from "../utils/prisma";
import cloudinary from "../config/cloudinary";

interface UpdateUserProfileInput {
  userId: string;
  name?: string;
  file?: Express.Multer.File;
}

export const updateUserProfile = async ({
  userId,
  name,
  file,
}: UpdateUserProfileInput) => {
  let avatarUrl: string | undefined;

  if (file && file.buffer) {
    avatarUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pics" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || "");
        }
      );
      stream.end(file.buffer);
    });
  }

  const data: any = {};
  if (name) data.name = name;
  if (avatarUrl) data.avatarUrl = avatarUrl;
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, avatarUrl: true },
  });
};
