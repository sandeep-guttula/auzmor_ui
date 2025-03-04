import React, { useEffect } from "react";

type DesignSystemColors = {
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

type DesignSystemSpacing = {
  unit: number; // base unit in pixels
  xs: number;   // extra small (relative to unit)
  sm: number;   // small (relative to unit)
  md: number;   // medium (relative to unit)
  lg: number;   // large (relative to unit)
  xl: number;   // extra large (relative to unit)
  xxl: number;  // extra extra large (relative to unit)
};

type DesignSystemTypography = {
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

type DesignSystemRadii = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
};

export type DesignSystemConfig = {
  colors: Partial<DesignSystemColors>;
  spacing: Partial<DesignSystemSpacing>;
  typography: Partial<DesignSystemTypography>;
  radii: Partial<DesignSystemRadii>;
  darkMode?: boolean;
};

// Default theme values
const defaultTheme: DesignSystemConfig = {
  colors: {
    bg: "#ffffff",
    fg: "#0a0a0a",
    cardBg: "#ffffff",
    cardFg: "#0a0a0a",
    primaryBg: "#171717",
    primaryFg: "#fafafa",
    secondaryBg: "#f5f5f5",
    secondaryFg: "#171717",
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
    fontFamily: "system-ui, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      loose: "1.75",
    },
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
  darkMode: false,
};

// Deep merge utility for merging theme configs
const deepMerge = (target: any, source: any): any => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
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
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

export interface DesignSystemProviderProps {
  theme?: Partial<DesignSystemConfig>;
  children: React.ReactNode;
  className?: string;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  theme = {},
  children,
  className,
}) => {
  const mergedTheme = deepMerge(defaultTheme, theme);

  useEffect(() => {
    // Inject colors as CSS variables
    if (mergedTheme.colors) {
      Object.entries(mergedTheme.colors).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        document.documentElement.style.setProperty(`--${cssKey}`, value as string);
      });
    }

    // Inject spacing as CSS variables
    if (mergedTheme.spacing) {
      const { unit, ...spacingValues } = mergedTheme.spacing as any;
      if (unit) {
        document.documentElement.style.setProperty("--spacing-unit", `${unit}px`);
      }

      Object.entries(spacingValues).forEach(([key, value]) => {
        const spacingValue =
          typeof value === "number" ? `${value * (mergedTheme.spacing?.unit || 4)}px` : value;
        document.documentElement.style.setProperty(`--spacing-${key}`, spacingValue as string);
      });
    }

    // Inject typography as CSS variables
    if (mergedTheme.typography) {
      if (mergedTheme.typography.fontFamily) {
        document.documentElement.style.setProperty(
          "--font-family",
          mergedTheme.typography.fontFamily
        );
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

    // Inject radii as CSS variables
    if (mergedTheme.radii) {
      Object.entries(mergedTheme.radii).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--radius-${key}`, value as string);
      });
    }

    // Toggle dark mode
    if (mergedTheme.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Cleanup function (optional, removes styles if component unmounts)
    return () => {
      if (mergedTheme.colors) {
        Object.keys(mergedTheme.colors).forEach((key) => {
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          document.documentElement.style.removeProperty(`--${cssKey}`);
        });
      }
      if (mergedTheme.spacing) {
        const { unit, ...spacingValues } = mergedTheme.spacing as any;
        document.documentElement.style.removeProperty("--spacing-unit");
        Object.keys(spacingValues).forEach((key) =>
          document.documentElement.style.removeProperty(`--spacing-${key}`)
        );
      }
      if (mergedTheme.typography) {
        document.documentElement.style.removeProperty("--font-family");
        if (mergedTheme.typography.fontSize) {
          Object.keys(mergedTheme.typography.fontSize).forEach((key) =>
            document.documentElement.style.removeProperty(`--font-size-${key}`)
          );
        }
        if (mergedTheme.typography.fontWeight) {
          Object.keys(mergedTheme.typography.fontWeight).forEach((key) =>
            document.documentElement.style.removeProperty(`--font-weight-${key}`)
          );
        }
        if (mergedTheme.typography.lineHeight) {
          Object.keys(mergedTheme.typography.lineHeight).forEach((key) =>
            document.documentElement.style.removeProperty(`--line-height-${key}`)
          );
        }
      }
      if (mergedTheme.radii) {
        Object.keys(mergedTheme.radii).forEach((key) =>
          document.documentElement.style.removeProperty(`--radius-${key}`)
        );
      }
      document.documentElement.classList.remove("dark");
    };
  }, [mergedTheme]);

  return (
    <div className={`min-h-screen ${className || ""}`} style={{ fontFamily: "var(--font-family)" }}>
      {children}
    </div>
  );
};

// Export the ThemeConfig type and defaultTheme for external use if needed
export { defaultTheme };