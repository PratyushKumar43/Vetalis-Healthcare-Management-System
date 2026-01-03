/**
 * Login Page
 * 
 * Redirects to Neon Auth sign-in page
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Neon Auth sign-in
    router.push("/auth/sign-in");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg border border-teal-600/20 flex items-center justify-center text-teal-600 bg-teal-50/50 shadow-sm">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-slate-900">
            VITALIS <span className="text-teal-600 text-sm align-top font-bold">HMS</span>
          </span>
        </div>
        <p className="text-slate-600 mb-4">Redirecting to sign in...</p>
        <Link
          href="/auth/sign-in"
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Click here if you're not redirected
        </Link>
      </div>
    </div>
  );
}
