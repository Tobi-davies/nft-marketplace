import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { NftMarket } from "../context/context";
// import Header from "../components/header";
import { ethers } from "ethers";
// import { getETHPrice } from "../src/utils/getEthPrice.js";

const Market = () => {
  // let value;
  const {
    marketplace,
    items,
    marketLoading,
    ethPrice,
    isWalletConnected,
  } = useContext(NftMarket);
  // const [loading, setLoading] = useState(true);
  // const [items, setItems] = useState([]);
  // const [ethPrice, setEthPrice] = useState("");
  // const loadMarketPlaceItems = async () => {
  //   console.log("called");
  //   const xyz = await marketplace?.getLatestPrice();
  //   setEthPrice(xyz);
  //   const itemCount = await marketplace?.itemCount();
  //   let items = [];
  //   for (let i = 1; i <= itemCount; i++) {
  //     const item = await marketplace.items(i);
  //     if (!item.sold) {
  //       //get uri url from the nft contract
  //       const uri = await nft.tokenURI(item.tokenId);
  //       //use uri to fetch the nft metadata stored on ipfs
  //       const response = await fetch(uri);
  //       const metadata = await response.json();
  //       //get total price of item(item price + fee)
  //       const totalPrice = await marketplace.getTotalPrice(item.itemId);
  //       //Add item to items array
  //       items.push({
  //         totalPrice,
  //         itemId: item.itemId,
  //         seller: item.seller,
  //         name: metadata.name,
  //         description: metadata.description,
  //         image: metadata.image,
  //       });
  //     }
  //   }

  //   // value = await getETHPrice();

  //   setItems(items);
  //   setLoading(false);
  // };

  //buy
  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();

    // loadMarketPlaceItems();
  };

  // useEffect(() => {
  //   loadMarketPlaceItems();
  // }, []);

  console.log(items);

  // let value = await getETHPrice();

  console.log(ethPrice);

  if (!isWalletConnected) {
    return <p>Connect wallet...</p>;
  }

  if (marketLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Header /> */}
      <div className="bg-grey min-h-screen pt-9 pb-8">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="font-bold text-3xl mb-5">
            DISCOVER MORE NFTS
            {/* {ethPrice?.toString()} */}
          </h1>

          <div className="flex items-start justify-between mb-5">
            <div className="flex flex-wrap gap-2">
              <button className="rounded-3xl bg-navyBlue text-white border-navyBlue px-4 py-1 text-sm">
                All Categories
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Arts
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Celebrities
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Gaming
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Sports
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Music
              </button>
              <button className="rounded-3xl bg-lightGrey text-black px-4 py-1 text-sm">
                Crypto
              </button>
            </div>
            <div className="flex items-center ml-4">
              <button className="rounded-3xl bg-navyBlue text-white border-navyBlue px-4 py-1 text-sm">
                All filters
              </button>
            </div>
          </div>
          {items?.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {items
                ?.slice()
                .reverse()
                .map((item, i) => {
                  // let usdValue = Number(item.totalPrice * value).toFixed(2);
                  return (
                    <div key={i} className="bg-white px-3 pt-3 rounded-md">
                      <div
                        className="h-40 border border-slate-300 rounded-xl mb-1 bg-no-repeat bg-center"
                        // style="background-image: url(`${item.image}`)"
                        // style="background-image: url(item.image)"
                        // style="background-image: url('https://ipfs.infura.io/ipfs/QmRNYENxcPTxbp6cy8X7QjijFtkETVpLDHaZE6YKUfxtY3')"
                        style={{
                          // backgroundImage: `url(
                          //   "https://ipfs.infura.io/ipfs/QmRNYENxcPTxbp6cy8X7QjijFtkETVpLDHaZE6YKUfxtY3"
                          // )`,
                          backgroundImage: `url(
                          ${item.image}
                        )`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      >
                        {/* <img
                        // src={item.image}
                        src="https://ipfs.infura.io/ipfs/QmRNYENxcPTxbp6cy8X7QjijFtkETVpLDHaZE6YKUfxtY3"
                        alt="kljh"
                        width="100%"
                        height="100%"
                      /> */}
                      </div>
                      <div className="p-2">
                        <p className="font-bold text-black">{item.name}</p>
                        <p>{item.description}</p>
                        {/* <p>{item.totalPrice.toString()}</p> */}
                        <div className="flex justify-between">
                          {/* <p className="text-green">Price</p>
                          <p className="text-green">100</p> */}
                        </div>
                        <div className="flex justify-between">
                          <p> Price</p>
                          <p>{ethers.utils.formatEther(item.totalPrice)} ETH</p>
                        </div>
                        {/* <p>{usdValue}</p> */}
                        <div className="border border-slate-100 my-1"></div>
                        <button
                          className="w-full rounded-md bg-navyBlue text-white border-navyBlue px-1 py-1 text-sm flex justify-center py-2 mt-2 my-1"
                          onClick={() => buyMarketItem(item)}
                        >
                          Buy NFT
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>No listed assets </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Market;
