import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HOTSPOTS = [
    { id: 'h1', x: 200, y: 150, label: 'FESTIVAL SITE' },
    { id: 'h2', x: 500, y: 300, label: 'THE WILDS' },
    { id: 'h3', x: 300, y: 450, label: 'NEON DISTRICT' },
];

export const MapExplorer: React.FC = () => {
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState({ x: 0, y: 0 });
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    const handleHotspotClick = (id: string, x: number, y: number) => {
        setActiveHotspot(id);
        setZoom(3);
        setCenter({ x: -x + 400, y: -y + 300 }); // Center the hotspot (assuming 800x600 container)
    };

    const resetMap = () => {
        setActiveHotspot(null);
        setZoom(1);
        setCenter({ x: 0, y: 0 });
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-asphalt flex items-center justify-center">

            {/* Map Container */}
            <motion.div
                animate={{ scale: zoom, x: center.x, y: center.y }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative w-[800px] h-[600px] border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm"
            >
                {/* Grid Lines (Decorative) */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none">
                    {[...Array(48)].map((_, i) => (
                        <div key={i} className="border border-white/5" />
                    ))}
                </div>

                {/* SVG Map Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                    <path d="M100,100 Q400,50 600,200 T700,500" fill="none" stroke="#00f3ff" strokeWidth="2" />
                    <path d="M50,300 Q200,400 300,200 T500,100" fill="none" stroke="#ccff00" strokeWidth="2" />
                    <circle cx="400" cy="300" r="150" fill="none" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
                </svg>

                {/* Hotspots */}
                {HOTSPOTS.map((hotspot) => (
                    <motion.button
                        key={hotspot.id}
                        onClick={() => handleHotspotClick(hotspot.id, hotspot.x, hotspot.y)}
                        className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center group"
                        style={{ left: hotspot.x, top: hotspot.y }}
                    >
                        <span className="absolute w-full h-full bg-acid rounded-full animate-ping opacity-50" />
                        <span className="relative w-3 h-3 bg-acid rounded-full shadow-[0_0_10px_#ccff00]" />

                        {/* Label */}
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-xs text-acid opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded">
                            {hotspot.label}
                        </span>
                    </motion.button>
                ))}

            </motion.div>

            {/* UI Controls */}
            <div className="absolute bottom-12 left-12 font-mono text-sm text-titanium space-y-2">
                <p>ZOOM: {zoom.toFixed(1)}x</p>
                <p>LOC: {activeHotspot ? activeHotspot.toUpperCase() : 'GLOBAL_VIEW'}</p>
                {activeHotspot && (
                    <button onClick={resetMap} className="text-acid hover:text-white underline">
                        [RESET VIEW]
                    </button>
                )}
            </div>

        </div>
    );
};
