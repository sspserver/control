import type { ImageProps } from 'next/image';
import Image from 'next/image';

type LogoProps = Partial<ImageProps>;

function Logo({ src, alt, ...props }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="SSP Server"
      title="SSP Server"
      priority
      {...props}
    />
  );
}

export default Logo;
