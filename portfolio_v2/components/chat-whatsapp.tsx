import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const whatsappLink = `https://wa.me/${whatsappNumber}`;

export default function MessageMeOnWhatsApp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="fixed top-30 sm:top-43 right-4 sm:right-6 z-50"
    >
      <Link
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300 hover:scale-110"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 hover:bg-green-500 text-slate-400 hover:text-white hover:border-green-400/50 w-10 h-10 sm:w-12 sm:h-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="h-4 w-4 sm:h-5 sm:w-5"
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.1L4 29l7.18-2.34A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.84-.58-5.4-1.58l-.38-.24-4.28 1.4 1.4-4.14-.25-.4A9.96 9.96 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.66-.82-1.92-.92-.26-.1-.44-.14-.62.14-.18.28-.72.92-.88 1.1-.16.18-.32.2-.6.06-.28-.14-1.18-.44-2.24-1.4-.82-.74-1.38-1.66-1.54-1.94-.16-.28-.02-.42.12-.56.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.06-.14-.62-1.5-.86-2.06-.22-.54-.44-.46-.62-.46-.16 0-.34-.02-.52-.02-.18 0-.48.06-.74.28-.26.22-1 1-.98 2.44.02 1.44 1.02 2.84 1.16 3.04.14.2 2 3.06 4.86 4.16.68.28 1.2.44 1.62.56.68.22 1.3.18 1.78.1.54-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.18-1.34-.06-.12-.26-.18-.54-.32z" />
          </svg>
          <span className="sr-only">WhatsApp</span>
        </Button>
      </Link>
    </motion.div>
  );
}