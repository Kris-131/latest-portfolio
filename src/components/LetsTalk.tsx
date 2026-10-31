import { FormEvent, useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/LetsTalk.css";

const EMAIL = "krishmavani982@gmail.com";

const LetsTalk = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  // Reveal the section as it scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("lt-in"),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // No backend: the message is composed in the visitor's own email app.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n-- \n${name}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <section className="letstalk-section" id="lets-talk" ref={sectionRef}>
      <div className="letstalk-card">
        <div className="lt-glow lt-glow-a" />
        <div className="lt-glow lt-glow-b" />

        <div className="lt-left">
          <h2 className="lt-title">
            <span className="lt-line">
              <span>Let&rsquo;s</span>
            </span>
            <span className="lt-line">
              <span>
                <em>talk.</em>
              </span>
            </span>
          </h2>
          <p className="lt-copy">
            Have an AI idea, a project or an opportunity in mind? Send me a
            message and I&rsquo;ll get back to you.
          </p>
          <a
            className="lt-mail"
            href={`mailto:${EMAIL}`}
            data-cursor="disable"
          >
            {EMAIL} <MdArrowOutward />
          </a>
        </div>

        <form className="lt-form" onSubmit={onSubmit}>
          <label className="lt-field">
            <input
              name="name"
              type="text"
              placeholder=" "
              required
              autoComplete="name"
              data-cursor="disable"
            />
            <span>Your name</span>
          </label>
          <label className="lt-field">
            <input
              name="email"
              type="email"
              placeholder=" "
              required
              autoComplete="email"
              data-cursor="disable"
            />
            <span>Email address</span>
          </label>
          <label className="lt-field">
            <textarea
              name="message"
              rows={4}
              placeholder=" "
              required
              data-cursor="disable"
            />
            <span>Tell me about your project</span>
          </label>

          <button type="submit" className="lt-submit" data-cursor="disable">
            <span className="lt-submit-text">
              {sent ? "Opening your email app…" : "Send message"}
            </span>
            <span className="lt-submit-icon">
              <MdArrowOutward />
            </span>
          </button>

          <p className="lt-privacy">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12l2.5 2.5 4.5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your message opens in your email app and goes straight to my inbox.
            Nothing is stored on this site.
          </p>
        </form>
      </div>
    </section>
  );
};

export default LetsTalk;
