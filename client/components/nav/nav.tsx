import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <div className="w-full fixed bg-transparent flex items-center justify-center p-4">
      <div className="flex space-x-8 items-center">
      <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="cursor-pointer rounded-md shadow-md transition-transform duration-200 transform hover:scale-105"
          />{" "}
        </Link>
        <Link
          href="/subscriptions"
          className="transition-all duration-200 hover:underline hover:scale-95"
        >
          Subscriptions
        </Link>
        <Link
          href="/dashboard"
          className="transition-all duration-200 hover:underline hover:scale-95"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Nav;
