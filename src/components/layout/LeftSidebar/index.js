import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { MAIN_PAGES, OTHERS_PAGES } from 'constants/pages';
import { AUTH_STATUS } from 'constants/apis';

import { authenticatedSelector } from 'slices/user';

import './styles.scss';

const LeftSidebar = () => {
  const authenticated = useSelector(authenticatedSelector);

  return (
    <aside className="mock-left-sidebar">
      <nav className="mock-left-sidebar__brand">
        <Button
          component={Link}
          className="mock-left-sidebar__brand-logo-btn"
        />
      </nav>
      <div className="mock-left-sidebar__wrapper">
        <nav className="mock-left-sidebar__main">
          <ul className="mock-left-sidebar__menu">
            {MAIN_PAGES.map(page => (
              <li key={page.id} className="mock-left-sidebar__menu-item">
                <Button component={Link}>
                  <page.icon />
                  <span>{page.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mock-left-sidebar__divide" />
        <nav className="mock-left-sidebar__main">
          <ul className="mock-left-sidebar__menu">
            {OTHERS_PAGES.map(page => (
              <li key={page.id} className="mock-left-sidebar__menu-item">
                <Button component={Link}>
                  <page.icon />
                  <span>{page.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {authenticated === AUTH_STATUS.LOGOUT && (
          <section className="mock-left-sidebar__login-card">
            <p>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
            <Button component={Link} to="/sign-in" variant="outlined">
              Đăng Nhập
            </Button>
          </section>
        )}
      </div>
    </aside>
  );
};

export default memo(LeftSidebar);
