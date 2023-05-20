import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import SectionTitle from 'components/core/SectionTitle';
import CardImage from 'components/core/CardImage';

import ExcitingMusicData from '../../../../__mocks__/data/excitingMusicData.json';

import './styles.scss';

const ExcitingMusic = () => (
  <section className="mock-exciting-music">
    <SectionTitle title="Ngày Mới Hứng Khởi" />
    <section className="mock-exciting-music__cards">
      {ExcitingMusicData.map(music => (
        <section key={music.id} className="mock-exciting-music__card">
          <CardImage title={music.title} img={music.img} />
          <Link
            className="mock-exciting-music__card-title"
            to={`/${music.title}`}
          >
            {music.title}
          </Link>
          <h3 className="mock-exciting-music__card-description">
            {music.description}
          </h3>
        </section>
      ))}
    </section>
  </section>
);

ExcitingMusic.propTypes = {};

ExcitingMusic.defaultProps = {
  data: [],
};

export default memo(ExcitingMusic);
