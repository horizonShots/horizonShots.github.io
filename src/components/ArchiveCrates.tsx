import React from 'react';
import { motion } from 'framer-motion';

const CRATES = [
    { id: 1, label: 'RAW_ARCHIVE_01', link: '#', color: 'border-acid' },
    { id: 2, label: 'RAW_ARCHIVE_02', link: '#', color: 'border-cyan' },
];

export const ArchiveCrates: React.FC = () => {
    return (
        <div className="min-h-screen bg-asphalt flex flex-col md:flex-row items-center justify-center gap-20 p-10 perspective-1000">
            {CRATES.map((crate) => (
                <motion.a
                    key={crate.id}
                    href={crate.link}
                    whileHover={{
                        scale: 1.05,
                        rotateX: [0, -2, 2, -2, 0],
                        rotateY: [0, -2, 2, -2, 0],
                        transition: { duration: 0.5 }
                    }}
                    className="relative group cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Crate Front */}
                    <div className={`w-64 h-80 bg-black/40 backdrop-blur-md border-2 ${crate.color} relative flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>

                        {/* Industrial Markings */}
                        <div className={`absolute top-4 left-4 w-2 h-2 ${crate.color.replace('border', 'bg')}`} />
                        <div className={`absolute top-4 right-4 w-2 h-2 ${crate.color.replace('border', 'bg')}`} />
                        <div className={`absolute bottom-4 left-4 w-2 h-2 ${crate.color.replace('border', 'bg')}`} />
                        <div className={`absolute bottom-4 right-4 w-2 h-2 ${crate.color.replace('border', 'bg')}`} />

                        <div className="w-full h-px bg-white/10 absolute top-1/3" />
                        <div className="w-full h-px bg-white/10 absolute bottom-1/3" />

                        {/* Label */}
                        <h2 className="font-display text-2xl text-white text-center mb-2">{crate.label}</h2>
                        <p className="font-mono text-xs text-titanium">ACCESS_LEVEL: UNRESTRICTED</p>

                        {/* Lock Icon */}
                        <div className="mt-8 opacity-50 group-hover:opacity-100 transition-opacity">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>

                    </div>

                    {/* 3D Sides (Simulated) */}
                    <div className={`absolute top-0 right-0 w-10 h-full bg-white/5 origin-left skew-y-[45deg] translate-x-full border-r border-t border-b border-white/10`} />
                    <div className={`absolute top-0 left-0 w-full h-10 bg-white/5 origin-bottom skew-x-[45deg] -translate-y-full border-t border-l border-r border-white/10`} />

                </motion.a>
            ))}
        </div>
    );
};
