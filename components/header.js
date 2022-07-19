import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NftMarket } from "../context/context";

const Header = () => {
  const {
    loading,
    isWalletConnected,
    setWalletConnection,
    setAddress,
    userAddress,
    checkWalletConnection,
  } = useContext(NftMarket);

  console.log(loading, isWalletConnected, userAddress);

  return (
    <div className="border-b-2 border-slate-100">
      <div
        className="flex items-center justify-between max-w-6xl mx-auto py-3 px-8"
        // style={{ border: "1px solid red" }}
      >
        <Link href="/">
          <a>
            <span className="text-navyBlue text-2xl font-medium">NFTERS</span>
          </a>
        </Link>

        <div>
          <ul className="flex gap-6">
            <li>
              <Link href="#">
                <a>About</a>
              </Link>
            </li>
            <li className="">
              <Link href="/market">
                <a>Marketplace</a>
              </Link>
            </li>

            <li className="">
              <Link href="/collection">
                <a>Collection</a>
              </Link>
            </li>
            <li>Resources</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <button className="rounded-3xl bg-navyBlue text-white border-navyBlue px-9 py-1 text-sm">
            <Link href="/create">
              <a>Upload</a>
            </Link>
          </button>
          <button
            className="rounded-3xl border-2 text-navyBlue border-navyBlue px-4 py-1 text-sm"
            onClick={checkWalletConnection}
          >
            {isWalletConnected === true ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
