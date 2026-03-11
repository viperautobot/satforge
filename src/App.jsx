import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════
   COLOR THEMES
══════════════════════════════════════════════════════ */
const DARK = {
  bg:           "#07090F",
  bgCard:       "#0C0F1A",
  bgElevated:   "#111827",
  bgHover:      "#141B2D",
  border:       "#1C2540",
  borderHi:     "#2A3860",
  accent:       "#3B82F6",
  accentDim:    "#1E3A6E",
  accentMuted:  "#0F1E3D",
  text:         "#DCE4F5",
  textMuted:    "#5A6A8A",
  textDim:      "#3A4A6A",
  steel:        "#8899BB",
  success:      "#34D399",
  successBg:    "#052A1A",
  error:        "#F87171",
  errorBg:      "#2A0808",
  warning:      "#FBBF24",
  warningBg:    "#2A1A04",
  white:        "#F0F4FF",
};

const LIGHT = {
  bg:           "#F9FAFB",
  bgCard:       "#FFFFFF",
  bgElevated:   "#F3F4F6",
  bgHover:      "#E5E7EB",
  border:       "#E5E7EB",
  borderHi:     "#D1D5DB",
  accent:       "#3B82F6",
  accentDim:    "#EFF6FF",
  accentMuted:  "#DBEAFE",
  text:         "#1F2937",
  textMuted:    "#6B7280",
  textDim:      "#9CA3AF",
  steel:        "#4B5563",
  success:      "#10B981",
  successBg:    "#F0FDF4",
  error:        "#EF4444",
  errorBg:      "#FEF2F2",
  warning:      "#F59E0B",
  warningBg:    "#FFFBEB",
  white:        "#FFFFFF",
};

/* ══════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════ */
const Ic = ({ d, size = 18, color = "#5A6A8A", sw = 1.5, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={color} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

const P = {
  home:     "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  practice: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  test:     "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  analytics:"M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  planner:  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  tutor:    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  check:    "M5 13l4 4L19 7",
  x:        "M6 18L18 6M6 6l12 12",
  send:     "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  eye:      "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  eyeOff:   "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
  logo:     "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  chevron:  "M9 5l7 7-7 7",
  logout:   "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  user:     "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  clock:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  bar:      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  star:     "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  sun:      "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon:     "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
};

/* ══════════════════════════════════════════════════════
   QUESTIONS DATA
══════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    id: 1, topic: "Heart of Algebra", subtopic: "Linear Equations", points: 15,
    question: "If 3x + 7 = 22, what is the value of 6x − 4?",
    choices: ["10", "26", "28", "30"],
    correct: 1,
    explanation: "Solve 3x + 7 = 22 to obtain x = 5. Then 6x − 4 = 6(5) − 4 = 26. Notice that 6x − 4 = 2(3x) − 4 = 2(15) − 4 = 26, so isolating x is not strictly necessary.",
    trap: "Most students find x = 5 and then choose an answer based only on that value, forgetting to evaluate the full target expression.",
  },
  {
    id: 2, topic: "Reading & Writing", subtopic: "Command of Evidence", points: 20,
    question: "Researchers found that plants exposed to classical music showed a 23% increase in growth rate. Which conclusion is most directly supported by this finding?",
    choices: [
      "All plants require auditory stimulation to achieve optimal growth.",
      "Auditory stimulation may influence plant physiological processes.",
      "Classical music is agronomically superior to other genres.",
      "Plants possess auditory systems analogous to those in mammals.",
    ],
    correct: 1,
    explanation: "The study shows a correlation between one auditory condition and one measured outcome. Choice B matches that scope — 'may influence' and 'physiological processes' accurately reflect what the data supports without overreaching.",
    trap: "Options A, C, and D each introduce claims the study cannot establish: universality, genre comparisons, or anatomical mechanisms. The SAT rewards conclusions that stay within the boundaries of the evidence.",
  },
  {
    id: 3, topic: "Advanced Math", subtopic: "Quadratic Functions", points: 25,
    question: "The function f(x) = x² − 8x + 15 has two real zeros. What is their sum?",
    choices: ["−8", "8", "15", "−15"],
    correct: 1,
    explanation: "By Vieta's formulas, the sum of zeros of x² + bx + c equals −b. Since b = −8, the sum is 8. Verification: factoring gives (x − 3)(x − 5), with zeros 3 and 5, which sum to 8.",
    trap: "Confusing the sum (8) with the product (15) is the most common error. Vieta's formula gives −b, not b — the sign matters.",
  },
];

/* ══════════════════════════════════════════════════════
   AI TUTOR API
══════════════════════════════════════════════════════ */
async function callTutor(messages, system) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: system || `You are an expert SAT tutor inside SAT-down, a professional SAT prep platform.
Your role is to help students understand concepts deeply, break down difficult problems, and build robust test strategy.
Write in clear, precise prose. No emojis. No bullet points unless a step-by-step list is genuinely the best format.
Keep responses focused — 3 to 6 sentences for straightforward questions, more only when a full worked example is needed.
Be direct and confident. End with an insight about the student's approach when appropriate.`,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text ?? "Unable to generate a response. Please try again.";
}

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */
function useViewport() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { width, isMobile: width < 768, isDesktop: width >= 768 };
}

