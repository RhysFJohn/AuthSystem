import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import path from "path";
import DataURIParser from "datauri/parser";
import cloudinary from "@/app/lib/scripts/cloudinary";
import sizeOf from "image-size";

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  image?: any;
}) => {
  const oldUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (oldUser) {
    throw new Error("User already exists");
  }

  const parser = new DataURIParser();

  const createImage = async (img: any) => {
    const uploadedImage = await cloudinary.uploader.upload(img, {
      resource_type: "image",
      folder: "users",
      public_id: data.email,
    });

    return uploadedImage;
  }


  if(data.image) {
    const createdImage = await createImage(data.image);
  
    const imageurl = createdImage.url;
  
    data.image = imageurl;
  }


  data.firstName = capitalizeFirstLetter(data.firstName);
  data.lastName = capitalizeFirstLetter(data.lastName);

  data.passwordHash = await bcrypt.hash(data.passwordHash, 10);

  const user = await prisma.user.create({
    data,
  });

  return user;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
