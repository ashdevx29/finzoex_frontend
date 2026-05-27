import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const countries = [
  'USA',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  // Add more countries as needed
];

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="country-select-label">Select Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={selectedCountry}
        onChange={handleChange}
        label="Select Country"
      >
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;
