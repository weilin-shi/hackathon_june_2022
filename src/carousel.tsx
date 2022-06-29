import ImageGallery from "react-image-gallery";

interface props {
  images: string[];
}

function Carousel({ images }: props) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="endcard">
      <ImageGallery
        items={images.map((i) => ({ original: i }))}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets
      />
    </div>
  );
}

export default Carousel;
