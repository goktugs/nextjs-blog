import { IPosts, IResponse } from "@/types/types";
import { Inter } from "next/font/google";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<IPosts[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [images, setImages] = useState<{ image: string }[]>();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/posts?limit=10")
      .then((res) => res.json() as Promise<IResponse>)
      .then((data) => {
        setData(data.posts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const images = function (size: number) {
      const images: { image: string }[] = [];
      for (let index = 0; index < size; index++) {
        images.push(getFakeImage());
      }
      return images;
    };

    const allImages = images(10);

    setImages(allImages);
  }, []);

  function getFakeImage() {
    return {
      image: faker.image.urlLoremFlickr(),
    };
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredData = searchInput
    ? data?.filter((item) => item.body.includes(searchInput))
    : data;

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <Head>
        <title>Blog Case</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <div className="container mx-auto">
          <div className="my-4 px-8 ">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
                onChange={handleSearch}
                value={searchInput}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {filteredData?.map((item: IPosts, index) => (
              <div
                key={item.id}
                className="border p-4 rounded-md md:flex md:gap-8"
              >
                <div className=" relative w-full h-72 md:h-36 md:w-36 ">
                  {images && (
                    <Image
                      alt={index.toString()}
                      src={images[index].image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="mt-2 md:mt-0">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-500">{item.body}</p>
                  <div className="w-full flex justify-between mt-4 md:mt-2">
                    <span className="text-sm text-slate-300 ">
                      Published 2 days ago * 5 min read * 8 comments
                    </span>
                    <button className="text-sm text-green-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
    </>
  );
}
