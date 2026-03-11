import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { createPortal } from 'react-dom';

export const Searchlight: React.FC = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    // Only render on client
    if (typeof document === 'undefined') return null;

    return createPortal(
        <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-soft-light"
            style={{
                background: "transparent"
            }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-radial-gradient from-white/20 to-transparent blur-3xl"
                style={{
                    left: mouseX,
                    top: mouseY,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)"
                }}
            />
        </motion.div>,
        document.body
    );
};
