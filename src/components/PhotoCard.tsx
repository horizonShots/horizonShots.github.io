import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSound } from '../hooks/useSound';

interface PhotoCardProps {
    id: string;
    image: string;
    title: string;
    span?: string; // e.g., "col-span-1 row-span-1"
    className?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ id, image, title, span = "col-span-1 row-span-1", className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { playHover, playClick } = useSound();

    // Motion values for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return to center
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform mouse position to rotation degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]); // Inverted for natural tilt
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

    // Glow effect position
    const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to card center (-0.5 to 0.5)
        const mouseXRel = (e.clientX - rect.left) / width - 0.5;
        const mouseYRel = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseXRel);
        y.set(mouseYRel);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        playHover();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            layoutId={`card-${id}`}
            className={twMerge(
                "relative group perspective-1000 z-10",
                span,
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={playClick}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative rounded-xl overflow-hidden border border-white/10 bg-asphalt shadow-2xl transition-colors duration-300 group-hover:border-acid/50"
            >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Layer (Floating above) */}
                <div
                    className="absolute bottom-0 left-0 w-full p-4 z-20 translate-z-10"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <h3 className="font-display text-white text-lg uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {title}
                    </h3>
                    <div className="h-0.5 w-0 bg-acid group-hover:w-full transition-all duration-500 delay-100" />
                </div>

                {/* Searchlight / Sheen Effect */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                    style={{
                        background: useTransform(
                            [glowX, glowY],
                            ([latestX, latestY]) => `radial-gradient(circle at ${latestX} ${latestY}, rgba(255,255,255,0.3) 0%, transparent 60%)`
                        )
                    }}
                />

                {/* HUD Corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            </motion.div>
        </motion.div>
    );
};
