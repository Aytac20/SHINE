import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" aria-label="Homepage" className="flex items-center gap-1">
      <div className="relative w-17 h-5 lg:w-20 lg:h-6">
        <Image
          src="/shine.png"
          alt="SHINE logo"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="(min-width: 1024px) 96px, 80px"
        />
      </div>
    </Link>
  );
};

export default Logo;
