import styles from './Header.module.css'
import Link from 'next/link';
import {FaInstagram, FaLinkedin} from 'react-icons/fa'
import { SiBehance, SiArtstation } from "react-icons/si";

const Header = () => {
    return (
        <>
        <header className="h-16 md:h-20 container flex items-center justify-between ">
            <div className="text-2xl">
                Olya Didenko
            </div>
            <nav>
                <ul className='flex items-center gap-4 text-2xl'>
                    <li><Link href="/">Portfolio</Link></li>
                    <li>Games</li>
                    <li>Watercolor</li>
                    <li>About</li>
                    <li>Contact Me</li>
                </ul>
            </nav>
            <div className="flex items-center justify-between gap-4 text-2xl">
                <a  href="https://www.behance.net/olgadidenkoart" target="_blank" className="text-[#1769FF] hover:text-[#2e7dff] transition-colors duration-200">
                   <SiBehance className="w-6 h-6"/> 
                </a>
                {/* <a  href="https://artstation.com" target="_blank">
                    <SiArtstation />
                </a> */}
                <a href="https://www.instagram.com/olya_sangeet?igsh=dTVjbTFkbGVhYmtp&utm_source=qr" target="_blank" className="text-[#E4405F] hover:text-[#ff5f80] transition-colors duration-200">
                    <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/olga-didenko-art/" target="_blank" className="text-[#0A66C2] hover:text-[#1a7ef0] transition-colors duration-200">
                    <FaLinkedin  className="w-6 h-6 " />
                </a>
            </div>
        </header>
    </> 
    );
}
 
export default Header;