const Footer = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto py-3 px-8">
        <div className="flex justify-between pt-3 pb-7">
          <div className="w-4/12">
            <span className="font-bold text-2xl text-black">NFTER</span>
            <p className="text-sm mb-4 w-[85%]">
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
          </div>
          <div className="w-2/12">
            <span className="block mb-3 font-bold text-[15px]">
              Market Place
            </span>
            <ul className="flex flex-col gap-1">
              <li className="text-sm">All NFTs</li>
              <li className="text-sm">New</li>
              <li className="text-sm">Art </li>
              <li className="text-sm">Sports</li>
              <li className="text-sm">Utility</li>
              <li className="text-sm">Music</li>
            </ul>
          </div>
          <div className="w-2/12">
            <span className="block mb-3 font-bold text-[15px]">My Account</span>
            <ul className="flex flex-col gap-1">
              <li className="text-sm">Profile</li>
              <li className="text-sm">Favorite</li>
              <li className="text-sm">MyCollections </li>
              <li className="text-sm">Settings</li>
            </ul>
          </div>
          <div className="w-4/12">
            <span className="block mb-3 font-bold text-[15px]">
              Stay In The Loop
            </span>
            <p className="text-sm mb-4">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating NFTs.
            </p>
            <div className="relative">
              <input
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-3xl py-3 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter your email address"
                type="text"
              />
              <button className="absolute top-[13%] right-0 mr-1 rounded-3xl bg-[#2639ED] text-white border-navyBlue  text-sm w-36 py-2">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        <div className="text-center border-t-2 border-300-[#A4A4A4] pt-2 text-[#A4A4A4] text-sm">
          Copyright © 2022 Avi Yansah
        </div>
      </div>
    </div>
  );
};

export default Footer;
