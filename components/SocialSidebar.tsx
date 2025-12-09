"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiBehance, SiArtstation } from "react-icons/si";

const SocialSidebar = () => {
  return (
    <div className="hidden md:flex fixed top-1/3 right-6 z-40 flex-col items-center gap-4">
      <div className="w-[1px] h-16 bg-[var(--color-accent-light)] mb-2" />

      <a
        href="https://www.instagram.com/olya_sangeet?igsh=dTVjbTFkbGVhYmtp&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F] hover:text-[#ff5f80] transition-colors duration-200"
      >
        <FaInstagram className="w-6 h-6" />
      </a>

      <a
        href="https://www.linkedin.com/in/olga-didenko-art/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0A66C2] hover:text-[#1a7ef0] transition-colors duration-200"
      >
        <FaLinkedin className="w-6 h-6" />
      </a>

      <a
        href="https://www.behance.net/olgadidenkoart"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1769FF] hover:text-[#2e7dff] transition-colors duration-200"
      >
        <SiBehance className="w-6 h-6" />
      </a>

      {/* <a
        href="https://artstation.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#13AFF0] hover:text-[#28c9ff] transition-colors duration-200"
      >
        <SiArtstation className="w-6 h-6" />
      </a> */}

      <div className="w-[1px] h-10 bg-[var(--color-accent-light)] mt-2" />
    </div>
  );
};

export default SocialSidebar;