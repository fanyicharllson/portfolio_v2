"use client";

import { useRouter } from "next/navigation";
import { Smartphone, Zap, Bell, Sparkles } from "lucide-react";

function DownloadCharllsonMobileApp() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon with Animation Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-cyan-500/20">
              <Smartphone
                className="w-20 h-20 text-cyan-400"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Thank You! 😊 
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">
              I appreciate your interest in the Charllson mobile app
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-lg">
              Coming Soon
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            We&apos;re working hard to bring you an amazing mobile experience.
            The Charllson app will be available on iOS and Android very soon!
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
              <Zap className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-400">
                Optimized performance for smooth experience
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
              <Bell className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-sm text-slate-400">
                Real-time notifications and updates
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
              <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Beautiful UI</h3>
              <p className="text-sm text-slate-400">
                Stunning design you&apos;ll love to use
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Go Back to Portfolio
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-slate-500 text-sm mt-4">
            Want to be notified when we launch? Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}

export default DownloadCharllsonMobileApp;
