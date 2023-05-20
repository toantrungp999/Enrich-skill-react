import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import './styles.scss';

const ListMedia = ({ data }) => (
  <section className="mock-list-media">
    {data.map(media => (
      <article key={media.id} className="mock-list-media__media">
        <section className="mock-list-media__media-content">
          <section className="mock-list-media__media-left">
            <img alt={media.title} src={media.img} />
            <PlayArrowIcon className="mock-list-media__play-icon" />
          </section>
          <section className="mock-list-media__media-right">
            <div className="mock-list-media__media-title">{media.title}</div>
            <div className="mock-list-media__media-author">
              {media.authors.map(author => (
                <a key={author} href={author}>
                  {author}
                </a>
              ))}
            </div>
            <div className="mock-list-media__media-release">
              {media.createdAt}
            </div>
          </section>
        </section>
      </article>
    ))}
  </section>
);

ListMedia.propTypes = {
  data: PropTypes.array,
};

ListMedia.defaultProps = {
  data: [],
};

export default memo(ListMedia);
