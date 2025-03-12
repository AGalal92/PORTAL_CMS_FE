// theme.js
export const theme = {
  // Colors: Core and specific element colors
  colors: {
    // Primary branding color
    primary: '#81a3bb ', 

    // Secondary branding color
    secondary: '#00152e',

    // Tertiary branding color
    tertiary: '#f5faff',

    //odd background color

    //even background color

    // Backgrounds
    background: {
      light: '#f5faff', 
      dark: '#111827',  
    },

    // Card backgrounds
    card: {
      light: '#ffff', 
      dark: '#1f2937',  
    },

    // Text colors for different elements
    text: {
      default: {
        light: '#000000', // black
        dark: '#ffffff',  // white
      },
      muted: { // small headers
        light: '#69a1bb', // gray-600
        dark: '#d1d5db',  // gray-300
      },
      words: { // small headers
        light: '#063B7C', // gray-600
        dark: '#d1d5db',  // gray-300
      },
      heading: {
        light: '#002249', // black
        dark: '#ffffff',  // white
      },
      subheading: {
        light: '#002249', // yellow-500
        dark: '#002249',  // yellow-500
      },
      overlay: { // text p
        light: '#00152e', // white (for overlay text)
        dark: '#ffffff',  // white
      },
    },

    // Overlay background
    overlay: {
      background: 'rgba(0, 0, 0, 0.6)', // Black overlay with 60% opacity
    },

    whiteBg: {
      light: '#ffffff', // white
      dark: '#ffffff',  // white
    },

    // Border colors
    border: {
      light: '#9ca3af', // gray-400
      dark: '#374151',  // gray-700
    },
  },

  // Border radius options
  borderRadius: {
    small: '8px',
    medium: '0px',
    large: '40px',
  },

  // Shadows
  shadows: {
    none: 'none',
    default: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // Transitions
  transitions: {
    default: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
};

// Function to apply theme variables to the root element
export const applyTheme = () => {
  const root = document.documentElement;
  const isDark = localStorage.getItem('darkMode') === 'true';

  // Colors
  root.style.setProperty('--primary-color', theme.colors.primary);
  root.style.setProperty('--secondary-color', theme.colors.secondary);
  root.style.setProperty('--tertiary-color', theme.colors.tertiary);
  root.style.setProperty('--bg-white-color', theme.colors.whiteBg.light);


  root.style.setProperty('--odd-bg-color', theme.colors.odd);
  root.style.setProperty('--even-bg-color', theme.colors.even);
  root.style.setProperty('--bg-color', isDark ? theme.colors.background.dark : theme.colors.background.light);
  root.style.setProperty('--card-bg', isDark ? theme.colors.card.dark : theme.colors.card.light);
  root.style.setProperty('--text-default-color', isDark ? theme.colors.text.default.dark : theme.colors.text.default.light);
  root.style.setProperty('--text-muted-color', isDark ? theme.colors.text.muted.dark : theme.colors.text.muted.light);
  root.style.setProperty('--text-heading-color', isDark ? theme.colors.text.heading.dark : theme.colors.text.heading.light);
  root.style.setProperty('--text-subheading-color', isDark ? theme.colors.text.subheading.dark : theme.colors.text.subheading.light);
  root.style.setProperty('--text-words-color', isDark ? theme.colors.text.words.dark : theme.colors.text.words.light);
  
  root.style.setProperty('--text-overlay-color', isDark ? theme.colors.text.overlay.dark : theme.colors.text.overlay.light);
  root.style.setProperty('--overlay-bg', theme.colors.overlay.background);
  root.style.setProperty('--border-color', isDark ? theme.colors.border.dark : theme.colors.border.light);

  // Border radius
  root.style.setProperty('--border-radius-sm', theme.borderRadius.small);
  root.style.setProperty('--border-radius-md', theme.borderRadius.medium);
  root.style.setProperty('--border-radius-lg', theme.borderRadius.large);

  // Shadows
  root.style.setProperty('--shadow-default', theme.shadows.default);
  root.style.setProperty('--shadow-hover', theme.shadows.hover);

  // Transitions
  root.style.setProperty('--transition-default', theme.transitions.default);
  root.style.setProperty('--transition-slow', theme.transitions.slow);
};