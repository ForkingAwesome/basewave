import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import Nav from "../components/nav/nav";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-black text-white">
        <Head>
          <title>BaseWave</title>
          <meta content="BaseWave" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <main className="w-full flex flex-col items-center justify-center px-8 text-center">
          <div className="mb-8">
            <Image src={logo} alt="BaseWave Logo" width={100} height={100} />
          </div>
          <div className="space-y-6 max-w-[600px] flex flex-col items-center">
            <h1 className="text-6xl font-bold">
              Ride the Future of Payments with Base Wave
            </h1>
            <p className="text-xl text-gray-300">
              Frictionless, Decentralized Recurring Payments for the Digital Age
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ConnectButton />
              <Link href="/create-subscription">
                <div className="bg-blue-500 bg-opacity-50 z-20 px-4 py-2 rounded-xl shadow-md text-white font-semibold cursor-pointer hover:bg-opacity-70 transition-all duration-200">
                  Create Subscription
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;