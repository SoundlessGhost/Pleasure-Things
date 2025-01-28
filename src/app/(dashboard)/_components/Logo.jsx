import React from "react";
import Image from "next/image";

const Logo = () => {
  return <Image src="/profile.jpg" className="rounded-full" width={40} height={40} alt="logo" />;
};

export default Logo;
