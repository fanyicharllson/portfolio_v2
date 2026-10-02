import React from "react";

export default function BackgroundEffect({ isClient }: { isClient: boolean }) {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        {isClient && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-scale"
              style={
                {
                  "--pulse-from": 1,
                  "--pulse-to": 1.2,
                  "--opacity-from": 0.3,
                  "--opacity-to": 0.6,
                  animationDuration: "8s",
                } as React.CSSProperties
              }
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-scale"
              style={
                {
                  "--pulse-from": 1.2,
                  "--pulse-to": 1,
                  "--opacity-from": 0.6,
                  "--opacity-to": 0.3,
                  animationDuration: "10s",
                } as React.CSSProperties
              }
            />
          </>
        )}
      </div>
    </>
  );
}
