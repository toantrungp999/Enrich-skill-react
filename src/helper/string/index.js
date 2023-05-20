function stringToColor(str) {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export const stringAvatar = name => ({
  sx: {
    bgcolor: stringToColor(name),
    width: 32,
    height: 32,
    fontSize: 12,
    cursor: 'pointer',
  },
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});
