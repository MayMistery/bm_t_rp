import React from 'react';
import { Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';

const SearchBar = React.memo(({ value, onChange, placeholder = "Search Models..." }) => {
  const handleSearch = (value) => {
    onChange(value);
  };

  return (
    <Input 
      prefix={<IconSearch />}
      placeholder={placeholder}
      value={value}
      onChange={handleSearch}
      style={{ width: 250 }}
      aria-label="Search models"
      showClear
    />
  );
});

SearchBar.displayName = 'SearchBar';
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBar;