import React from 'react';
import { motion } from 'framer-motion';
import { PhotoCard } from './PhotoCard';
import { Searchlight } from './Searchlight';
import { SpecSheet } from './SpecSheet';

// Temporary Mock Data
const MOCK_PHOTOS = [
    { id: '1', title: 'McLaren Senna', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-2' },
    { id: '2', title: 'Porsche 911 GT3', image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
    { id: '3', title: 'Nissan GTR', image: 'https://images.unsplash.com/photo-1611566026373-c6c85447dbdc?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
    { id: '4', title: 'Ferrari F40', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-2' },
    { id: '5', title: 'Lamborghini Huracan', image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
    { id: '6', title: 'Toyota Supra', image: 'https://images.unsplash.com/photo-1621687827582-74852928c035?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-1' },
    { id: '7', title: 'BMW M4', image: 'https://images.unsplash.com/photo-1618485278142-6467365c1979?q=80&w=1000&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const BentoGrid: React.FC = () => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const selectedPhoto = MOCK_PHOTOS.find(p => p.id === selectedId) || null;

    return (
        <>
            <Searchlight />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] max-w-7xl mx-auto p-4"
            >
                {MOCK_PHOTOS.map((photo) => (
                    <motion.div
                        key={photo.id}
                        variants={item}
                        className={photo.span}
                        onClick={() => setSelectedId(photo.id)}
                    >
                        <PhotoCard
                            id={photo.id}
                            title={photo.title}
                            image={photo.image}
                            span="w-full h-full cursor-pointer"
                        />
                    </motion.div>
                ))}
            </motion.div>

            <SpecSheet
                isOpen={!!selectedId}
                onClose={() => setSelectedId(null)}
                photo={selectedPhoto}
            />
        </>
    );
};
