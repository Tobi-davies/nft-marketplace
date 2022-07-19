import { useContext, useState, useRef } from "react";
import { NftMarket } from "../context/context";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import * as yup from "yup";
import { Field, Formik } from "formik";

// const client = ipfsHttpClient('https://ipfs.infura.io.5001/api/v0');
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateNFT = () => {
  const inputFileRef = useRef(null);
  const {
    nft,
    marketplace,
    loadMarketPlaceItems,
    loadListedItems,
  } = useContext(NftMarket);
  const [formInfo, setFormInfo] = useState({
    // image: "",
    price: "",
    name: "",
    description: "",
  });
  const [image, setImage] = useState("");

  const resetFileInput = () => {
    inputFileRef.current.value = null;
    setImage("");
  };

  const {
    // image,
    price,
    // description,
    // name,
  } = formInfo;

  console.log(formInfo);

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        // setFormInfo({
        //   ...formInfo,
        //   image: `https://ipfs.infura.io/ipfs/${result.path}`,
        // });
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const handleCreateNft = async (
    { image, price, name, description },
    { resetForm }
  ) => {
    // resetForm({
    //   file: "",
    // });
    console.log(image, price, description, name);

    if (!image || !price || !name || !description) return;

    try {
      console.log(image, price, name, description);

      const result = await client.add(
        JSON.stringify({ image, name, description })
      );
      mintThenList(result, resetForm);
      console.log("kkkkkkk");
      // setFormInfo({
      //   price: "",
      //   name: "",
      //   description: "",
      // });
      // setImage("");
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result, resetForm) => {
    try {
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
      //mint nft
      await (await nft.mint(uri)).wait();
      //get tokenId of new nft
      const id = await nft.tokenCount();
      //approve marketplace to spend nft
      await (await nft.setApprovalForAll(marketplace.address, true)).wait();
      //add nft to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();

      console.log("yyyyyyy");

      resetForm();
      resetFileInput();
      loadMarketPlaceItems();
      loadListedItems();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(nft, marketplace);

  const formValidationSchema = yup.object().shape({
    name: yup.string().trim().required("name is required"),
    price: yup.number().required("price is required"),
    description: yup.string().trim().required("description is required"),
  });

  return (
    <>
      <div className="bg-grey pt-5 pb-10">
        <div className="max-w-2xl mx-auto border border-slate-300 rounded-md p-11 bg-white">
          {/* <div>lkjhgvcf</div> */}
          <Formik
            initialValues={formInfo}
            validationSchema={formValidationSchema}
            onSubmit={(values, resetForm) => {
              setFormInfo(values);
              const payload = {
                ...values,
                image: image,
              };
              handleCreateNft(payload, resetForm);
              console.log(payload);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name">Name</label>
                      <input
                        className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Enter NFT name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image">upload Image</label>
                      <input
                        ref={inputFileRef}
                        name="file"
                        type="file"
                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 file:rounded border border-slate-300 rounded-md  
    "
                        onChange={uploadToIPFS}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Description</label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-md border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        placeholder="Enter NFT description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price">Price</label>
                      <input
                        // className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Enter NFT price"
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                      />
                    </div>

                    {/* <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea> */}

                    <button
                      type="submit"
                      className="rounded-md bg-navyBlue text-white border-navyBlue px-9 py-1 text-sm flex justify-center w-40 ml-auto mt-4 py-2"
                    >
                      Create NFT
                    </button>
                  </form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateNFT;
