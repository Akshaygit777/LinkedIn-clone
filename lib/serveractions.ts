"use server"

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
  });

export const createPostAction = async (inputText:string,selectedFile:string) => {
    const user = await currentUser();
    if(!user) throw new Error('user not authenticated');
    if(!inputText) throw new Error('input field is required');
    const image = selectedFile;
    const userDatabase : IUser = {
        firstName:user.firstName || "Akshay",
        lastName:user.lastName || "Shukla",
        userId:user.id,
        profilePhoto:user.imageUrl
    }
    try{
        if(image){
            await Post.create({
                description:inputText,
                user:userDatabase,
                imageUrl: 
            })

        }else{
            await Post.create({
                description:inputText,
                user:userDatabase,
            })

        }

    } catch(error:any){
        throw new Error(error);
    }
}