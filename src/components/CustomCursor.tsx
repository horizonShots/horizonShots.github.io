import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Hide default cursor
    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => { document.body.style.cursor = 'auto'; };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            {/* Reticle Ring */}
            <motion.div
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0
                }}
                className="w-8 h-8 border border-acid rounded-full flex items-center justify-center"
            >
                {/* Center Dot */}
                <div className="w-1 h-1 bg-acid rounded-full" />
            </motion.div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-[-8px] w-2 h-px bg-acid opacity-50" />
            <div className="absolute top-1/2 right-[-8px] w-2 h-px bg-acid opacity-50" />
            <div className="absolute left-1/2 top-[-8px] w-px h-2 bg-acid opacity-50" />
            <div className="absolute left-1/2 bottom-[-8px] w-px h-2 bg-acid opacity-50" />

        </motion.div>
    );
};
