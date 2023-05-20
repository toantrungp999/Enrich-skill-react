import React, { memo } from 'react';

import CustomSlick from 'components/core/CustomSlick';

import GalleryData from '../../../../__mocks__/data/galleryData.json';

import './styles.scss';

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 720,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const GallerySection = () => (
  <section className="mock-gallery-section">
    <CustomSlick responsive={responsive}>
      {GalleryData.map(item => (
        <img
          className="mock-gallery-section__card"
          key={item.id}
          alt={item.title}
          src={item.img}
        />
      ))}
    </CustomSlick>
  </section>
);

GallerySection.propTypes = {};

export default memo(GallerySection);
