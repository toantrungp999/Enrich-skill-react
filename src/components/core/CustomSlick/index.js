import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import './styles.scss';

const CustomSlick = ({
  arrows,
  variableWidth,
  slidesToShow,
  slidesToScroll,
  className,
  responsive,
  children,
  onSetSlider,
}) => (
  <div className="mock-custom-slick">
    <Slider
      ref={onSetSlider}
      arrows={arrows}
      dots={false}
      infinite
      autoplay
      variableWidth={variableWidth}
      speed={500}
      initialSlide={0}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      className={className}
      responsive={responsive}
    >
      {children}
    </Slider>
  </div>
);

CustomSlick.propTypes = {
  arrows: PropTypes.bool,
  variableWidth: PropTypes.bool,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  className: PropTypes.string,
  responsive: PropTypes.array,
  children: PropTypes.node,
  onSetSlider: PropTypes.func,
};

CustomSlick.defaultProps = {
  arrows: true,
  variableWidth: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  className: '',
  responsive: null,
  children: <div />,
  onSetSlider() {},
};

export default memo(CustomSlick);
