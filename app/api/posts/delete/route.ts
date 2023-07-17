import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import { NextRequest, NextResponse } from "next/server";


const parseAuthTokenFromCookie = (cookieHeader: string | null) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");
  const authTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("authToken=")
  );

  if (!authTokenCookie) {
    return null;
  }

  const authToken = authTokenCookie.split("=")[1];
  return authToken;
};

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");
    const userId = url.searchParams.get("userId");

    const cookieHeader = req.headers.get("cookie"); // Get the value of the 'cookie' header

    const authToken = parseAuthTokenFromCookie(cookieHeader);

    if (!authToken) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectDB();

    const post = await PostModel.findById(postId);

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    const parserdPost = JSON.parse(JSON.stringify(post));

    if (parserdPost.user !== userId) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized to delete this post" }),
        {
          status: 401,
        }
      );
    }

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ message: "Post deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};

export { handler as DELETE };
