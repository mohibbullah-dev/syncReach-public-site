const WHATSAPP_NUMBER = "8801315121758";
const WHATSAPP_MESSAGE = "Hi SyncReach — I'd like to book a free call about outbound.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.42 1.32-1.96 1.36-.5.05-.96.23-3.24-.68-2.73-1.08-4.47-3.86-4.61-4.04-.14-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.56.79 1.94.86 2.08.07.14.12.31.02.49-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.11.07.65-.17 1.33z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SyncReach on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
    >
      {/* Soft pulse ring */}
      <span
        aria-hidden
        className="absolute inset-0 -m-1 animate-ping rounded-[12px] bg-[#25D366]/35 [animation-duration:2.4s]"
      />

      <span
        className={[
          "relative flex h-14 w-14 items-center justify-center rounded-[12px]",
          "bg-[#25D366] text-white",
          "shadow-[0_14px_36px_-10px_rgba(37,211,102,0.75),0_8px_18px_-12px_rgba(15,23,42,0.45)]",
          "ring-4 ring-[#25D366]/20",
          "transition duration-300",
          "hover:-translate-y-1 hover:bg-[#1ebe57] hover:shadow-[0_20px_44px_-12px_rgba(37,211,102,0.85)]",
          "active:translate-y-0 active:scale-[0.98]",
          "animate-float",
        ].join(" ")}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </span>

      {/* Hover label */}
      <span
        className={[
          "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2",
          "whitespace-nowrap rounded-[12px] bg-foreground px-3 py-1.5 text-xs font-semibold text-background",
          "opacity-0 shadow-elevate transition duration-200",
          "group-hover:opacity-100",
        ].join(" ")}
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
