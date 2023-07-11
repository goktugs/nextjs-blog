import { IPosts, IResponse } from "@/types/types";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<IPosts[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/posts?limit=10")
      .then((res) => res.json() as Promise<IResponse>)
      .then((data) => {
        setData(data.posts);
        setLoading(false);
      });
  }, []);

  function getFakeImage() {
    return {
      image: faker.image.urlLoremFlickr(),
    };
  }

  const images = function (size: number) {
    const images = [];
    for (let index = 0; index < size; index++) {
      images.push(getFakeImage());
    }
    return images;
  };

  const allImages = images(10);

  console.log(allImages);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log(data);

  return (
    <>
      <Head>
        <title>Blog Case</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <div className="container mx-auto">
          <div className="flex flex-col gap-8">
            {data.map((item: IPosts, index) => (
              <div
                key={item.id}
                className="border p-4 rounded-md md:flex md:gap-8"
              >
                <div className=" relative w-full h-72 md:h-36 md:w-36 ">
                  <Image
                    alt={index.toString()}
                    src={allImages[index].image}
                    fill
                    objectFit="contain"
                  />
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