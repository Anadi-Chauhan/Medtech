'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { image: "/1.jpg", alt: 'Error 404' },
  { image: "/2.jpg", alt: 'Error 404' },
  { image: "/3.jpg", alt: 'Error 404' }
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[52rem] ml-16 h-[30rem]  overflow-hidden -z-10  rounded-xl">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          alt={image.alt}
          fill
          className={`${index === currentImageIndex
              ? 'absolute inset-0 animation-move-left-right'
              : 'z-0 opacity-0 scale-110 -translate-x-4 -rotate-6'}
          `}
        />
      ))}
    </div>
  );
}
