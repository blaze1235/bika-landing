"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Package,
  BarChart3,
  FileText,
  ArrowRight,
  Check,
  Zap,
  Menu,
  X,
  Bell,
  TrendingUp,
} from "lucide-react";

/* ─── Types ─── */
interface StatItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

/* ─── Data ─── */
const MARQUEE_ITEMS = [
  "Shopify",
  "WooCommerce",
  "Square",
  "Etsy",
  "Amazon",
  "QuickBooks",
  "Stripe",
  "Xero",
  "FedEx",
  "UPS",
  "WhatsApp Business",
  "Salesforce",
];

const FEATURES = [
  {
    icon: Package,
    tag: "Central command",
    title: "Order Hub",
    description:
      "Every order from every channel — website, phone, wholesale, marketplace — flowing into one live feed. No dropped orders. No missed messages. Ever.",
  },
  {
    icon: BarChart3,
    tag: "Real-time sync",
    title: "Live Inventory",
    description:
      "Always know exactly what you have. Stock auto-deducts on sale, alerts fire before you're caught empty, and you stop selling what you don't actually have.",
  },
  {
    icon: FileText,
    tag: "Get paid faster",
    title: "Instant Invoicing",
    description:
      "Create and send professional invoices in seconds. Get notified the moment they're paid. Stop writing follow-up emails to get your own money back.",
  },
];

