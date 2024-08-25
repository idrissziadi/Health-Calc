import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    
  palette: {
    primary: {
      main: '#78c2ad', // Primary color
    },
    secondary: {
      main: '#f3969a', // Secondary color
    },
    success: {
      main: '#56cc9d', // Success color
    },
    info: {
      main: '#6cc3d5', // Info color
    },
    warning: {
      main: '#ffce67', // Warning color
    },
    danger: {
      main: '#ff7851', // Danger color
    },
    light: {
      main: '#f8f9fa', // Light color
    },
    dark: {
      main: '#343a40', // Dark color
    },
    background: {
      default: '#fff', // Background color
    },
    text: {
      primary: '#888', // Body text color
    },
  },
  typography: {
    fontFamily: '"Andika", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4, // Default border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Matches Bootstrap's .4rem
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          color: '#fff', // Pagination color
        },
        ul: {
          backgroundColor: '#78c2ad', // Pagination background
          borderColor: '#78c2ad',
        },
        // Add other overrides if needed
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Similar to Bootstrap alert radius
        },
      },
    },
    // Add other component overrides here
  },
});

export default theme;
