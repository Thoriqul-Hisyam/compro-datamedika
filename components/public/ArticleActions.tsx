"use client";

import { Facebook, Twitter, Linkedin, Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareProps {
  url: string;
  title: string;
}

export default function ArticleActions({ url, title }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877F2]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-[#1DA1F2]",
    },
    {
      name: "Linkedin",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0A66C2]",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar Actions */}
      <div className="hidden lg:flex flex-col gap-4 sticky top-40">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 rotate-180 [writing-mode:vertical-lr]">
          Share Article
        </p>
        <div className="w-px h-12 bg-slate-100 mx-auto my-2" />
        {shareLinks.map((share) => (
          <a
            key={share.name}
            href={share.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 transition-all hover:text-white shadow-sm ${share.color}`}
            title={`Share on ${share.name}`}
          >
            <share.icon size={20} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
          title="Copy Link"
        >
          {copied ? <Check size={20} /> : <LinkIcon size={20} />}
        </button>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-4 flex items-center justify-around">
           {shareLinks.map((share) => (
            <a
              key={share.name}
              href={share.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-slate-500 hover:text-primary transition-colors"
            >
              <share.icon size={22} />
            </a>
          ))}
          <button
            onClick={copyToClipboard}
            className="p-3 text-slate-500 hover:text-primary transition-colors relative"
          >
            {copied ? <Check size={22} className="text-green-500" /> : <Share2 size={22} />}
            <AnimatePresence>
                {copied && (
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                    >
                        Copied!
                    </motion.span>
                )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </>
  );
}
