import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { NftMarket } from "../context/context";
import ItemCard from "../components/item-card";
import { COLLECTION_TYPE } from "../enums";

const Collection = () => {
  const {
    isWallectConnected,
    listedItemsLoading,
    listedItems,
    soldItems,
    purchasedItems,
  } = useContext(NftMarket);
  const [collectionType, setCollectionType] = useState(
    COLLECTION_TYPE.LISTED.value
  );
  console.log(purchasedItems);
  // const [loading, setLoading] = useState(true);
  // const [listedItems, setListedItems] = useState(["1"]);
  // const [soldItems, setSoldItems] = useState(["2"]);

  // const loadListedItems = async () => {
  //   console.log("CALLED");

  //   //load all sold items that the user listed
  //   const itemCount = await marketplace?.itemCount();
  //   if (itemCount) {
  //     console.log(itemCount.toString(), "count");
  //   }
  //   let listedItems = [];
  //   console.log(listedItems, "LISTED");

  //   let soldItems = [];
  //   let items = [];
  //   for (let i = 1; i <= itemCount; i++) {
  // const item = await marketplace?.item(i);
  // console.log("ITEMSZZZZZZZZZZ");

  // if (item.seller.toLowerCase() === userAddress) {
  //   //get uri url from nft contract
  //   const uri = await nft.tokenURI(item.tokenId);
  //   //use uri to fetch the nft metadata stored on ipfs
  //   const response = await fetch(uri);
  //   const metadata = await response.json();
  //   //get total price of the item (item price + fee)
  //   const totalPrice = await marketplace.getTotalPrice(item.itemId);
  //   //define listed item object
  //   let item = {
  //     totalPrice,
  //     price: item.price,
  //     itemId: item.itemId,
  //     name: metadata.name,
  //     description: metadata.description,
  //     image: metadata.image,
  //   };
  //   console.log(item);
  //   listedItems.push(item);
  //   //Add listed item to sold items array if sold
  //   if (i.sold) soldItems.push(item);
  // }

  //     const item = await marketplace.items(i);
  //     console.log(item?.seller.toLowerCase());
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

  //   setLoading(false);
  //   setListedItems(items);
  //   // setListedItems(listedItems);
  //   // setSoldItems(soldItems);
  // };

  // useEffect(() => {
  //   loadListedItems();
  //   console.log("USEEFFECT WORKS");
  // }, []);

  // console.log(soldItems);
  // console.log(listedItems);
  // console.log(userAddress);
  // console.log(marketplace);
  // console.log(nft);
  console.log(collectionType);

  if (isWallectConnected) return <p> Connect wallet...</p>;

  if (listedItemsLoading) return <p> Loading...</p>;

  return (
    <>
      <div className="bg-grey min-h-screen pt-9 pb-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-3 mb-7">
            {Object.values(COLLECTION_TYPE).map((type, i) => {
              return (
                <button
                  key={i}
                  // className="rounded-3xl bg-lightGrey text-black border-navyBlue px-4 py-1 text-sm"
                  className={`${
                    type.value === collectionType
                      ? "bg-navyBlue text-white"
                      : "bg-lightGrey text-black"
                  } border-navyBlue px-4 py-1 text-sm rounded-3xl`}
                  onClick={() => setCollectionType(type.value)}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* collections display */}
          {COLLECTION_TYPE.LISTED.value === collectionType ? (
            <>
              <h1 className="font-bold text-3xl mb-5">Listed NFTs</h1>
              <div>
                {listedItems?.length > 0 ? (
                  <div className="grid grid-cols-4 gap-5">
                    {listedItems
                      ?.slice()
                      .reverse()
                      .map((item, i) => {
                        return <ItemCard key={i} item={item} />;
                      })}
                  </div>
                ) : (
                  <div>No listed assets </div>
                )}
              </div>
            </>
          ) : COLLECTION_TYPE.SOLD.value === collectionType ? (
            <>
              <h1 className="font-bold text-3xl mb-5">Sold NFTs</h1>

              <div>
                {soldItems.length > 0 ? (
                  <div className="grid grid-cols-4 gap-5">
                    {soldItems
                      .slice()
                      .reverse()
                      .map((item, i) => {
                        return (
                          <>
                            <ItemCard key={i} item={item} />
                          </>
                        );
                      })}
                  </div>
                ) : (
                  <div>You have not sold any NFTs yet</div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold text-3xl mb-5">Purchased NFTs</h1>

              <div>
                {purchasedItems.length > 0 ? (
                  <div className="grid grid-cols-4 gap-5">
                    {purchasedItems
                      .slice()
                      .reverse()
                      .map((item, i) => {
                        return (
                          <>
                            <ItemCard key={i} item={item} />
                          </>
                        );
                      })}
                  </div>
                ) : (
                  <div>You have not purchased any NFTs yet</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
