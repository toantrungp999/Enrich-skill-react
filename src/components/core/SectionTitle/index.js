import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const SectionTitle = ({ title, discoveryLink, discoveryLabel }) => (
  <h3 className="mock-section-title">
    {title}
    {discoveryLink && discoveryLabel && (
      <Link className="mock-section-title__discover-link" to={discoveryLink}>
        {discoveryLabel}
      </Link>
    )}
  </h3>
);

SectionTitle.propTypes = {
  title: PropTypes.string,
  discoveryLink: PropTypes.string,
  discoveryLabel: PropTypes.string,
};

SectionTitle.defaultProps = {
  title: '',
  discoveryLink: '',
  discoveryLabel: '',
};

export default memo(SectionTitle);
