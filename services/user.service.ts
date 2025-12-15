import { prisma } from "../utils/prisma";
import cloudinary from "../config/cloudinary";
import { AppError } from "../utils/AppError";

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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, avatarUrl: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!name && !file) {
    throw new AppError("Nothing to update", 400);
  }

  let avatarUrl: string | undefined;

  if (file?.buffer) {
    avatarUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "profile_pics",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result?.secure_url) {
            return reject(new AppError("Image upload failed", 500));
          }
          resolve(result.secure_url);
        }
      );

      stream.end(file.buffer);
    });
  }

  const data: Record<string, any> = {};

  if (name) data.name = name;
  if (avatarUrl) data.avatarUrl = avatarUrl;

  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
  });
};
