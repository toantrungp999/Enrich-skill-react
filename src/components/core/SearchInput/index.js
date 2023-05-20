import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import './styles.scss';

const SearchInput = ({ placeholder, options, onChange, onSearch }) => {
  const [hasValue, setHasValue] = useState(false);

  const handleChange = useCallback(event => {
    setHasValue(event.target.value !== '');
    onChange(event.target.value);
  }, []);

  const onClear = useCallback(() => {
    onChange('');
  }, []);

  const customStyle = useMemo(() => ({ width: 540, maxWidth: 540 }), []);

  return (
    <FormControl className="mock-search-input">
      <Autocomplete
        freeSolo
        id="mock-search-input"
        disableClearable
        options={options}
        placeholder={placeholder}
        sx={customStyle}
        renderInput={params => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              placeholder,
              className: 'mock-search-input__field',
              startAdornment: (
                <InputAdornment position="start" onClick={onSearch}>
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ display: hasValue ? 'flex' : 'none' }}
                  onClick={onClear}
                >
                  <ClearIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  placeholder: '',
  options: [],
  onChange() {},
  onSearch() {},
};

export default memo(SearchInput);
