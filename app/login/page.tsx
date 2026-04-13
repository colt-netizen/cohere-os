"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "invalid_token") setError("This link has expired or already been used. Request a new one.");
    if (err === "missing_token") setError("Invalid sign-in link. Request a new one.");
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-sm font-[590] text-white leading-none">C</span>
          </div>
          <div>
            <h1 className="text-[15px] font-[510] text-text-primary tracking-tight">Cohere OS</h1>
            <p className="text-[11px] text-text-quaternary">by GTR Services</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-xl p-8">
          {sent ? (
            /* Email sent state */
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7170ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h2 className="text-[24px] font-[510] text-text-primary mb-2" style={{ letterSpacing: "-0.288px" }}>
                Check your email
              </h2>
              <p className="text-[14px] text-text-tertiary mb-1" style={{ letterSpacing: "-0.182px" }}>
                We sent a sign-in link to
              </p>
              <p className="text-[14px] font-[510] text-text-primary font-mono mb-6">{email}</p>
              <p className="text-[13px] text-text-quaternary leading-relaxed">
                Click the link in the email to access your dashboard. The link expires in 10 minutes.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="mt-6 text-[13px] font-[510] text-accent-bright hover:text-accent-hover transition-colors"
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* Email input state */
            <div>
              <h2 className="text-[24px] font-[510] text-text-primary mb-2" style={{ letterSpacing: "-0.288px" }}>
                Sign in
              </h2>
              <p className="text-[14px] text-text-tertiary mb-8" style={{ letterSpacing: "-0.182px" }}>
                Enter your email and we&apos;ll send you a sign-in link.
              </p>

              <form onSubmit={handleSubmit}>
                <label className="block text-[12px] font-[510] text-text-quaternary mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full bg-[rgba(255,255,255,0.02)] border border-border rounded-md px-4 py-2.5 text-[14px] text-text-primary placeholder:text-text-quaternary focus:outline-none focus:border-accent-bright/40 transition-colors mb-4"
                />

                {error && (
                  <div className="text-[13px] text-red mb-4 bg-red/10 border border-red/20 rounded-md px-3 py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full px-5 py-2.5 bg-accent text-white text-[13px] font-[510] rounded-md hover:bg-accent-hover disabled:opacity-40 transition-all duration-150"
                >
                  {loading ? "Sending..." : "Send magic link"}
                </button>
              </form>

              <p className="text-[12px] text-text-quaternary mt-6 text-center">
                Access is limited to authorized accounts.
              </p>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <a href="/" className="text-[13px] text-text-quaternary hover:text-text-secondary transition-colors">
            ← Back to cohere-os.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base flex items-center justify-center">
        <span className="text-text-quaternary text-[13px]">Loading...</span>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
