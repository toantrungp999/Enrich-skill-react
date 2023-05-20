import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ButtonTabs = ({ tabs }) => {
  const [tabActive, setTabActive] = useState(0);

  return (
    <section className="mock-button-tabs">
      <section className="mock-button-tabs__tab-select">
        {tabs.map((tab, index) => (
          <button
            type="button"
            className={`mock-button-tabs__tab-btn ${
              index === tabActive ? 'mock-button-tabs__tab-btn--active' : ''
            }`}
            key={tab.id}
            onClick={() => {
              setTabActive(index);
            }}
          >
            {tab.title}
          </button>
        ))}
      </section>
      <section className="mock-button-tabs__tab-content">
        {tabs && tabs[tabActive].content}
      </section>
    </section>
  );
};

ButtonTabs.propTypes = {
  tabs: PropTypes.array,
};

ButtonTabs.defaultProps = {
  tabs: [],
};

export default memo(ButtonTabs);
