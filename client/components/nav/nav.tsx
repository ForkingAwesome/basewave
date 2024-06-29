import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <div className="w-full fixed bg-black flex items-center justify-center p-4">
      <div className="flex space-x-8 items-center">
        <Link href="/" className="text-white  bg-opacity-20 px-4 py-2 rounded transition-all duration-200 hover:bg-opacity-30">
          Home
        </Link>
        <Link
          href="/subscriptions"
          className="text-white  bg-opacity-20 px-4 py-2 rounded transition-all duration-200 hover:bg-opacity-30"
        >
          Subscriptions
        </Link>
        <Link
          href="/dashboard"
          className="text-white  bg-opacity-20 px-4 py-2 rounded transition-all duration-200 hover:bg-opacity-30"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Nav;