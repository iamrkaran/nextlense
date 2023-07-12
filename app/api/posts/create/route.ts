import connectDB from "@/config/dbConnect";
import PostModel, { IPost } from "@/models/post";

const handler = async (req: Request, res: Response) => {
    const { caption, user, image } = await req.json();
    const newPost: IPost = new PostModel({
        caption,
        user,
        image,
    });
    await connectDB();

    const savedPost = await newPost.save();
    return new Response("OK");
};

export { handler as POST, handler as GET };
