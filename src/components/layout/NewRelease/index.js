import React, { memo } from 'react';

import SectionTitle from 'components/core/SectionTitle';
import ButtonTabs from 'components/core/ButtonTabs';
import ListMedia from '../ListMedia';

import ListMediaData from '../../../../__mocks__/data/listMediaData.json';
import ListAlbumData from '../../../../__mocks__/data/listAlbumData.json';

import './styles.scss';

const tabs = [
  {
    id: '227c36c8-4e35-4086-8d8b-48386b19570d',
    title: 'Bài hát',
    content: <ListMedia data={ListMediaData} />,
  },
  {
    id: '67d71d62-79e7-4d85-b956-92b12abee5de',
    title: 'Album',
    content: <ListMedia data={ListAlbumData} />,
  },
];

const NewRelease = () => (
  <section className="mock-new-release">
    <SectionTitle
      title="Mới Phát Hành"
      discoveryLabel="Tất cả"
      discoveryLink="/new-release/album"
    />
    <ButtonTabs tabs={tabs} />
  </section>
);

export default memo(NewRelease);
