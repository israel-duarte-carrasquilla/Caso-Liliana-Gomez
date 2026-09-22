import React from 'react';

interface FirmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'monogram' | 'compact';
  theme?: 'dark' | 'light';
}

export const FirmLogo: React.FC<FirmLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#FFFFFF' : '#14233C';
  const accentColor = isDark ? '#E2E8F0' : '#334155';
  const dividerColor = isDark ? '#94A3B8' : '#14233C';

  // Responsive scale sizes
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} id="firm-monogram-icon">
        <svg
          width={48 * scale}
          height={48 * scale}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Square outline */}
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            stroke={primaryColor}
            strokeWidth="2.8"
            fill="none"
          />
          {/* Vertical dividing line */}
          <line
            x1="56"
            y1="4"
            x2="56"
            y2="96"
            stroke={dividerColor}
            strokeWidth="2.8"
          />
          {/* Letters D and B in high-contrast serif */}
          <text
            x="24"
            y="44"
            fontFamily="'Cormorant Garamond', 'Times New Roman', Georgia, serif"
            fontSize="32"
            fontWeight="700"
            fill={primaryColor}
          >
            D
          </text>
          <text
            x="24"
            y="76"
            fontFamily="'Cormorant Garamond', 'Times New Roman', Georgia, serif"
            fontSize="32"
            fontWeight="700"
            fill={primaryColor}
          >
            B
          </text>
          {/* 1962 rotated */}
          <text
            x="76"
            y="30"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="2.5"
            fill={primaryColor}
            transform="rotate(90, 76, 30)"
          >
            1962
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none ${className}`} id="firm-full-logo">
      {/* Monogram Box on the Right or Left based on original orientation */}
      <div className="flex flex-col text-right leading-tight">
        <span
          className="font-semibold tracking-[0.08em] uppercase text-xs sm:text-sm md:text-base font-sans"
          style={{ color: primaryColor }}
        >
          Luz Karime Beetar de Devis
        </span>
        <span
          className="text-[11px] sm:text-xs tracking-wider uppercase font-medium mt-0.5"
          style={{ color: accentColor }}
        >
          Abogada Especialista en Familia
        </span>
        <span
          className="text-[10px] sm:text-[11px] tracking-wide mt-0.5 font-normal opacity-90 hidden sm:block"
          style={{ color: accentColor }}
        >
          devisbeetar@outlook.com • +57 (315) 7547997
        </span>
        <span
          className="text-[9px] sm:text-[10px] tracking-wider opacity-80 uppercase hidden md:block"
          style={{ color: accentColor }}
        >
          Barranquilla D.E.I.P. – Colombia
        </span>
      </div>

      {/* Decorative vertical separator */}
      <div className="h-10 sm:h-12 w-[1px] bg-slate-300 mx-1 hidden xs:block" />

      {/* Vector Box: D B 1962 */}
      <div className="flex-shrink-0">
        <svg
          width={46 * scale}
          height={52 * scale}
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Square outline */}
          <rect
            x="10"
            y="14"
            width="80"
            height="82"
            stroke={primaryColor}
            strokeWidth="3"
            fill="none"
          />
          {/* Vertical dividing line protruding */}
          <line
            x1="58"
            y1="5"
            x2="58"
            y2="105"
            stroke={dividerColor}
            strokeWidth="2.8"
          />
          {/* Letters D and B */}
          <text
            x="20"
            y="48"
            fontFamily="'Cormorant Garamond', 'Times New Roman', Georgia, serif"
            fontSize="36"
            fontWeight="700"
            fill={primaryColor}
          >
            D
          </text>
          <text
            x="20"
            y="84"
            fontFamily="'Cormorant Garamond', 'Times New Roman', Georgia, serif"
            fontSize="36"
            fontWeight="700"
            fill={primaryColor}
          >
            B
          </text>
          {/* 1962 rotated */}
          <text
            x="79"
            y="32"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="600"
            letterSpacing="3"
            fill={primaryColor}
            transform="rotate(90, 79, 32)"
          >
            1962
          </text>
        </svg>
      </div>
    </div>
  );
};
