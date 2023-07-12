import connectDB from '@/config/dbConnect';
import PostModel, { IPost } from '@/models/post';
import mongoose, { Document, Schema } from 'mongoose';

const handler = async (req: Request, res: Response) => {
    try {
        const { postId, userId, caption } = await req.json();
        console.log(postId, userId, caption);
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return new Response('Invalid ID', { status: 400 });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return new Response('Post not found', { status: 404 });
        }

        if (post.user != userId) {
            return new Response('User not authorized', { status: 401 });
        }
        post.caption = caption;
        const updatedPost = await post.save();

        return new Response(JSON.stringify(updatedPost), { status: 200 });

    }
    catch (err) {
        console.error(err);
        return new Response('Server error', { status: 500 });
    }
};

export { handler as PUT, handler as GET }
