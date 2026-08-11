import { forwardRef, type ReactNode } from 'react';
import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// Import SCSS to make CSS custom properties available globally
import './appButton.scss';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline';

export interface AppButtonProps extends Omit<ButtonProps, 'variant'> {
  children: ReactNode;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  to?: string;
}

// Styled button component using CSS custom properties from SCSS
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'appVariant',
})<{ appVariant: AppButtonVariant }>(({ appVariant }) => {
  const baseStyles = {
    padding: `var(--app-button-padding-y) var(--app-button-padding-x)`,
    borderRadius: `var(--app-button-radius)`,
    fontWeight: 600,
    lineHeight: 1.1,
    textTransform: 'none' as const,
    transition: `var(--app-button-transition)`,
    gap: `var(--app-button-gap)`,
    '&:disabled': {
      opacity: 1,
      cursor: 'not-allowed',
    },
  };

  switch (appVariant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: `var(--app-button-accent)`,
        color: `var(--app-button-white)`,
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: `color-mix(in srgb, var(--app-button-accent) 85%, black)`,
        },
        '&:disabled': {
          ...baseStyles['&:disabled'],
          backgroundColor: `color-mix(in srgb, var(--app-button-text) 15%, transparent)`,
          color: `color-mix(in srgb, var(--app-button-text) 50%, transparent)`,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 3px color-mix(in srgb, var(--app-button-accent) 45%, transparent)`,
        },
      };

    case 'secondary':
      return {
        ...baseStyles,
        backgroundColor: `var(--app-button-secondary)`,
        color: `var(--app-button-primary)`,
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: `var(--app-button-secondary-darken)`,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 3px color-mix(in srgb, var(--app-button-secondary) 45%, transparent)`,
        },
      };

    case 'outline':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        border: `1px solid var(--app-button-accent)`,
        color: `var(--app-button-accent)`,
        '&:hover': {
          backgroundColor: `color-mix(in srgb, var(--app-button-accent) 10%, transparent)`,
          borderColor: `var(--app-button-accent)`,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 3px color-mix(in srgb, var(--app-button-accent) 25%, transparent)`,
        },
      };

    default:
      return baseStyles;
  }
});

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  startIcon,
  endIcon,
  className,
  ...otherProps
}, ref) => {
  return (
    <StyledButton
      ref={ref}
      appVariant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
});

AppButton.displayName = 'AppButton';

export default AppButton;
