import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import CommentInput from './CommentInput';
import Comments from './Comments';

const SocialOptions = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [commentOpen, setCommentOpen] = useState(false);
    const [isProcessingLike, setIsProcessingLike] = useState(false);
    const likeOrDislikeHandler = async () => {
        if (!user?.id || isProcessingLike) return;
      
        const userId = user.id;
        const shouldLike = !liked;
      
        
        setLiked(shouldLike);
        setLikes(prev => 
          shouldLike 
            ? [...(prev ?? []), userId]
            : (prev ?? []).filter(id => id !== userId)
        );
      
        setIsProcessingLike(true);
      
        const endpoint = shouldLike ? 'like' : 'dislike';
      
        try {
          const response = await fetch(`/api/posts/${post._id}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify({ userId }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (!response.ok) throw response;
      
          const data = await response.json();
          const freshLikes = Array.isArray(data.likes) ? data.likes : likes;
      
          setLikes(freshLikes);
          setLiked(freshLikes.includes(userId));
        } catch {
          
          console.debug('Like request failed but keeping optimistic state');
        } finally {
          setIsProcessingLike(false);
        }
      };
    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-800'>
                {(likes && likes.length > 0) && (
                    <p className='text-sm text-gray-300 hover:text-blue-500 hover:underline hover:cursor-pointer'>
                        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                    </p>
                )}
                {(post.comments && post.comments.length > 0) && (
                    <p 
                        onClick={() => setCommentOpen(!commentOpen)} 
                        className='text-sm text-gray-300 hover:text-blue-500 hover:underline hover:cursor-pointer'
                    >
                        {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                    </p>
                )}
            </div>

            <div className='flex items-center m-1 justify-between'>
                <Button
                    onClick={likeOrDislikeHandler}
                    variant={'ghost'}
                    disabled={isProcessingLike}
                    className='flex items-center gap-1 rounded-lg text-gray-300 hover:text-black'
                >
                    {isProcessingLike ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                    ) : (
                        <ThumbsUp
                            className={`${liked && 'fill-[#378FE9] stroke-[#378FE9]'}`}
                        />
                    )}
                    <p className={`${liked && 'text-[#378FE9]'}`}>
                        {isProcessingLike ? '' : 'Like'}
                    </p>
                </Button>

                <Button 
                    onClick={() => setCommentOpen(!commentOpen)} 
                    variant={'ghost'} 
                    className='flex items-center gap-1 rounded-lg text-gray-300 hover:text-black'
                >
                    <MessageCircleMore />
                    <p>Comment</p>
                </Button>

                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-300 hover:text-black'>
                    <Repeat />
                    <p>Repost</p>
                </Button>

                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-300 hover:text-black'>
                    <Send />
                    <p>Share</p>
                </Button>
            </div>

            {commentOpen && (
                <div className='p-4 border-t border-gray-800'>
                    <CommentInput postId={post._id} />
                    <Comments post={post} />
                </div>
            )}
        </div>
    )
}

export default SocialOptions