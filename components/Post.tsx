"use client"
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import PostContent from './PostContent'
import { Badge } from './ui/badge'
import SocialOptions from './SocialOptions'
import ReactTimeago from 'react-timeago'
import { deletePostAction } from '@/lib/serveractions'




const Post = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;

    return (
        <div className='bg-[#161722] my-2 mx-2 md:mx-0 rounded-lg border border-gray-800 text-white'>
            <div className=' flex gap-2 p-4'>
                <ProfilePhoto src={post?.user?.profilePhoto!} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold text-white'>{fullName}</h1>
                        <p className='text-xs text-gray-500 text-white'>@{user ? user?.username : "username"}</p>
                       
                        <p className='text-xs text-gray-300'>
                        <ReactTimeago date = {new Date (post.createdAt)}/>
                           
                        </p>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser && (
                            <Button  onClick={() => {
                                 const res = deletePostAction(post._id);
                            }} size={'icon'} className='rounded-full bg-gray-700' variant={'outline'}>
                                <Trash2/>
                            </Button>
                        )
                    }
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post = {post}/>
    
        </div>
    )
}

export default Post