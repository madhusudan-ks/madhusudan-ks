import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './appTitle.module.scss';
import { useThemeContext } from '../../../../context/ThemeContext';

const AppTitle: React.FC = () => {
  const { mode } = useThemeContext();

  const logoUrl = mode === 'dark'
    ? import.meta.env.VITE_API_TITLE_LOGO_DARK_URL
    : import.meta.env.VITE_API_TITLE_LOGO_LIGHT_URL;
  return (
    <Button component={Link} to="/" className={styles.logoButton}>
      <img
        src={logoUrl}
        alt="DevSpace Logo"
        className={styles.logoImage}
      />
    </Button>
  );
};

export default AppTitle;
