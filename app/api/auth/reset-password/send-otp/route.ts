import connectDB from "@/lib/db";

export async function POST(request: Request) {
    try {
        await connectDB();
    }
}