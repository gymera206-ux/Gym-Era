import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryStripProps {
  images: GalleryImage[];
}

export default function GalleryStrip({ images }: GalleryStripProps) {
  const allItems = [...images, ...images];

  return (
    <section className="gallery-strip" aria-label="Action gallery">
      <div className="gallery-row">
        {allItems.map((img, i) => (
          <div className="gallery-item" key={i}>
            <Image src={img.src} alt={img.alt} width={500} height={500} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
