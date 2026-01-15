import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

type Context = {
  params: Promise<{ slug: string }>;
};

export function withAuth(
  handler: (
    req: NextRequest,
    session: any,
    context?: Context
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: Context) => {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return handler(req, session, context);
  };
}