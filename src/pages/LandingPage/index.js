import React, { memo } from 'react';

import GallerySection from 'components/layout/GallerySection';
import NewRelease from 'components/layout/NewRelease';
import ExcitingMusic from 'components/layout/ExcitingMusic';

import './styles.scss';

const LandingPage = () => (
  <div className="mock-landing-page">
    <GallerySection />
    <NewRelease />
    <ExcitingMusic />
  </div>
);

LandingPage.propTypes = {};

export default memo(LandingPage);