const STATS: StatItem[] = [
  { value: 10, suffix: "K+", label: "orders tracked daily" },
  { value: 2, prefix: "$", suffix: "M+", label: "revenue managed" },
  { value: 500, suffix: "+", label: "businesses onboarded" },
  { value: 99.9, suffix: "%", label: "uptime guaranteed" },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "For businesses just getting off the ground",
    features: [
      "Up to 100 orders / month",
      "1 user seat",
      "Basic dashboard",
      "Email support",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$29",
    period: "/month",
    desc: "For growing businesses with real volume",
    features: [
      "Unlimited orders",
      "Up to 5 users",
      "All integrations",
      "Live inventory tracking",
      "Custom invoices",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "$79",
    period: "/month",
    desc: "For teams who need everything, now",
    features: [
      "Unlimited everything",
      "Unlimited users",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Analytics exports",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

/* ─── Counter ─── */
function Counter({ value, prefix = "", suffix = "" }: StatItem) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v * 10) / 10),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  const orders = [
    { id: "#4821", status: "new",        color: "#22C55E", co: "Riverside Bakery",  amount: "$240", items: 2 },
    { id: "#4820", status: "processing", color: "#F97316", co: "Corner Deli",        amount: "$89",  items: 1 },
    { id: "#4819", status: "shipped",    color: "#3B82F6", co: "Metro Foods Co.",    amount: "$412", items: 5 },
    { id: "#4818", status: "delivered",  color: "#8B5CF6", co: "The Good Cup",       amount: "$67",  items: 1 },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-16 bg-orange-500/8 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#111113] border border-[#222226] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Top bar */}
        <div className="px-5 py-4 border-b border-[#1E1E22] flex items-center justify-between bg-[#0D0D0F]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="font-display text-sm font-bold text-white">bika</span>
          </div>
          <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block pulse-dot" />
            Live
          </span>
        </div>

        {/* Revenue bar */}
        <div className="px-5 py-4 border-b border-[#1E1E22]">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Today&apos;s revenue</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-sm font-semibold text-white">$18,240</span>
            </div>
          </div>
          <div className="h-1 bg-[#1E1E22] rounded-full">
            <motion.div
              className="h-1 bg-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "74%" }}
              transition={{ delay: 1.0, duration: 1.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-zinc-600">74% of daily goal</span>
            <span className="text-[10px] text-orange-500">↑ 12% vs yesterday</span>
          </div>
        </div>

        {/* Alert strip */}
        <div className="px-5 py-2.5 border-b border-[#1E1E22] bg-orange-500/5 flex items-center gap-2">
          <Bell className="w-3 h-3 text-orange-500" />
          <span className="text-[11px] text-orange-400">3 new orders in the last 10 min</span>
        </div>

        {/* Orders */}
        <div className="divide-y divide-[#181819]">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.015] transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: order.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-mono text-zinc-500">{order.id}</span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: `${order.color}18`, color: order.color }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-[#FAFAF9] truncate">{order.co}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-white">{order.amount}</div>
                <div className="text-[10px] text-zinc-600">{order.items} item{order.items > 1 ? "s" : ""}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#0D0D0F] flex justify-between items-center">
          <span className="text-[10px] text-zinc-600">47 orders today</span>
          <button className="text-[10px] text-orange-500 flex items-center gap-1 hover:text-orange-400 transition-colors">
            View all <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Page ─── */
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const featuresRef = useRef(null);
  const statsRef    = useRef(null);
  const howRef      = useRef(null);
  const testimRef   = useRef(null);

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.15 });
  const statsInView    = useInView(statsRef,    { once: true, amount: 0.3  });
  const howInView      = useInView(howRef,      { once: true, amount: 0.2  });
  const testimInView   = useInView(testimRef,   { once: true, amount: 0.3  });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1A1E]/80 bg-[#09090B]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-white tracking-tight">bika</span>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">
              Log in
            </a>
            <a
              href="#"
              className="text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              Get started →
            </a>
          </div>

          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-[#1A1A1E] bg-[#09090B] px-6 py-5 flex flex-col gap-4"
          >
            {["Features", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-zinc-400"
              >
                {item}
              </a>
            ))}
            <a href="#" className="text-sm font-semibold bg-orange-500 text-white px-4 py-2.5 rounded-lg text-center">
              Get started →
            </a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="grid-bg pt-36 pb-24 lg:pt-44 lg:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-10">
            {/* Left */}
            <div className="flex-1 max-w-[580px]">
              <motion.div
                {...fade(0)}
                className="inline-flex items-center gap-2 border border-orange-500/25 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-7"
              >
                <Zap className="w-3 h-3" />
                Order management, reimagined
              </motion.div>

              <motion.h1
                {...fade(0.08)}
                className="font-display text-[clamp(48px,7vw,80px)] font-extrabold leading-[1.04] tracking-[-0.03em] mb-6"
              >
                Less admin.
                <br />
                More{" "}
                <span className="text-orange-500">orders.</span>
              </motion.h1>

              <motion.p {...fade(0.16)} className="text-zinc-400 text-lg leading-relaxed mb-9 max-w-md">
                Stop juggling spreadsheets, WhatsApp threads, and sticky notes.
                bika gives you one dashboard for every order, every item, every
                invoice — so you can run your business instead of chasing it.
              </motion.p>

              <motion.div {...fade(0.24)} className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  Start free — no card needed
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 border border-[#272729] hover:border-zinc-600 text-zinc-300 hover:text-white px-6 py-3.5 rounded-xl transition-colors text-sm"
                >
                  See how it works
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-zinc-700 mt-5"
              >
                Used by 500+ businesses · No credit card required
              </motion.p>
            </div>

            {/* Right: dashboard */}
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#1A1A1E] bg-[#0C0C0E] py-4 overflow-hidden">
        <div className="marquee-track gap-14 px-7">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-semibold text-zinc-700 uppercase tracking-[0.15em] whitespace-nowrap flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" ref={featuresRef} className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={featuresInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-orange-500 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            >
              What bika does
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl lg:text-[52px] font-extrabold tracking-[-0.025em] leading-[1.1]"
            >
              Everything your operation needs.
              <br />
              <span className="text-zinc-700">Nothing it doesn&apos;t.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * i + 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[#111113] border border-[#1E1E22] rounded-2xl p-7 hover:border-orange-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-[10px] text-orange-500/60 font-bold uppercase tracking-widest mb-2">
                  {feature.tag}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 px-6 bg-[#0C0C0E] border-y border-[#1A1A1E]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center"
              >
                <div className="font-display text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight">
                  <Counter {...stat} />
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="about" ref={howRef} className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.18em] mb-4">
              How it works
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-[-0.025em]">
              Up and running in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-[1px] bg-gradient-to-r from-[#2A2A2E] via-orange-500/20 to-[#2A2A2E]" />

            {[
              {
                step: "01",
                title: "Connect your channels",
                desc: "Link your website, phone orders, wholesale accounts, or marketplace in minutes — bika pulls everything in automatically.",
              },
              {
                step: "02",
                title: "Manage from one place",
                desc: "See every order, check live inventory, and handle invoicing from a single dashboard. Your whole operation at a glance.",
              },
              {
                step: "03",
                title: "Ship it. Get paid.",
                desc: "Fulfil orders faster, send invoices in one click, and track payments without follow-up spreadsheets or chasing emails.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display text-5xl font-extrabold text-[#1C1C1F] mb-5">{step.step}</div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section ref={testimRef} className="py-24 px-6 bg-[#0C0C0E] border-y border-[#1A1A1E]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="font-display text-[80px] lg:text-[120px] font-extrabold text-[#1A1A1E] leading-none select-none mb-2">
              &ldquo;
            </div>
            <blockquote className="font-display text-2xl lg:text-3xl font-semibold text-white leading-[1.4] mb-10">
              We went from three spreadsheets and constant panic to actually
              knowing what&apos;s happening in our business. bika paid for
              itself in the first week.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-orange-500 font-display font-bold text-lg">
                S
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Sarah K.</div>
                <div className="text-xs text-zinc-600">Owner, Riverside Wholesale Bakery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.18em] mb-4">Pricing</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-[-0.025em]">
              Simple pricing.
              <br />
              <span className="text-zinc-700">No surprises.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.highlighted
                    ? "bg-orange-500 border-0"
                    : "bg-[#111113] border border-[#1E1E22]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    Most popular
                  </div>
                )}

                <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${plan.highlighted ? "text-orange-100" : "text-zinc-500"}`}>
                  {plan.name}
                </div>

                <div className="mb-1 flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className={`text-sm pb-1 ${plan.highlighted ? "text-orange-100" : "text-zinc-500"}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-sm mb-7 ${plan.highlighted ? "text-orange-100" : "text-zinc-500"}`}>
                  {plan.desc}
                </p>

                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-orange-100" : "text-orange-500"}`} />
                      <span className={plan.highlighted ? "text-orange-50" : "text-zinc-400"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`w-full text-center text-sm font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    plan.highlighted
                      ? "bg-white text-orange-500 hover:bg-orange-50"
                      : "bg-[#1C1C1F] hover:bg-[#242428] text-white border border-[#2A2A2E]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-700 mt-8">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 bg-[#0C0C0E] border-t border-[#1A1A1E] relative overflow-hidden">
        <div
          aria-hidden
          className="font-display absolute inset-0 flex items-center justify-center text-[22vw] font-extrabold text-white/[0.018] select-none pointer-events-none tracking-tighter"
        >
          bika
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-5xl lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6">
            Stop drowning.
            <br />
            <span className="text-orange-500">Start shipping.</span>
          </h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto">
            Join 500+ businesses that switched to bika and never looked back.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Get started free
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-zinc-700 mt-4">
            No credit card required · Up in 5 minutes · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1A1A1E] px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-[220px]">
            <div className="font-display text-xl font-bold text-white mb-3 tracking-tight">bika</div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Order management for real businesses. Less admin, more orders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              { title: "Product",  links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company",  links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal",    links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-[#1A1A1E] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-zinc-800">© 2024 bika. All rights reserved.</p>
          <p className="text-xs text-zinc-800">Made for real businesses, by people who get it.</p>
        </div>
      </footer>
    </div>
  );
}
