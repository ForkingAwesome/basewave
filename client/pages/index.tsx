import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Head>
        <title>BaseWave</title>
        <meta content="BaseWave" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <ConnectButton />
        <h1 className="text-4xl">
          Welcome to <a href="">BaseWave</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
