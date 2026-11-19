import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface StarBorderBaseProps {
  children: ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
  className?: string;
  innerClassName?: string;
}

type StarBorderButtonProps = StarBorderBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type StarBorderAnchorProps = StarBorderBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

export type StarBorderProps = StarBorderButtonProps | StarBorderAnchorProps;

export function StarBorder({
  as = 'button',
  children,
  color = '#F04E00',
  speed = '5.5s',
  thickness = 2,
  className = '',
  innerClassName = '',
  ...rest
}: StarBorderProps) {
  const starTracks = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute w-[300%] h-[55%] opacity-80 -bottom-[12px] -right-[250%] rounded-full z-0 animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 14%)`,
          animationDuration: speed,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute w-[300%] h-[55%] opacity-80 -top-[12px] -left-[250%] rounded-full z-0 animate-star-movement-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 14%)`,
          animationDuration: speed,
        }}
      />
    </>
  );

  if (as === 'a') {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorProps}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#141414]/15 dark:bg-white/18 cursor-pointer ${className}`}
        style={{ padding: `${thickness}px` }}
      >
        {starTracks}
        <span
          className={`relative z-10 w-full h-full rounded-full inline-flex items-center justify-center ${innerClassName}`}
        >
          {children}
        </span>
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? 'button'}
      {...buttonProps}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#141414]/15 dark:bg-white/18 cursor-pointer ${className}`}
      style={{ padding: `${thickness}px` }}
    >
      {starTracks}
      <span
        className={`relative z-10 w-full h-full rounded-full inline-flex items-center justify-center ${innerClassName}`}
      >
        {children}
      </span>
    </button>
  );
}
