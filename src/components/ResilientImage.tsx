import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

function resolveAssetUrl(src: string): string {
  if (!src || /^(https?:|data:|blob:)/.test(src)) {
    return src;
  }
  const base = import.meta.env.BASE_URL || '/';
  if (src.startsWith('/') && base !== '/') {
    return `${base.replace(/\/$/, '')}${src}`;
  }
  return src;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveAssetUrl(src);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-silver-brushed text-[#141414] p-6 text-center select-none ${className}`}
      >
        <ImageOff className="w-6 h-6 text-[#52525B] mb-2" strokeWidth={1.5} />
        <span className="font-mono text-xs tracking-tight text-[#52525B]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      draggable={false}
    />
  );
}
