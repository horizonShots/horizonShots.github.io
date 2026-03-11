import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (or wait for window load event)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5s "revving" time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed inset-0 z-[100] bg-asphalt flex flex-col items-center justify-center"
                >
                    {/* Tachometer Ring */}
                    <div className="relative w-64 h-64 rounded-full border-4 border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                        {/* Ticks */}
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-3 bg-white/20 origin-bottom`}
                                style={{
                                    transform: `rotate(${i * 9 - 135}deg) translateY(-110px)`,
                                    backgroundColor: i > 30 ? '#ccff00' : 'rgba(255,255,255,0.2)'
                                }}
                            />
                        ))}

                        {/* Needle */}
                        <motion.div
                            initial={{ rotate: -135 }}
                            animate={{ rotate: [-135, 0, -45, 135] }}
                            transition={{ duration: 2, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
                            className="absolute w-1 h-28 bg-acid origin-bottom bottom-1/2 left-1/2 -ml-0.5 shadow-[0_0_10px_#ccff00]"
                        />

                        {/* Center Hub */}
                        <div className="absolute w-4 h-4 bg-white rounded-full z-10" />

                        {/* RPM Text */}
                        <div className="absolute bottom-16 font-mono text-2xl text-white font-bold">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                8000
                            </motion.span>
                            <span className="text-xs text-titanium ml-1">RPM</span>
                        </div>

                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 font-display text-titanium tracking-widest animate-pulse"
                    >
                        INITIALIZING SYSTEMS...
                    </motion.p>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
