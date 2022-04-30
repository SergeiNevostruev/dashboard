import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import style from './ProductViewPage.module.scss';

type SliderPropType = {
  images: ReactImageGalleryItem[];
};

const Slider = ({ images }: SliderPropType) => {
  return (
    <ImageGallery
      items={images}
      autoPlay={true}
      showIndex={false}
      showBullets={false}
      infinite={false}
      showThumbnails={true}
      showFullscreenButton={false}
      disableSwipe={true}
      // useTranslate3D={true}
      // showGalleryFullscreenButton={true}
      showPlayButton={false}
      // showGalleryPlayButton={false}
      showNav={false}
      isRTL={false}
      slideDuration={450}
      slideInterval={2000}
      slideOnThumbnailOver={true}
      thumbnailPosition={'bottom'}
      // showVideo={false}
      // useWindowKeyDown={false}
      additionalClass={style.slider}
      // thumbnailClass={style.slider}
    />
  );
};

export default Slider;
