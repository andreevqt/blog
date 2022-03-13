import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  lighten,
  darken,
  alpha,
  generatePalletteItem
} from './utils'

const purple = '#764abc';
const blue = '#007bff';
const gray100 = '#212529';
const gray200 = '#6c757d';
const gray300 = '#565c67';
const green = '#3bb33b';
const red = '#ff3347';
const white = '#fff';

const defaultTheme = {
  colors: {
    primary: generatePalletteItem(purple),
    secondary: generatePalletteItem(white),
    success: generatePalletteItem(green),
    danger: generatePalletteItem(red),
  },

  bodyColor: gray100,
  mutedColor: gray200,

  container: {
    maxWidth: 1200
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  },

  grid: {
    gutter: 20,
    columns: 12
  }
};

const Theme = ({
  children
}) => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider >
);

export default Theme;
