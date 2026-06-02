import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Backdrop blur when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(2px)',
            zIndex: 9998,
          }}
        />
      )}

      {/* Chat Popup */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: window.innerWidth < 480 ? '0' : '90px',
          right: window.innerWidth < 480 ? '0' : '24px',
          width: window.innerWidth < 480 ? '100vw' : '420px',
          height: window.innerWidth < 480 ? '100dvh' : '650px',
          borderRadius: window.innerWidth < 480 ? '20px 20px 0 0' : '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.4)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          animation: 'popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <iframe
            src="https://modiverse-bot.vercel.app"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              flexShrink: 0,
            }}
            allow="clipboard-write"
          />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: open
            ? '#1e3a8a'
            : 'linear-gradient(135deg, #2563eb, #38bdf8)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: open
            ? '0 4px 20px rgba(37,99,235,0.3)'
            : '0 4px 24px rgba(37,99,235,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: open ? 'rotate(0deg) scale(1)' : 'rotate(0deg) scale(1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Pulse ring animation */}
      {!open && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          border: '2px solid rgba(37,99,235,0.5)',
          zIndex: 9998,
          animation: 'ping 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @media (max-width: 480px) {
          .modiverse-popup {
            width: 100vw !important;
            height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