/* ══════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════ */
function Card({ children, style, highlight, C }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${highlight ? C.borderHi : C.border}`,
      borderRadius: 10,
      padding: "20px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Badge({ children, color, C }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
      padding: "3px 9px", borderRadius: 5,
      background: color + "18", border: `1px solid ${color}35`,
      color, textTransform: "uppercase", fontFamily: "inherit",
    }}>{children}</span>
  );
}

function ProgressBar({ value, color, height = 5, C }) {
  return (
    <div style={{ background: C.border, borderRadius: 100, height, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${Math.min(100, Math.max(0, value))}%`,
        background: color, borderRadius: 100,
        transition: "width 0.9s cubic-bezier(0.34,1.1,0.64,1)",
      }} />
    </div>
  );
}

function EmptyState({ icon, title, body, action, onAction, C }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: C.bgElevated, border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
      }}>
        <Ic d={icon} size={22} color={C.textMuted} />
      </div>
      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, maxWidth: 280, margin: "0 auto 20px" }}>{body}</div>
      {action && (
        <button onClick={onAction} style={{
          padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 13,
          background: C.accent, color: "#fff", border: "none", cursor: "pointer",
          fontFamily: "inherit",
        }}>{action}</button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   AUTH SCREEN
══════════════════════════════════════════════════════ */
function AuthScreen({ onAuth, C }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isMobile } = useViewport();

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem("sf_users") || "{}"); } catch { return {}; }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const em = email.trim().toLowerCase();
    const pw = password;
    if (!em) { setError("Please enter your email address."); return; }
    if (!pw) { setError("Please enter a password."); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);

    const users = getUsers();

    if (mode === "signup") {
      if (!name.trim()) { setError("Please enter your name."); return; }
      if (pw.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (users[em]) { setError("An account with that email already exists. Try signing in."); return; }
      const newUser = { name: name.trim(), email: em, password: pw, createdAt: Date.now() };
      users[em] = newUser;
      localStorage.setItem("sf_users", JSON.stringify(users));
      const session = { name: newUser.name, email: em };
      localStorage.setItem("sf_session", JSON.stringify(session));
      onAuth(session);
    } else {
      const found = users[em];
      if (!found) { setError("No account found with that email. Try creating one."); return; }
      if (found.password !== pw) { setError("Incorrect password. Please try again."); return; }
      const session = { name: found.name, email: em };
      localStorage.setItem("sf_session", JSON.stringify(session));
      onAuth(session);
    }
  };

  const tryDemo = () => {
    const session = { name: "Demo User", email: "demo@satdown.com" };
    localStorage.setItem("sf_session", JSON.stringify(session));
    onAuth(session);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 8, fontSize: 14,
    background: C.bgElevated, border: `1px solid ${C.border}`,
    color: C.text, outline: "none", fontFamily: "inherit",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Sans', sans-serif",
      padding: isMobile ? "24px 20px" : "40px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(${C.border}44 1px, transparent 1px),
          linear-gradient(90deg, ${C.border}44 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: 440,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: C.accent + "22",
              border: `1px solid ${C.accent}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Ic d={P.logo} size={18} color={C.accent} sw={1.5} />
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>
              SAT-down
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            AI-Powered SAT Preparation
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: C.bgCard, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: isMobile ? "28px 24px" : "36px 36px",
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderRadius: 8, background: C.bg, padding: 4, marginBottom: 28, border: `1px solid ${C.border}` }}>
            {["signin", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "9px", borderRadius: 6, fontWeight: 600, fontSize: 13,
                background: mode === m ? C.bgElevated : "transparent",
                border: mode === m ? `1px solid ${C.border}` : "1px solid transparent",
                color: mode === m ? C.text : C.textMuted,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
                letterSpacing: "0.02em",
              }}>
                {m === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            {mode === "signup" && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, color: C.steel, marginBottom: 6, letterSpacing: "0.05em" }}>Full Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith" autoComplete="name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: C.steel, marginBottom: 6, letterSpacing: "0.05em" }}>Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" autoComplete="email"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = C.accent}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: C.steel, marginBottom: 6, letterSpacing: "0.05em" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "Minimum 6 characters" : "Your password"}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
                <button type="button" onClick={() => setShowPass(s => !s)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 4,
                  display: "flex", alignItems: "center",
                }}>
                  <Ic d={showPass ? P.eyeOff : P.eye} size={16} color={C.textMuted} />
                </button>
              </div>
            </div>

            {error && (
              <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: C.errorBg, border: `1px solid ${C.error}30`, fontSize: 13, color: C.error }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px", borderRadius: 8,
              background: loading ? C.accentDim : C.accent,
              color: "#fff", fontWeight: 700, fontSize: 14, border: "none",
              cursor: loading ? "default" : "pointer", fontFamily: "inherit",
              letterSpacing: "0.02em", transition: "background 0.2s",
            }}>
              {loading
                ? "Verifying..."
                : mode === "signin" ? "Sign In" : "Create Account"
              }
            </button>
          </form>

          {mode === "signin" && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button style={{ background: "none", border: "none", fontSize: 12, color: C.accent, cursor: "pointer", fontFamily: "inherit" }}>
                Forgot your password?
              </button>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 0" }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.06em" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <button onClick={tryDemo} style={{
            width: "100%", marginTop: 14, padding: "13px", borderRadius: 8,
            background: "transparent", border: "1px solid " + C.borderHi,
            color: C.text, fontWeight: 600, fontSize: 14, cursor: "pointer",
            fontFamily: "inherit", letterSpacing: "0.02em", transition: "border-color 0.18s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.borderHi}>
            Enter with Demo Account
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: C.textMuted }}>
          By continuing you agree to the Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   AI TUTOR DRAWER
══════════════════════════════════════════════════════ */
function TutorDrawer({ onClose, prefill = "", C }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(prefill);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const { isMobile } = useViewport();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const updated = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);
    try {
      const reply = await callTutor(updated);
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Connection error. Please check your network and try again." }]);
    }
    setLoading(false);
  }, [input, messages, loading]);

  const SUGGESTIONS = [
    "Explain Vieta's formulas with an example",
    "How do I identify SAT trap answers quickly?",
    "What does 'Command of Evidence' actually test?",
    "Walk me through how to factor a quadratic",
  ];

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 900,
        background: "rgba(5,7,14,0.85)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center", padding: isMobile ? 0 : 24,
      }}>
      <div style={{
        width: "100%", maxWidth: isMobile ? "100%" : 560,
        background: C.bgCard, border: `1px solid ${C.borderHi}`,
        borderRadius: isMobile ? "16px 16px 0 0" : 14,
        height: isMobile ? "82vh" : "76vh",
        display: "flex", flexDirection: "column", overflow: "hidden",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 22px 16px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>AI Tutor</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Ask about any concept, problem, or strategy</div>
          </div>
          <button onClick={onClose} style={{
            background: C.bgElevated, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex",
          }}>
            <Ic d={P.x} size={15} color={C.textMuted} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 8px" }}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: C.accentMuted, border: `1px solid ${C.accentDim}`,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
              }}>
                <Ic d={P.tutor} size={22} color={C.accent} />
              </div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 8 }}>Your personal SAT tutor</div>
              <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, maxWidth: 300, margin: "0 auto 24px" }}>
                Ask about any concept, request a fully worked example, or paste in any question you are struggling with.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360, margin: "0 auto" }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} style={{
                    background: C.bgElevated, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.steel,
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent + "60"; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.steel; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 18,
            }}>
              <div style={{
                fontSize: 10, color: C.textMuted, marginBottom: 5,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {m.role === "user" ? "You" : "Tutor"}
              </div>
              <div style={{
                maxWidth: "88%", padding: "12px 16px",
                borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                background: m.role === "user" ? C.bgElevated : C.bgHover,
                border: `1px solid ${m.role === "user" ? C.borderHi : C.border}`,
                fontSize: 14, lineHeight: 1.75, color: C.text,
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", marginBottom: 16 }}>
              <div style={{ padding: "12px 16px", borderRadius: "12px 12px 12px 3px", background: C.bgHover, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: C.accent + "70",
                      animation: "sf-bounce 1.2s ease infinite",
                      animationDelay: `${i * 0.18}s`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 18px 20px", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type your question..."
              rows={2}
              style={{
                flex: 1, resize: "none", background: C.bg,
                border: `1px solid ${C.borderHi}`, borderRadius: 9,
                padding: "11px 14px", fontSize: 14, color: C.text,
                outline: "none", lineHeight: 1.5, fontFamily: "inherit",
              }}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              width: 44, height: 44, flexShrink: 0, borderRadius: 9, cursor: "pointer",
              background: input.trim() && !loading ? C.accent : C.bgElevated,
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.18s",
            }}>
              <Ic d={P.send} size={16} color={input.trim() && !loading ? "#fff" : C.textMuted} sw={2} />
            </button>
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 7, textAlign: "center" }}>
            Enter to send  ·  Shift + Enter for a new line
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN: HOME
══════════════════════════════════════════════════════ */
function HomeScreen({ user, setScreen, C }) {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>
          Welcome back, {user.name}.
        </div>
        <div style={{ fontSize: 14, color: C.textMuted }}>
          Your dashboard is ready. Complete your first session to begin tracking progress.
        </div>
      </div>

      {/* Quick Start */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[
          { icon: P.practice, label: "Start Practice", sub: "Adaptive questions", screen: "practice", color: C.accent },
          { icon: P.test,     label: "Take a Test",    sub: "Full simulation",   screen: "test",     color: "#A78BFA" },
        ].map(c => (
          <Card key={c.label} highlight C={C} style={{ cursor: "pointer", transition: "border-color 0.15s" }}
            onClick={() => setScreen(c.screen)}>
            <div style={{
              width: 38, height: 38, borderRadius: 9, background: c.color + "18",
              border: `1px solid ${c.color}35`, display: "flex", alignItems: "center",
              justifyContent: "center", marginBottom: 12,
            }}>
              <Ic d={c.icon} size={18} color={c.color} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 3 }}>{c.label}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{c.sub}</div>
          </Card>
        ))}
      </div>

      {/* Score overview — empty */}
      <Card C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Score Tracker</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Complete a simulation test to see your predicted score.</div>
        <EmptyState
          icon={P.bar}
          title="No score data yet"
          body="Take your first full-length simulation test to generate a baseline score prediction."
          action="Take a Test"
          onAction={() => setScreen("test")}
          C={C}
        />
      </Card>

      {/* Recent activity — empty */}
      <Card C={C}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Recent Activity</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Your practice history and sessions will appear here.</div>
        <EmptyState
          icon={P.clock}
          title="No sessions yet"
          body="Your completed practice sessions and test results will be listed here with timestamps and performance summaries."
          C={C}
        />
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN: PRACTICE
══════════════════════════════════════════════════════ */
function PracticeScreen({ C }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [done, setDone] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorPrefill, setTutorPrefill] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const q = QUESTIONS[qIndex];

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setSessionAnswered(n => n + 1);
    if (i === q.correct) setSessionCorrect(n => n + 1);
    else setShakeKey(k => k + 1);
  };

  const next = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(i => i + 1); setSelected(null); setAnswered(false);
    } else { setDone(true); }
  };

  const openTutor = (pre) => { setTutorPrefill(pre); setTutorOpen(true); };

  if (done) return (
    <div>
      {tutorOpen && <TutorDrawer onClose={() => setTutorOpen(false)} prefill={tutorPrefill} C={C} />}
      <Card highlight C={C} style={{ textAlign: "center", padding: "40px 28px" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>Session Complete</div>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 32 }}>
          {QUESTIONS.length} questions  ·  {Math.round((sessionCorrect / QUESTIONS.length) * 100)}% accuracy
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 32 }}>
          <div><div style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, color: C.accent }}>{sessionCorrect}</div><div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Correct</div></div>
          <div><div style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, color: C.success }}>{sessionAnswered}</div><div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Attempted</div></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => openTutor("I just finished a SAT practice session. Can you suggest what concept areas I should review next?")}
            style={{ flex: 1, padding: "13px", borderRadius: 8, background: "transparent", border: `1px solid ${C.accent}`, color: C.accent, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
            Ask Tutor
          </button>
          <button onClick={() => { setQIndex(0); setSelected(null); setAnswered(false); setDone(false); setSessionCorrect(0); setSessionAnswered(0); }}
            style={{ flex: 2, padding: "13px", borderRadius: 8, background: C.accent, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Practice Again
          </button>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      {tutorOpen && <TutorDrawer onClose={() => setTutorOpen(false)} prefill={tutorPrefill} C={C} />}

      {/* Progress */}
      <div style={{ display: "flex", gap: 5, marginBottom: 22, alignItems: "center" }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 100,
            background: i < qIndex ? C.accent : i === qIndex ? C.accent + "55" : C.border,
            transition: "background 0.3s",
          }} />
        ))}
        <span style={{ fontSize: 11, color: C.textMuted, marginLeft: 8, flexShrink: 0 }}>{qIndex + 1}/{QUESTIONS.length}</span>
      </div>

      {/* Topic row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge color={C.accent} C={C}>{q.topic}</Badge>
          <Badge color={C.steel} C={C}>{q.subtopic}</Badge>
        </div>
        <button
          onClick={() => openTutor(`I need help understanding this SAT question: "${q.question}"`)}
          style={{
            display: "flex", alignItems: "center", gap: 7, padding: "7px 13px",
            borderRadius: 7, background: C.bgElevated, border: `1px solid ${C.accent}44`,
            color: C.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.accent + "44"}
        >
          <Ic d={P.tutor} size={14} color={C.accent} />
          Ask Tutor
        </button>
      </div>

      {/* Question card */}
      <Card
        highlight
        C={C}
        key={shakeKey}
        style={{
          borderLeft: `3px solid ${C.accent}`,
          marginBottom: 16,
          animation: shakeKey > 0 ? "sf-shake 0.45s ease" : "none",
        }}
      >
        <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Question {qIndex + 1}  ·  {q.points} pts
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.75, color: C.text }}>{q.question}</div>
      </Card>

      {/* Choices */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
        {q.choices.map((c, i) => {
          const isRight = i === q.correct;
          const isSelected = i === selected;
          const isWrong = answered && isSelected && !isRight;
          let bg = C.bgCard, border = C.border, col = C.text;
          if (answered) {
            if (isRight) { bg = C.successBg; border = C.success + "55"; col = C.success; }
            else if (isWrong) { bg = C.errorBg; border = C.error + "55"; col = C.error; }
          } else if (isSelected) { bg = C.bgHover; border = C.borderHi; }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={answered} style={{
              background: bg, border: `1px solid ${border}`, borderRadius: 9,
              padding: "14px 18px", cursor: answered ? "default" : "pointer",
              display: "flex", alignItems: "center", gap: 14,
              transition: "all 0.15s", color: col, fontFamily: "inherit",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: answered && isRight ? C.success + "20" : answered && isWrong ? C.error + "20" : C.bgElevated,
                border: `1px solid ${answered && isRight ? C.success + "60" : answered && isWrong ? C.error + "60" : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {answered && isRight
                  ? <Ic d={P.check} size={13} color={C.success} sw={2.5} />
                  : answered && isWrong
                  ? <Ic d={P.x} size={13} color={C.error} sw={2.5} />
                  : <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted }}>{String.fromCharCode(65 + i)}</span>
                }
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.55, textAlign: "left" }}>{c}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div style={{ animation: "sf-fadeup 0.3s ease both" }}>
          <Card C={C} style={{
            borderLeft: `3px solid ${selected === q.correct ? C.success : C.error}`,
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10,
              color: selected === q.correct ? C.success : C.error }}>
              {selected === q.correct ? "Correct" : "Incorrect"}
            </div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.75, marginBottom: 12 }}>{q.explanation}</div>
            <div style={{ padding: "11px 14px", background: C.warningBg, border: `1px solid ${C.warning}25`, borderRadius: 8, fontSize: 13, color: C.textMuted, lineHeight: 1.65 }}>
              <span style={{ fontWeight: 600, color: C.warning }}>Common trap: </span>{q.trap}
            </div>
          </Card>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => openTutor(`I just answered this question: "${q.question}" — ${selected === q.correct ? "I got it right but want a deeper explanation." : "I got it wrong. Please walk me through the full solution."}`)}
              style={{ flex: 1, padding: "13px", borderRadius: 8, background: "transparent", border: `1px solid ${C.accent}`, color: C.accent, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <Ic d={P.tutor} size={14} color={C.accent} />
              Explain further
            </button>
            <button onClick={next} style={{ flex: 2, padding: "13px", borderRadius: 8, background: C.accent, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              {qIndex < QUESTIONS.length - 1 ? "Next Question" : "Finish Session"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN: TEST
══════════════════════════════════════════════════════ */
function TestScreen({ C }) {
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(2100);
  const [answers, setAnswers] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    if (started) timerRef.current = setInterval(() => setTime(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timerRef.current);
  }, [started]);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const SAMPLE_QS = [
    { id: 1, q: "If 2y − 6 = 14, what is the value of y + 3?", cs: ["7", "10", "13", "16"] },
    { id: 2, q: "The graph of y = ax² + bx + c passes through the point (0, 5). What is the value of c?", cs: ["a", "b", "5", "0"] },
    { id: 3, q: "Which word most precisely conveys the meaning of 'ephemeral' as used in the passage?", cs: ["Eternal", "Fleeting", "Vivid", "Fragrant"] },
  ];

  if (!started) return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Digital SAT Simulation</div>
        <div style={{ fontSize: 14, color: C.textMuted }}>Adaptive modules, Bluebook-accurate timing, and full post-test analytics.</div>
      </div>

      <Card highlight C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>What to expect</div>
        {[
          "Adaptive difficulty — Module 2 adjusts based on Module 1 performance",
          "Bluebook-accurate timer and interface behavior",
          "Integrated Desmos calculator for the Math section",
          "Time-per-question tracking and error classification on completion",
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, fontSize: 14, color: C.textMuted }}>
            <Ic d={P.check} size={15} color={C.success} sw={2.5} />
            <span>{t}</span>
          </div>
        ))}
      </Card>

      <Card C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>Select module</div>
        {[
          ["Reading & Writing", "27 questions  ·  32 minutes"],
          ["Math", "27 questions  ·  35 minutes"],
          ["Full Practice Test", "54 questions  ·  64 minutes"],
        ].map(([label, meta], i) => (
          <button key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", padding: "13px 16px", marginBottom: 7, borderRadius: 8,
            background: i === 1 ? C.accentMuted : C.bgElevated,
            border: `1px solid ${i === 1 ? C.accentDim : C.border}`,
            color: i === 1 ? C.accent : C.steel, cursor: "pointer", fontFamily: "inherit",
            fontWeight: i === 1 ? 600 : 500, fontSize: 14, transition: "all 0.15s",
          }}>
            <span>{label}</span>
            <span style={{ fontSize: 12, color: C.textMuted }}>{meta}</span>
          </button>
        ))}
      </Card>

      <button onClick={() => setStarted(true)} style={{
        width: "100%", padding: 16, borderRadius: 9,
        background: C.accent, color: "#fff", fontWeight: 700, fontSize: 15,
        border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
      }}>Begin Test</button>
    </div>
  );

  return (
    <div>
      {/* Timer bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 18px", background: C.bgCard,
        border: `1px solid ${time < 300 ? C.error + "50" : C.border}`,
        borderRadius: 9, marginBottom: 20,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Math  ·  Module 1</div>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: time < 300 ? C.error : C.warning }}>
          {fmt(time)}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{Object.keys(answers).length}/{SAMPLE_QS.length} answered</div>
      </div>

      {SAMPLE_QS.map((tq, qi) => (
        <Card key={tq.id} C={C} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Question {qi + 1}
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.7, color: C.text, marginBottom: 14 }}>{tq.q}</div>
          {tq.cs.map((c, ci) => (
            <button key={ci} onClick={() => setAnswers(a => ({ ...a, [tq.id]: ci }))} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "11px 14px", marginBottom: 6, borderRadius: 8,
              background: answers[tq.id] === ci ? C.accentMuted : C.bgElevated,
              border: `1px solid ${answers[tq.id] === ci ? C.accentDim : C.border}`,
              color: answers[tq.id] === ci ? C.accent : C.steel,
              fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
              transition: "all 0.15s",
            }}>{c}</button>
          ))}
        </Card>
      ))}

      <button style={{
        width: "100%", padding: 15, borderRadius: 9,
        background: C.accent, color: "#fff", fontWeight: 700, fontSize: 15,
        border: "none", cursor: "pointer", fontFamily: "inherit",
      }}>Submit Module</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN: ANALYTICS
══════════════════════════════════════════════════════ */
function AnalyticsScreen({ setScreen, C }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Analytics</div>
        <div style={{ fontSize: 14, color: C.textMuted }}>Performance data builds automatically as you complete sessions.</div>
      </div>

      <Card highlight C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Predicted Score</div>
        <EmptyState
          icon={P.bar}
          title="No score data yet"
          body="Complete at least one full-length simulation test to generate a score prediction. Your baseline will appear here."
          action="Take a Simulation Test"
          onAction={() => setScreen("test")}
          C={C}
        />
      </Card>

      <Card C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Sub-skill Accuracy</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Accuracy breakdowns across the 80 SAT sub-skills populate as you practice.</div>
        <EmptyState
          icon={P.analytics}
          title="No sub-skill data"
          body="Complete practice sessions and simulation tests to see granular accuracy data by topic and sub-topic."
          action="Start Practicing"
          onAction={() => setScreen("practice")}
          C={C}
        />
      </Card>

      <Card C={C}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Error Pattern Analysis</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>The system classifies your errors into four categories: conceptual, trap-answer susceptibility, careless, and time-pressure errors.</div>
        <EmptyState
          icon={P.star}
          title="No error patterns yet"
          body="After a few sessions, the AI will identify your most common error types and surface targeted remediation strategies."
          C={C}
        />
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN: PLANNER
══════════════════════════════════════════════════════ */
function PlannerScreen({ C }) {
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Welcome. I am your AI study coach. To get started, tell me your target SAT score and your test date, and I will generate a personalized study roadmap for you." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const updated = [...chatHistory, { role: "user", content: text }];
    setChatHistory(updated);
    setLoading(true);
    try {
      const reply = await callTutor(
        updated.map(m => ({ role: m.role, content: m.content })),
        `You are an expert SAT study coach inside SAT-down. Help students build and manage personalized study plans.
Ask about their target score, test date, and weekly availability. Generate realistic study schedules.
Provide strategic advice about which topics to prioritize. Be direct, specific, and motivating.
Write in prose. No emojis. No unnecessary bullet lists. Keep responses concise and actionable.`
      );
      setChatHistory(h => [...h, { role: "assistant", content: reply }]);
    } catch {
      setChatHistory(h => [...h, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Study Planner</div>
        <div style={{ fontSize: 14, color: C.textMuted }}>AI-generated study schedules built around your test date and availability.</div>
      </div>

      {/* Schedule empty state */}
      <Card C={C} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Your Study Schedule</div>
        <EmptyState
          icon={P.planner}
          title="No schedule generated"
          body="Tell the AI coach below your test date and how many hours per week you can study. It will build an optimized, personalized study plan."
          C={C}
        />
      </Card>

      {/* AI Coach Chat */}
      <Card C={C}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>AI Study Coach</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.success }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.success }} />
            Live
          </div>
        </div>

        <div style={{
          background: C.bg, borderRadius: 9, border: `1px solid ${C.border}`,
          padding: "14px", maxHeight: 300, overflowY: "auto", marginBottom: 12,
        }}>
          {chatHistory.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {m.role === "user" ? "You" : "Coach"}
              </div>
              <div style={{
                maxWidth: "90%", padding: "11px 14px",
                borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                background: m.role === "user" ? C.bgElevated : C.bgHover,
                border: `1px solid ${m.role === "user" ? C.borderHi : C.border}`,
                fontSize: 13, lineHeight: 1.7, color: C.text,
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "8px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent + "70", animation: "sf-bounce 1.2s ease infinite", animationDelay: `${i*0.18}s` }} />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ display: "flex", gap: 9 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Enter your test date and study availability..."
            style={{
              flex: 1, background: C.bg, border: `1px solid ${C.borderHi}`,
              borderRadius: 8, padding: "11px 14px", fontSize: 13, color: C.text, outline: "none",
              fontFamily: "inherit",
            }} />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            width: 42, height: 42, flexShrink: 0, borderRadius: 8,
            background: input.trim() && !loading ? C.accent : C.bgElevated,
            border: `1px solid ${C.border}`, cursor: input.trim() ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.18s",
          }}>
            <Ic d={P.send} size={15} color={input.trim() && !loading ? "#fff" : C.textMuted} sw={2} />
          </button>
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DESKTOP LAYOUT
══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "home",      icon: P.home,      label: "Dashboard"  },
  { id: "practice",  icon: P.practice,  label: "Practice"   },
  { id: "test",      icon: P.test,      label: "Test"       },
  { id: "analytics", icon: P.analytics, label: "Analytics"  },
  { id: "planner",   icon: P.planner,   label: "Planner"    },
  { id: "tutor",     icon: P.tutor,     label: "AI Tutor"   },
];

function DesktopApp({ user, onLogout, C, theme, setTheme }) {
  const [screen, setScreen] = useState("home");
  const [tutorOpen, setTutorOpen] = useState(false);

  const handleNav = (id) => {
    if (id === "tutor") { setTutorOpen(true); return; }
    setScreen(id);
  };

  const currentItem = NAV_ITEMS.find(n => n.id === screen);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {tutorOpen && <TutorDrawer onClose={() => setTutorOpen(false)} C={C} />}

      {/* Sidebar */}
      <div style={{
        width: 240, flexShrink: 0,
        background: C.bgCard,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 22px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: C.accentMuted,
              border: `1px solid ${C.accentDim}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Ic d={P.logo} size={16} color={C.accent} />
            </div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>SAT-down</div>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Prep Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 8 }}>Navigation</div>
          {NAV_ITEMS.map(n => {
            const active = screen === n.id && n.id !== "tutor";
            return (
              <button key={n.id} onClick={() => handleNav(n.id)} style={{
                display: "flex", alignItems: "center", gap: 11,
                width: "100%", padding: "10px 10px", borderRadius: 8, marginBottom: 2,
                background: active ? C.accentMuted : "transparent",
                border: `1px solid ${active ? C.accentDim : "transparent"}`,
                color: active ? C.accent : n.id === "tutor" ? C.steel : C.textMuted,
                cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: active ? 600 : 500,
                transition: "all 0.15s", textAlign: "left",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.bgHover; e.currentTarget.style.color = C.text; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = n.id === "tutor" ? C.steel : C.textMuted; } }}>
                <Ic d={n.icon} size={17} color={active ? C.accent : n.id === "tutor" ? C.steel : C.textMuted} />
                {n.label}
                {n.id === "tutor" && <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 7px", borderRadius: 4, background: C.accent + "20", color: C.accent, fontWeight: 600, letterSpacing: "0.06em" }}>AI</span>}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "14px 12px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: C.bgElevated, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: C.accent,
              flexShrink: 0,
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
            </div>
            <button onClick={onLogout} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexShrink: 0 }}>
              <Ic d={P.logout} size={16} color={C.textMuted} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: "16px 32px",
          borderBottom: `1px solid ${C.border}`,
          background: C.bgCard + "CC",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>
              {currentItem?.label ?? "Dashboard"}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>SAT-down  ·  AI-Powered Preparation</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setTutorOpen(true)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
              borderRadius: 8, background: C.accentMuted, border: `1px solid ${C.accentDim}`,
              color: C.accent, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              <Ic d={P.tutor} size={15} color={C.accent} />
              Ask AI Tutor
            </button>
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
              borderRadius: 8, background: C.bgElevated, border: `1px solid ${C.border}`,
              color: C.textMuted, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}>
              <Ic d={theme === "dark" ? P.sun : P.moon} size={15} />
            </button>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px", maxWidth: 800, width: "100%" }}>
          <div style={{ animation: "sf-fadeup 0.28s ease" }}>
            {screen === "home"      && <HomeScreen user={user} setScreen={setScreen} C={C} />}
            {screen === "practice"  && <PracticeScreen C={C} />}
            {screen === "test"      && <TestScreen C={C} />}
            {screen === "analytics" && <AnalyticsScreen setScreen={setScreen} C={C} />}
            {screen === "planner"   && <PlannerScreen C={C} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MOBILE LAYOUT
══════════════════════════════════════════════════════ */
const MOBILE_NAV = [
  { id: "home",      icon: P.home,      label: "Home"     },
  { id: "practice",  icon: P.practice,  label: "Practice" },
  { id: "test",      icon: P.test,      label: "Test"     },
  { id: "analytics", icon: P.analytics, label: "Stats"    },
  { id: "planner",   icon: P.planner,   label: "Planner"  },
];

function MobileApp({ user, onLogout, C, theme, setTheme }) {
  const [screen, setScreen] = useState("home");
  const [tutorOpen, setTutorOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", maxWidth: 480, margin: "0 auto", background: C.bg, fontFamily: "'IBM Plex Sans', sans-serif", display: "flex", flexDirection: "column" }}>
      {tutorOpen && <TutorDrawer onClose={() => setTutorOpen(false)} C={C} />}

      {/* Mobile top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 200,
        background: C.bg + "F8", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "14px 18px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, background: C.accentMuted, border: `1px solid ${C.accentDim}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Ic d={P.logo} size={14} color={C.accent} />
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>SAT-down</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setTutorOpen(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 12px", borderRadius: 8,
            background: C.accentMuted, border: `1px solid ${C.accentDim}`,
            color: C.accent, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
          }}>
            <Ic d={P.tutor} size={14} color={C.accent} />
            Tutor
          </button>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{
            padding: "7px 10px", borderRadius: 8, background: C.bgElevated,
            border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", color: C.textMuted,
          }}>
            <Ic d={theme === "dark" ? P.sun : P.moon} size={16} />
          </button>
          <button onClick={() => setMenuOpen(m => !m)} style={{
            padding: "7px 10px", borderRadius: 8, background: C.bgElevated,
            border: `1px solid ${C.border}`, cursor: "pointer", display: "flex",
          }}>
            <Ic d={P.user} size={16} color={C.textMuted} />
          </button>
        </div>
      </div>

      {/* User menu dropdown */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, right: 18, zIndex: 300,
          background: C.bgCard, border: `1px solid ${C.borderHi}`,
          borderRadius: 10, padding: "6px", minWidth: 180,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}`, marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{user.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{user.email}</div>
          </div>
          <button onClick={() => { setMenuOpen(false); onLogout(); }} style={{
            display: "flex", alignItems: "center", gap: 9, width: "100%",
            padding: "9px 12px", borderRadius: 7, background: "none", border: "none",
            color: C.error, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
          }}>
            <Ic d={P.logout} size={15} color={C.error} />
            Sign Out
          </button>
        </div>
      )}
      {menuOpen && <div style={{ position: "fixed", inset: 0, zIndex: 299 }} onClick={() => setMenuOpen(false)} />}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 84px" }}>
        <div style={{ animation: "sf-fadeup 0.28s ease" }} key={screen}>
          {screen === "home"      && <HomeScreen user={user} setScreen={setScreen} C={C} />}
          {screen === "practice"  && <PracticeScreen C={C} />}
          {screen === "test"      && <TestScreen C={C} />}
          {screen === "analytics" && <AnalyticsScreen setScreen={setScreen} C={C} />}
          {screen === "planner"   && <PlannerScreen C={C} />}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, zIndex: 200,
        background: C.bg + "F8", backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
        display: "flex", padding: "8px 0 14px",
      }}>
        {MOBILE_NAV.map(n => {
          const active = screen === n.id;
          return (
            <button key={n.id} onClick={() => setScreen(n.id)} style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "4px 0", opacity: active ? 1 : 0.38,
              transition: "opacity 0.18s",
            }}>
              <Ic d={n.icon} size={20} color={active ? C.accent : C.textMuted} sw={active ? 2 : 1.5} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: active ? C.accent : C.textMuted }}>
                {n.label}
              </span>
              {active && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.accent }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sf_session");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("sf_theme");
      return saved || "dark";
    } catch { return "dark"; }
  });
  const { isMobile, isDesktop } = useViewport();

  const C = theme === "dark" ? DARK : LIGHT;

  // Persist theme preference
  useEffect(() => {
    localStorage.setItem("sf_theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("sf_session");
    setUser(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: ${C.bg}; color: ${C.text}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 10px; }
        button { font-family: 'IBM Plex Sans', sans-serif; }
        input, textarea { font-family: 'IBM Plex Sans', sans-serif; }
        textarea { scrollbar-width: none; }
        @keyframes sf-fadeup {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sf-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes sf-shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-7px); }
          40%,80% { transform: translateX(7px); }
        }
        @keyframes sf-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {!user
        ? <AuthScreen onAuth={setUser} C={C} />
        : isMobile
          ? <MobileApp user={user} onLogout={handleLogout} C={C} theme={theme} setTheme={setTheme} />
          : <DesktopApp user={user} onLogout={handleLogout} C={C} theme={theme} setTheme={setTheme} />
      }
    </>
  );
}
