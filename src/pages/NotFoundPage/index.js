import React, { memo } from 'react';

import './styles.scss';

const NotFoundPage = () => (
  <div className="mock-not-found-page">
    <h1>Not found page</h1>
  </div>
);

NotFoundPage.propTypes = {};

export default memo(NotFoundPage);
