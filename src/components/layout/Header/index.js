import React, { memo, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useUser from 'hooks/useUser';

import { stringAvatar } from 'helper/string';

import SearchInput from 'components/core/SearchInput';

import useLogin from 'hooks/useLogin';

import './styles.scss';

const SEARCH_OPTIONS = ['Có chơi', 'Kỳ vọng', 'Shut down'];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const { userInfo } = useUser();
  const { onLogout } = useLogin();

  const onHandleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onHandleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const avatarProps = userInfo.data?.name && stringAvatar(userInfo.data?.name);

  const avatarMenuOptions = useMemo(
    () => [
      {
        id: 1,
        label: 'Trang cá nhân',
        onclick() {
          history.push('/profile');
        },
      },
      {
        id: 2,
        label: 'Đăng xuất',
        onclick() {
          onHandleClose();
          onLogout();
        },
      },
    ],
    [onHandleClose, onLogout],
  );

  return (
    <div className="mock-header">
      <SearchInput
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        options={SEARCH_OPTIONS}
      />
      {avatarProps && (
        <Avatar sx={avatarProps.sx} onClick={onHandleClick}>
          {avatarProps.children}
        </Avatar>
      )}
      <Menu
        id="profile-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onHandleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {avatarMenuOptions.map(item => (
          <MenuItem key={item.id} onClick={item.onclick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default memo(Header);
