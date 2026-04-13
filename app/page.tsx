"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-base min-h-screen text-text-primary">
      <Nav />
      <Hero />
      <Vision />
      <FeatureComms />
      <FeatureLifeOps />
      <FeatureMemory />
      <Proactive />
      <HowItWorks />
      <InputModes />
      <UseCases />
      <Infrastructure />
      <WaitlistCTA />
      <MemberLogin />
      <Footer />
    </div>
  );
}

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-base/88 backdrop-blur-lg border-b border-border-subtle px-10 py-4 flex items-center justify-between">
      <Link href="/" className="text-[17px] font-[510] text-text-primary no-underline" style={{ letterSpacing: "-0.34px" }}>
        Cohere OS{" "}
        <span className="font-mono text-[11px] font-normal tracking-wider uppercase text-text-quaternary ml-2.5 align-middle">
          by GTR
        </span>
      </Link>
      <div className="flex items-center gap-7">
        <a href="#features" className="text-[14px] text-text-tertiary no-underline hover:text-text-primary transition-colors">Features</a>
        <a href="#how-it-works" className="text-[14px] text-text-tertiary no-underline hover:text-text-primary transition-colors">How it works</a>
        <a href="#use-cases" className="text-[14px] text-text-tertiary no-underline hover:text-text-primary transition-colors">Use cases</a>
        <a href="#waitlist" className="text-[14px] font-[510] text-white bg-accent px-4 py-[7px] rounded-full no-underline hover:bg-accent-hover transition-colors">
          Join waitlist
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-10 pt-[120px] pb-[100px] min-h-[85vh]">
      <div className="font-mono text-[11px] font-[510] tracking-[0.6px] uppercase text-text-quaternary mb-7">
        Your life, orchestrated
      </div>
      <h1
        className="text-text-primary font-[510] mb-6 max-w-[820px]"
        style={{ fontSize: "clamp(44px, 7vw, 72px)", lineHeight: 1.04, letterSpacing: "-2.2px" }}
      >
        An entire service company, dedicated to you.
      </h1>
      <p
        className="text-text-tertiary font-normal max-w-[520px] mb-12"
        style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.7 }}
      >
        Cohere OS manages your communications, finances, follow-ups, habits, and daily decisions — proactively delivering what you need at every stage of your day, without you having to ask.
      </p>
      <div className="flex gap-2.5 items-center flex-wrap justify-center">
        <a href="#waitlist" className="inline-flex items-center text-[15px] font-[510] text-white bg-accent no-underline px-6 py-3 rounded-md hover:bg-accent-hover transition-colors">
          Join the waitlist
        </a>
        <a href="#how-it-works" className="inline-flex items-center text-[15px] text-text-tertiary no-underline px-6 py-3 rounded-md border border-border bg-[rgba(255,255,255,0.02)] hover:text-text-primary hover:border-[rgba(255,255,255,0.12)] transition-all">
          See how it works
        </a>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 max-w-[840px] w-full mt-16 max-md:grid-cols-1">
        <FeatureOverviewCard
          icon={<span className="text-[18px]">&#9993;</span>}
          label="Comms"
          title="Unified inbox"
          desc="Email, calendar, messaging — triaged, drafted, and handled across every channel."
          position="first"
        />
        <FeatureOverviewCard
          icon={<span className="text-[18px]">&#9881;</span>}
          label="Life ops"
          title="Everything handled"
          desc="Taxes, finances, follow-ups, habits, appointments — managed and tracked for you."
          position="middle"
        />
        <FeatureOverviewCard
          icon={<span className="text-[18px]">&#9889;</span>}
          label="Agents"
          title="Runs without you"
          desc="Scheduled agents that research, prepare, and deliver — so you just show up ready."
          position="last"
        />
      </div>
    </section>
  );
}

function FeatureOverviewCard({ icon, label, title, desc, position }: { icon: React.ReactNode; label: string; title: string; desc: string; position: "first" | "middle" | "last" }) {
  const radius = position === "first" ? "rounded-l-lg max-md:rounded-t-lg max-md:rounded-bl-none" : position === "last" ? "rounded-r-lg max-md:rounded-b-lg max-md:rounded-tr-none" : "";
  return (
    <div className={`p-7 text-left bg-[rgba(255,255,255,0.02)] border border-border ${radius}`}>
      <div className="w-9 h-9 flex items-center justify-center bg-surface rounded-md mb-4">{icon}</div>
      <div className="font-mono text-[10px] font-[510] tracking-[0.6px] uppercase text-text-quaternary mb-2">{label}</div>
      <div className="text-[17px] font-[510] text-text-primary mb-1.5" style={{ letterSpacing: "-0.17px" }}>{title}</div>
      <div className="text-[14px] text-text-tertiary leading-[1.55]">{desc}</div>
    </div>
  );
}

/* ─── VISION ─── */
function Vision() {
  return (
    <section className="bg-panel text-center py-[100px] px-10">
      <div className="font-mono text-[11px] font-[510] tracking-[0.6px] uppercase text-text-quaternary mb-4">The idea</div>
      <div className="text-text-primary font-[510] max-w-[680px] mx-auto mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: 1.35, letterSpacing: "-0.8px" }}>
        Not an assistant you chat with. A system that understands you deeply and prepares your entire day — fully researched, orchestrated, and delivered.
      </div>
      <p className="text-[16px] text-text-tertiary max-w-[560px] mx-auto leading-[1.7]">
        You give occasional feedback — a voice note, a quick message, a phone call. That&apos;s it. Everything else runs. The experience isn&apos;t using a tool. It&apos;s having an entire team that knows you better than you know yourself.
      </p>
    </section>
  );
}

/* ─── FEATURE: COMMS ─── */
function FeatureComms() {
  return (
    <section id="features" className="py-[120px] px-10 pb-0">
      <div className="grid grid-cols-2 gap-20 items-center max-w-[1060px] mx-auto max-md:grid-cols-1">
        <div className="max-w-[440px]">
          <SectionLabel>Communications</SectionLabel>
          <SectionHeading>Every channel, one brain.</SectionHeading>
          <SectionSub>Connects to your email, calendar, and messaging. Reads, triages, drafts, and prepares — so you always know what matters and what&apos;s next.</SectionSub>
          <DetailList items={[
            "Gmail — read, search, triage, and draft",
            "Google Calendar — schedule, reschedule, conflicts",
            "Slack — monitor channels, summarize, surface key threads",
            "Everything orchestrated — nothing falls through",
          ]} />
        </div>
        <TerminalCard lines={[
          { prefix: ">", text: "inbox.scan()", highlight: true },
          { text: "  47 new messages, 3 urgent" },
          { text: "  drafted replies to 12 vendor emails" },
          { text: "  flagged 2 for your review" },
          { text: "" },
          { prefix: ">", text: "calendar.optimize()", highlight: true },
          { text: "  moved 1:1 to avoid double-book" },
          { text: "  blocked focus time 2-4pm" },
          { text: "" },
          { prefix: ">", text: "all clear. 4 min.", accent: true },
        ]} />
      </div>
    </section>
  );
}

/* ─── FEATURE: LIFE OPS ─── */
function FeatureLifeOps() {
  return (
    <section className="py-[120px] px-10 pb-0">
      <div className="grid grid-cols-2 gap-20 items-center max-w-[1060px] mx-auto max-md:grid-cols-1">
        <TerminalCard lines={[
          { prefix: ">", text: "life.status()", highlight: true },
          { text: "" },
          { text: "  Q2 estimated taxes: filed \u2713", highlight: true },
          { text: "  Unusual charge on Amex: flagged", accent: true },
          { text: "  Mom's birthday: card + flowers ordered", highlight: true },
          { text: "  Gym streak: 14 days", highlight: true },
          { text: "" },
          { text: "  Nothing needs your attention right now." },
        ]} />
        <div className="max-w-[440px] max-md:order-first">
          <SectionLabel>Life operations</SectionLabel>
          <SectionHeading>The things you worry about, handled.</SectionHeading>
          <SectionSub>Taxes, finances, bills, personal follow-ups, daily habits — the background overhead of modern life, managed systematically so nothing slips.</SectionSub>
          <DetailList items={[
            "Tax prep — documents gathered, deadlines tracked",
            "Finances — expenses categorized, anomalies flagged",
            "Personal follow-ups — birthdays, check-ins, promises kept",
            "Daily habits — tracked, nudged, reported",
          ]} />
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURE: MEMORY ─── */
function FeatureMemory() {
  return (
    <section className="py-[120px] px-10">
      <div className="grid grid-cols-2 gap-20 items-center max-w-[1060px] mx-auto max-md:grid-cols-1">
        <div className="max-w-[440px]">
          <SectionLabel>Memory</SectionLabel>
          <SectionHeading>Context that compounds.</SectionHeading>
          <SectionSub>Every conversation, decision, preference, and relationship stored in a persistent knowledge base. It doesn&apos;t just remember — it understands who you are.</SectionSub>
          <DetailList items={[
            "Hybrid RAG search across all stored knowledge",
            "Relationship mapping — who, when, what was said",
            "Preference learning — how you like things done",
            "Decision history with full reasoning trails",
          ]} />
        </div>
        <TerminalCard lines={[
          { prefix: ">", text: 'memory.search("Acme Corp")', highlight: true },
          { text: "" },
          { text: "  Last contact: Mar 28 — pricing follow-up", highlight: true },
          { text: "  Key person: Sarah Chen, VP Ops", highlight: true },
          { text: "  Open thread: contract renewal Q2" },
          { text: "  Sentiment: positive, awaiting proposal", accent: true },
          { text: "" },
          { text: "  14 related memories across 6 months" },
        ]} />
      </div>
    </section>
  );
}

/* ─── PROACTIVE DELIVERY ─── */
function Proactive() {
  return (
    <section className="bg-panel py-[120px] px-10">
      <div className="max-w-[1060px] mx-auto">
        <SectionLabel>Proactive delivery</SectionLabel>
        <SectionHeading>Your day, handed to you ready.</SectionHeading>
        <SectionSub>You don&apos;t ask for updates. They arrive — fully researched, prepared, and timed to when you actually need them.</SectionSub>
        <div className="grid grid-cols-3 gap-4 mt-12 max-md:grid-cols-1">
          {[
            { time: "6:00 AM", title: "Morning briefing", desc: "Your day's schedule, priority emails, weather, and anything that needs your attention before you leave the house." },
            { time: "9:00 AM", title: "Meeting prep delivered", desc: "Background on attendees, last conversation context, open items, and suggested talking points — ready before you walk in." },
            { time: "12:00 PM", title: "Midday digest", desc: "Follow-ups sent, responses received, anything escalated. Three sentences on where your day stands." },
            { time: "3:00 PM", title: "Afternoon actions", desc: "Promises you made today tracked. Appointments confirmed for tomorrow. Bills paid. Habits logged." },
            { time: "6:00 PM", title: "End of day wrap", desc: "Everything that happened, what got done, what moved. Tomorrow's preview so you can fully shut off." },
            { time: "Ongoing", title: "Always running", desc: "Between check-ins, agents are researching, preparing, scheduling, and handling — quietly, in the background." },
          ].map((card) => (
            <div key={card.time} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-7">
              <div className="font-mono text-[12px] font-[510] text-accent-bright mb-3">{card.time}</div>
              <div className="text-[16px] font-[510] text-text-primary mb-1.5" style={{ letterSpacing: "-0.16px" }}>{card.title}</div>
              <div className="text-[14px] text-text-tertiary leading-[1.6]">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-[120px] px-10">
      <div className="text-center">
        <SectionLabel center>How it works</SectionLabel>
        <SectionHeading center>
          Not another chatbot.<br />An operating system for your life.
        </SectionHeading>
        <SectionSub center>
          Persistent memory, multi-channel integration, scheduled agents, and a knowledge base that compounds. This is what happens when you give AI actual responsibilities.
        </SectionSub>
      </div>

      <div className="grid grid-cols-3 gap-10 max-w-[920px] mx-auto mt-[72px] max-md:grid-cols-1 max-md:gap-6">
        {[
          { num: "01", title: "Connect your tools", desc: "Link email, calendar, messaging, finance tools. Native API integrations — no screen scraping, no brittle workarounds." },
          { num: "02", title: "Teach it who you are", desc: "Your preferences, relationships, routines, and priorities. The more it knows, the less you need to manage." },
          { num: "03", title: "Live your life", desc: "Agents run in the background. You get occasional check-ins. Give feedback by voice, message, or call. That's the whole interface." },
        ].map((step) => (
          <div key={step.num}>
            <div className="font-mono text-[12px] text-accent-bright tracking-wider mb-4">{step.num}</div>
            <div className="text-[18px] font-[510] text-text-primary mb-2" style={{ letterSpacing: "-0.18px" }}>{step.title}</div>
            <div className="text-[14px] text-text-tertiary leading-[1.65]">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── INPUT MODES ─── */
function InputModes() {
  return (
    <section className="text-center py-[120px] px-10">
      <SectionLabel center>Your interface</SectionLabel>
      <SectionHeading center>Talk to it like a person, not a product.</SectionHeading>
      <SectionSub center>No dashboards to check. No apps to open. Give feedback the way you&apos;d tell a chief of staff — naturally.</SectionSub>

      <div className="grid grid-cols-3 max-w-[660px] mx-auto mt-12 max-md:grid-cols-1">
        {[
          { icon: "\uD83C\uDF99", title: "Voice note", desc: "Record a 30-second thought. It handles the rest.", position: "first" as const },
          { icon: "\uD83D\uDCAC", title: "Message", desc: "Text a quick update or correction. Done.", position: "middle" as const },
          { icon: "\uD83D\uDCDE", title: "Phone call", desc: "Call in for a verbal download. It takes notes and acts.", position: "last" as const },
        ].map((mode) => (
          <div key={mode.title} className={`p-8 bg-[rgba(255,255,255,0.02)] border border-border ${
            mode.position === "first" ? "rounded-l-lg max-md:rounded-t-lg max-md:rounded-bl-none" :
            mode.position === "last" ? "rounded-r-lg max-md:rounded-b-lg max-md:rounded-tr-none" : ""
          }`}>
            <div className="text-[28px] mb-3">{mode.icon}</div>
            <div className="text-[15px] font-[510] text-text-primary mb-1">{mode.title}</div>
            <div className="text-[13px] text-text-quaternary">{mode.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── USE CASES ─── */
function UseCases() {
  return (
    <section id="use-cases" className="bg-panel py-[120px] px-10">
      <div className="text-center">
        <SectionLabel center>Who it&apos;s for</SectionLabel>
        <SectionHeading center>For people with more going on than hours in the day.</SectionHeading>
        <SectionSub center>Founders, executives, parents, operators — anyone who needs an entire support system, not another app.</SectionSub>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-[960px] mx-auto mt-12 max-md:grid-cols-1">
        {[
          { label: "Founders", title: "Run a company and a life", desc: "Vendor comms, investor follow-ups, personal finances, family logistics — all handled by one system that knows the full picture." },
          { label: "Executives", title: "A team that never drops the ball", desc: "Inbox managed, meetings prepped, commitments tracked, taxes filed, habits maintained. Show up prepared, every time." },
          { label: "Busy parents", title: "Nothing falls through the cracks", desc: "School events, doctor appointments, bill payments, meal planning, birthday gifts — all the invisible work, visible and handled." },
          { label: "Operators", title: "Scale without hiring", desc: "Multi-client ops, status reports, scheduling, follow-ups — the operational capacity of a team at the cost of a subscription." },
          { label: "Creatives", title: "Focus on the work", desc: "Let Cohere OS handle invoicing, scheduling, client comms, and life admin so you can spend your energy on what you actually make." },
          { label: "Anyone", title: "Your life, finally organized", desc: "If you've ever wished you had a personal chief of staff who just knew what needed to happen next — this is that." },
        ].map((uc) => (
          <div key={uc.label} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-7">
            <div className="font-mono text-[10px] font-[510] tracking-[0.6px] uppercase text-accent-bright mb-2.5">{uc.label}</div>
            <div className="text-[17px] font-[510] text-text-primary mb-1.5" style={{ letterSpacing: "-0.17px" }}>{uc.title}</div>
            <div className="text-[14px] text-text-tertiary leading-[1.6]">{uc.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── INFRASTRUCTURE ─── */
function Infrastructure() {
  return (
    <section className="bg-surface py-[120px] px-10">
      <div className="text-center">
        <SectionLabel center>Infrastructure</SectionLabel>
        <SectionHeading center>Real systems. Real results.</SectionHeading>
        <SectionSub center>Not a wrapper. A full-stack AI operations platform with persistent state, autonomous execution, and multi-channel integration.</SectionSub>
      </div>

      <div className="grid grid-cols-4 max-w-[840px] mx-auto mt-12 max-md:grid-cols-2">
        {[
          { num: "24/7", desc: "Autonomous operation", pos: 0 },
          { num: "6+", desc: "Integrated channels", pos: 1 },
          { num: "<5m", desc: "Response latency", pos: 2 },
          { num: "\u221E", desc: "Persistent memory", pos: 3 },
        ].map((item) => (
          <div key={item.desc} className={`p-7 text-center bg-[rgba(255,255,255,0.02)] border border-border ${
            item.pos === 0 ? "rounded-l-lg max-md:rounded-tl-lg max-md:rounded-bl-none" :
            item.pos === 3 ? "rounded-r-lg max-md:rounded-br-lg max-md:rounded-tr-none" : ""
          }`}>
            <div className="font-mono text-[26px] font-[510] text-text-primary mb-1">{item.num}</div>
            <div className="text-[13px] text-text-quaternary">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── WAITLIST CTA ─── */
function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Store in localStorage for now — Supabase wiring later
    const existing = JSON.parse(localStorage.getItem("cohere-waitlist") || "[]");
    existing.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem("cohere-waitlist", JSON.stringify(existing));
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="text-center py-[120px] px-10">
      <SectionLabel center>Early access</SectionLabel>
      <SectionHeading center>Get on the list.</SectionHeading>
      <SectionSub center>Cohere OS is in private development. Join the waitlist for early access.</SectionSub>

      {submitted ? (
        <div className="mt-10">
          <div className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 text-emerald px-5 py-3 rounded-lg text-[14px] font-[510]">
            <span>&#10003;</span> You&apos;re on the list. We&apos;ll reach out when it&apos;s your turn.
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-[400px] mx-auto mt-10 max-md:flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 text-[14px] px-4 py-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-border text-text-primary placeholder:text-text-quaternary focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
            <button
              type="submit"
              className="text-[14px] font-[510] text-white bg-accent px-5 py-3 rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap"
            >
              Join waitlist
            </button>
          </form>
          <p className="text-[13px] text-text-quaternary mt-3.5">No spam. We&apos;ll reach out when it&apos;s your turn.</p>
        </>
      )}
    </section>
  );
}

/* ─── MEMBER LOGIN ─── */
function MemberLogin() {
  return (
    <section className="py-12 px-10 border-t border-border-subtle">
      <div className="max-w-[600px] mx-auto text-center">
        <p className="text-[14px] text-text-quaternary mb-4">
          Already on the inside? Lucky you.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[13px] font-[510] text-accent-bright hover:text-accent-hover transition-colors no-underline px-5 py-2.5 rounded-md border border-border hover:border-accent-bright/30"
        >
          Sign in to your dashboard
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="px-10 py-6 border-t border-border-subtle flex items-center justify-between bg-panel max-md:flex-col max-md:gap-3 max-md:text-center">
      <div className="text-[13px] text-text-quaternary">
        &copy; 2026 <a href="https://gtrocha.com" className="text-text-quaternary no-underline hover:text-text-secondary transition-colors">GTR Services</a>
      </div>
      <div className="flex gap-6 items-center">
        <a href="mailto:colt@gtrocha.com" className="text-[13px] text-text-quaternary no-underline hover:text-text-secondary transition-colors">Contact</a>
        <span className="font-mono text-[11px] tracking-wider uppercase text-text-quaternary">cohere-os.com</span>
      </div>
    </footer>
  );
}

/* ─── SHARED COMPONENTS ─── */
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`font-mono text-[11px] font-[510] tracking-[0.6px] uppercase text-text-quaternary mb-4 ${center ? "text-center" : ""}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`text-text-primary font-[510] mb-4 ${center ? "text-center mx-auto" : ""} max-w-[600px]`}
      style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.12, letterSpacing: "-1.2px" }}
    >
      {children}
    </div>
  );
}

function SectionSub({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`text-[17px] text-text-tertiary max-w-[500px] leading-[1.65] ${center ? "text-center mx-auto" : ""}`}>
      {children}
    </p>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="list-none mt-6 space-y-0">
      {items.map((item) => (
        <li key={item} className="text-[15px] text-text-tertiary py-2 border-b border-border-subtle flex gap-2.5 items-baseline last:border-b-0">
          <span className="text-accent-bright text-[13px] flex-shrink-0">&#10003;</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function TerminalCard({ lines }: { lines: Array<{ prefix?: string; text: string; highlight?: boolean; accent?: boolean }> }) {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-xl p-9 min-h-[320px] flex flex-col justify-center">
      {lines.map((line, i) => (
        <div key={i} className="font-mono text-[13px] leading-[2]">
          {line.prefix && <span className="text-text-quaternary">{line.prefix} </span>}
          <span className={line.accent ? "text-accent-bright" : line.highlight ? "text-text-primary" : "text-text-quaternary"}>
            {line.text}
          </span>
        </div>
      ))}
    </div>
  );
}
