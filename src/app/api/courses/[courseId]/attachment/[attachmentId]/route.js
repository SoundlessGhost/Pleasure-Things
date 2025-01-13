import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const { attachmentId } = params;
    if (!attachmentId) {
      return NextResponse.json(
        { message: "Bad Request: Attachment ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteAttachment = await prisma.attachment.delete({
      where: { id: attachmentId },
    });
    
    if (!deleteAttachment) {
      return NextResponse.json(
        { message: "Not Found: Attachment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteAttachment, { status: 200 });
  } catch (error) {
    console.error("Error deleting attachment:", error);
    return NextResponse.json(
      { message: "Internal Server Error: Failed to delete attachment" },
      { status: 500 }
    );
  }
}
