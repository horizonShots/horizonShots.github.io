import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';

const MENU_ITEMS = [
    { label: 'HOME', href: '/', icon: '⌂' },
    { label: 'MAP', href: '/map', icon: '◈' },
    { label: 'STORY', href: '/story', icon: '⚡' },
    { label: 'ARCHIVE', href: '/archive', icon: '⌬' },
];

export const RadialNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { playHover, playClick } = useSound();

    const toggleOpen = () => {
        playClick();
        setIsOpen(!isOpen);
    };

    // Animation variants
    const menuVariants: any = {
        closed: {
            scale: 0,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: any = {
        closed: { opacity: 0, scale: 0, x: 0, y: 0 },
        open: (i: number) => {
            const angle = (i * (360 / MENU_ITEMS.length)) - 90; // Start from top
            const radius = 100; // Distance from center
            const radian = (angle * Math.PI) / 180;
            return {
                opacity: 1,
                scale: 1,
                x: Math.cos(radian) * radius,
                y: Math.sin(radian) * radius,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            };
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
            {/* Backdrop for click-away */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Menu Container */}
            <div className="relative z-50">
                {/* Expanded Menu Items */}
                <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    {MENU_ITEMS.map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            custom={i}
                            variants={itemVariants}
                            onMouseEnter={playHover}
                            onClick={playClick}
                            className="absolute w-16 h-16 rounded-full bg-asphalt border border-acid/30 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:bg-acid hover:text-black hover:scale-110 transition-colors duration-300 pointer-events-auto group text-decoration-none"
                        >
                            <span className="text-xl mb-1">{item.icon}</span>
                            <span className="text-[0.5rem] font-mono tracking-widest opacity-70 group-hover:font-bold">{item.label}</span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Main Toggle Button */}
                <motion.button
                    onClick={toggleOpen}
                    onMouseEnter={playHover}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 ${isOpen ? 'bg-acid border-white text-black' : 'bg-asphalt border-acid text-acid'}`}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </motion.div>

                    {/* Pulse Ring */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full border border-acid animate-ping opacity-20" />
                    )}
                </motion.button>
            </div>
        </div>
    );
};
