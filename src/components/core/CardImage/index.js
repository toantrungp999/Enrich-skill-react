import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './styles.scss';

const CardImage = ({ title, img }) => (
  <section className="mock-card-image">
    <img alt={title} src={img} />
    <section className="mock-card-image__actions">
      <FavoriteBorderIcon />
      <PlayCircleOutlineIcon />
      <MoreHorizIcon />
    </section>
  </section>
);

CardImage.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
};

CardImage.defaultProps = {
  title: '',
  img: '',
};
export default memo(CardImage);
