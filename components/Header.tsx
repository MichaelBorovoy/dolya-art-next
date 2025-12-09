"use client";
import styles from './Header.module.css'
import Link from 'next/link';
import { useState } from 'react';
import {FaInstagram, FaLinkedin} from 'react-icons/fa'
import { SiBehance, SiArtstation } from "react-icons/si";

const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
           {/* <header className="border-b border-[var(--color-accent-light)] bg-[var(--color-cream)]"> */}
           <header >
      <div className="container mx-auto h-16 md:h-20 flex items-center justify-between">

        <h1 className="text-lg md:text-xl font-semibold text-[var(--color-primary)] whitespace-nowrap">
          Olya Didenko
        </h1>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8 whitespace-nowrap text-[var(--color-charcoal)]">
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/concept-art">Concept Art</Link>
            </li>
            <li>
              <Link href="/mobile-games-casino">Mobile Games/Casino</Link>
            </li>
            <li>
              <Link href="/sketches">Sketches</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-accent-light)] bg-[var(--color-cream)]">
          <nav className="container mx-auto py-4 flex flex-col gap-3 text-[var(--color-charcoal)]">
            <Link
              href="/portfolio"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/concept-art"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Concept Art
            </Link>
            <Link
              href="/mobile-games-casino"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Mobile Games/Casino
            </Link>
            <Link
              href="/sketches"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Sketches
            </Link>
            <Link
              href="/about"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-3 flex items-center gap-4">
              <a
                href="https://www.behance.net/olgadidenkoart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1769FF]"
              >
                <SiBehance className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/olya_sangeet?igsh=dTVjbTFkbGVhYmtp&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F]"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/olga-didenko-art/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A66C2]"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
    </> 
    );
}
 
export default Header;