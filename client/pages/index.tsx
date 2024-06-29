import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import Nav from "../components/nav/nav";
import hero from "../assets/hero.png";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-50 to-white">
        <Head>
          <title>BaseWave</title>
          <meta content="BaseWave" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <main className="w-full flex items-center justify-center px-8">
          <div className="space-y-6 w-[600px] flex flex-col">
            <h1 className="text-5xl font-bold">
              Welcome to{" "}
              <a href="" className="italic font-serif underline">
                BaseWave
              </a>
            </h1>
            <p className="text-xl text-gray-700">
              OnChain Recurring Payments Made Simpler.
            </p>
            <div className="flex flex-col items-center gap-4">
              <ConnectButton />
              <Link href="/create-subscription">
                <div className="bg-[#0f76fd] z-20 p-2 rounded-xl shadow-md text-white font-semibold cursor-pointer">
                  Create Subscription
                </div>
              </Link>
            </div>
          </div>
          <div className="w-1/2 h-screen flex justify-center items-center">
            <Image
              src={hero}
              alt="Landing Page Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
