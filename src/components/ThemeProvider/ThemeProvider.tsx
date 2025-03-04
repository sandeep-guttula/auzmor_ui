import React, { createContext, useContext, useEffect } from 'react';

type ThemeColors = {
  bg: string;
  fg: string;
  cardBg: string;
  cardFg: string;
  primaryBg: string;
  primaryFg: string;
  secondaryBg: string;
  secondaryFg: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
};

type ThemeSpacing = {
  unit: number; // base unit in pixels
  xs: number;   // extra small (relative to unit)
  sm: number;   // small (relative to unit)
  md: number;   // medium (relative to unit)
  lg: number;   // large (relative to unit)
  xl: number;   // extra large (relative to unit)
  xxl: number;  // extra extra large (relative to unit)
};

type ThemeTypography = {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    loose: string;
  };
};

type ThemeRadii = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
};

export type ThemeConfig = {
  colors: Partial<ThemeColors>;
  spacing: Partial<ThemeSpacing>;
  typography: Partial<ThemeTypography>;
  radii: Partial<ThemeRadii>;
  darkMode?: boolean;
};

// Default theme values
const defaultTheme: ThemeConfig = {
  colors: {
    bg: '#fffff',
    fg: '#0a0a0a',
    cardBg: '#ffffff',
    cardFg: '#0a0a0a',
    primaryBg: '#171717',
    primaryFg: '#fafafa',
    secondaryBg: '#f5f5f5',
    secondaryFg: '#171717',
    // muted: '210 40% 96.1%',
    // mutedForeground: '215.4 16.3% 46.9%',
    // accent: '210 40% 96.1%',
    // accentForeground: '222.2 47.4% 11.2%',
    // destructive: '0 84.2% 60.2%',
    // destructiveForeground: '210 40% 98%',
    // border: '214.3 31.8% 91.4%',
    // input: '214.3 31.8% 91.4%',
    // ring: '222.2 84% 4.9%',
  },
  spacing: {
    unit: 4,
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 4,
    xl: 6,
    xxl: 8,
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      loose: '1.75',
    },
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  darkMode: false,
};

// Create context
const ThemeContext = createContext<ThemeConfig>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

// Deep merge utility for merging theme configs
const deepMerge = (target: any, source: any): any => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};

function isObject(item: any): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

export interface ThemeProviderProps {
  theme?: Partial<ThemeConfig>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = {},
  children
}) => {
  const mergedTheme = deepMerge(defaultTheme, theme);

  useEffect(() => {
    if (mergedTheme.colors) {
      Object.entries(mergedTheme.colors).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        document.documentElement.style.setProperty(`--${cssKey}`, value as string);
      });
    }

    if (mergedTheme.spacing) {
      const { unit, ...spacingValues } = mergedTheme.spacing as any;
      if (unit) {
        document.documentElement.style.setProperty('--spacing-unit', `${unit}px`);
      }

      Object.entries(spacingValues).forEach(([key, value]) => {
        const spacingValue = typeof value === 'number' ? `${value * (mergedTheme.spacing?.unit || 4)}px` : value;
        document.documentElement.style.setProperty(`--spacing-${key}`, spacingValue as string);
      });
    }

    if (mergedTheme.typography) {
      if (mergedTheme.typography.fontFamily) {
        document.documentElement.style.setProperty('--font-family', mergedTheme.typography.fontFamily);
      }

      if (mergedTheme.typography.fontSize) {
        Object.entries(mergedTheme.typography.fontSize).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--font-size-${key}`, value as string);
        });
      }

      if (mergedTheme.typography.fontWeight) {
        Object.entries(mergedTheme.typography.fontWeight).forEach(([key, value]: any) => {
          document.documentElement.style.setProperty(`--font-weight-${key}`, value.toString());
        });
      }

      if (mergedTheme.typography.lineHeight) {
        Object.entries(mergedTheme.typography.lineHeight).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--line-height-${key}`, value as string);
        });
      }
    }

    if (mergedTheme.radii) {
      Object.entries(mergedTheme.radii).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--radius-${key}`, value as string);
      });
    }

    if (mergedTheme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {

    };
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
