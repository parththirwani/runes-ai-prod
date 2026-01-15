import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/documents");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tailwind is Working! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            If you can see this styled, Tailwind CSS is set up correctly
          </p>
        </div>
      </div>
    </div>
  );
}