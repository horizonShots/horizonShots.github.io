import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollyTelling: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Background Opacity Transforms
    const opacityGarage = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const opacityCity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const opacityDesert = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

    // Text Parallax
    const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-asphalt">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                {/* Background Layers */}
                <motion.div
                    style={{ opacity: opacityGarage }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"
                >
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                <motion.div
                    style={{ opacity: opacityCity }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"
                >
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                <motion.div
                    style={{ opacity: opacityDesert }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"
                >
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                {/* Scrolling Text (Behind Car) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <motion.div style={{ y: yText }} className="text-center">
                        <h2 className="text-[15vw] font-display font-bold text-white/10 leading-none">
                            GARAGE
                        </h2>
                        <h2 className="text-[15vw] font-display font-bold text-white/10 leading-none mt-[80vh]">
                            NEON CITY
                        </h2>
                        <h2 className="text-[15vw] font-display font-bold text-white/10 leading-none mt-[80vh]">
                            WASTELAND
                        </h2>
                    </motion.div>
                </div>

                {/* Sticky Car Image (Foreground) */}
                <div className="relative z-20 w-full max-w-4xl px-4">
                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop"
                        alt="Hero Car"
                        className="w-full h-auto drop-shadow-2xl"
                    />
                </div>

                {/* Overlay HUD Data */}
                <div className="absolute bottom-10 left-10 z-30 font-mono text-xs text-acid">
                    <p>ENV.SYNC: ACTIVE</p>
                    <p>LOC: SECTOR 7G</p>
                </div>

            </div>
        </div>
    );
};
