import { createContext, useState, useEffect } from "react";
import MarketplaceAbi from "../src/frontend/contractsData/Marketplace.json";
import MarketplaceAddress from "../src/frontend/contractsData/Marketplace-address.json";
import NFTAbi from "../src/frontend/contractsData/NFT.json";
import NFTAddress from "../src/frontend/contractsData/NFT-address.json";
import { ethers } from "ethers";

export const NftMarket = createContext();

const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isWalletConnected, setWalletConnection] = useState(false);
  const [userAddress, setAddress] = useState("no address");
  const [marketplace, setMarketplace] = useState(null);
  const [nft, setNft] = useState(null);
  const [marketLoading, setMarketLoading] = useState(true);
  const [ethPrice, setEthPrice] = useState("");
  const [items, setItems] = useState([]);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [listedItemsLoading, setListedItemsLoading] = useState(true);

  const checkWalletConnection = async () => {
    try {
      //as long as withdow.ethereum is tru, there will be an account
      if (window.ethereum) {
        // console.log("present");

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setWalletConnection(true);
        setAddress(account);
        // if(account) {
        //   setWalletConnection(true)
        //   setAddress(account)
        // }

        provider();
      }
    } catch (err) {
      console.log(err);
      // alert("Ethereum client not detected2");
    }
  };

  const provider = async () => {
    try {
      //Get provider from metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //Get signer
      const signer = provider.getSigner();
      //Get deployed copies of contract
      const marketplace = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi.abi,
        signer
      );
      setMarketplace(marketplace);
      //Get NFT contract
      const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
      setNft(nft);
    } catch (err) {
      console.log(err);
      // alert(err);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    // console.log("check connect");
  }, [isWalletConnected]);

  const loadMarketPlaceItems = async () => {
    // console.log("called");
    const xyz = await marketplace?.getLatestPrice();
    setEthPrice(xyz);
    const itemCount = await marketplace?.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace?.items(i);
      if (!item.sold) {
        //get uri url from the nft contract
        const uri = await nft.tokenURI(item.tokenId);
        //use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        //get total price of item(item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        //Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }

    // value = await getETHPrice();

    setItems(items);
    setMarketLoading(false);
  };

  const loadListedItems = async () => {
    // const xyz = await marketplace?.getLatestPrice();
    // setEthPrice(xyz);
    const itemCount = await marketplace?.itemCount();
    let listedItems = [];
    let soldItems = [];
    let purchasedItems = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace?.items(i);
      console.log(item);

      if (item?.seller.toLowerCase() === userAddress) {
        //get uri url from the nft contract
        const uri = await nft.tokenURI(item.tokenId);
        //use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        //get total price of item(item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        //Add item to items array
        listedItems.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });

        if (item.sold)
          soldItems.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
          });
      }

      // if (item.buyer.toLowerCase() === userAddress) {
      //   //get uri url from the nft contract
      //   const uri = await nft.tokenURI(item.tokenId);
      //   //use uri to fetch the nft metadata stored on ipfs
      //   const response = await fetch(uri);
      //   const metadata = await response.json();
      //   //get total price of item(item price + fee)
      //   const totalPrice = await marketplace.getTotalPrice(item.itemId);
      //   //Add item to items array
      //   purchasedItems.push({
      //     totalPrice,
      //     itemId: item.itemId,
      //     seller: item.seller,
      //     name: metadata.name,
      //     description: metadata.description,
      //     image: metadata.image,
      //   });
      // }
    }

    //fetch purchased items from marketplace by querying offered events with the buy set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      userAddress
    );
    const results = await marketplace.queryFilter(filter);
    //fetch metadata of each nft and add that to listedItem object
    const purchases = await Promise.all(
      results.map(async (i) => {
        //fetch arguments from each result
        i = i.args;
        //get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        //use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        //get total price of the item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        //define the purchased item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );

    setPurchasedItems(purchases);

    setListedItems(listedItems);
    setSoldItems(soldItems);
    // setPurchasedItems(purchasedItems);
    setListedItemsLoading(false);
  };

  useEffect(() => {
    if (isWalletConnected) {
      loadMarketPlaceItems();
      loadListedItems();
    }
  }, [isWalletConnected]);

  // console.log(nft, "nft");
  // console.log(marketplace, "marketplace");
  console.log(items);
  console.log(listedItems);
  console.log(soldItems);
  console.log(purchasedItems);

  return (
    <NftMarket.Provider
      value={{
        loading,
        isWalletConnected,
        setWalletConnection,
        setAddress,
        userAddress,
        checkWalletConnection,
        nft,
        marketplace,
        items,
        marketLoading,
        ethPrice,
        loadMarketPlaceItems,
        listedItemsLoading,
        listedItems,
        soldItems,
        loadListedItems,
        purchasedItems,
      }}
    >
      {children}
    </NftMarket.Provider>
  );
};

export default Context;
