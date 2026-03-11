import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecSheetProps {
    isOpen: boolean;
    onClose: () => void;
    photo: {
        id: string;
        title: string;
        image: string;
    } | null;
}

export const SpecSheet: React.FC<SpecSheetProps> = ({ isOpen, onClose, photo }) => {
    return (
        <AnimatePresence>
            {isOpen && photo && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-asphalt/90 border-l border-white/10 z-50 p-8 overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-display text-2xl text-white uppercase">{photo.title}</h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Image Preview (Small) */}
                        <div className="mb-8 rounded-lg overflow-hidden border border-white/10">
                            <img src={photo.image} alt={photo.title} className="w-full h-48 object-cover" />
                        </div>

                        {/* Data Grid */}
                        <div className="space-y-6 font-mono text-sm">
                            <div className="border-b border-white/10 pb-4">
                                <p className="text-titanium mb-1">LOCATION</p>
                                <p className="text-acid">EDINBURGH, UK</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-titanium mb-1">SHUTTER</p>
                                    <p className="text-white">1/8000s</p>
                                </div>
                                <div>
                                    <p className="text-titanium mb-1">APERTURE</p>
                                    <p className="text-white">f/1.8</p>
                                </div>
                                <div>
                                    <p className="text-titanium mb-1">ISO</p>
                                    <p className="text-white">100</p>
                                </div>
                                <div>
                                    <p className="text-titanium mb-1">FORMAT</p>
                                    <p className="text-white">RAW</p>
                                </div>
                            </div>

                            <div className="border-b border-white/10 pb-4">
                                <p className="text-titanium mb-1">CAMERA</p>
                                <p className="text-cyan">DRONE MODE V2</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8">
                            <button className="w-full py-4 bg-acid text-black font-bold font-display uppercase tracking-wider hover:bg-white transition-colors">
                                Download 4K
                            </button>
                        </div>

                        {/* Decorative Graph */}
                        <div className="mt-12 opacity-50">
                            <div className="flex items-end space-x-1 h-16">
                                {[40, 70, 30, 80, 50, 90, 20, 60, 40, 80].map((h, i) => (
                                    <div key={i} className="flex-1 bg-cyan" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <p className="text-xs text-cyan mt-2 text-right">TELEMETRY_DATA_STREAM</p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
