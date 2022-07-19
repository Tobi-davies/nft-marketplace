import { ethers } from "ethers";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white px-3 pt-3 rounded-md">
      <div
        className="h-40 border border-slate-300 rounded-xl mb-1 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(
                          ${item.image}
                        )`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="p-2">
        <p className="font-bold text-black">{item.name}</p>
        <p>{item.description}</p>

        <div className="flex justify-between"></div>
        <div className="flex justify-between border-t-2 border-slate-100 pt-1 mt-1">
          <p>Price</p>
          <p>{ethers.utils.formatEther(item.totalPrice)} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
