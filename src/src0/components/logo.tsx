import Image from 'next/image';
import MyCustomLogo from './TT-logo.png'; // Assuming logo.tsx and TT-logo.png are in the same folder

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <Image
      src={MyCustomLogo}
      alt="Logo"
      width={iconOnly ? 48 : 155}
      height={iconOnly ? 26 : 28}
      {...props}
    />
  );
}
