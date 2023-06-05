import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
//HOOKS
import UseCard from "../hooks/useCard";
const search = {
  summary:
    "Harrison Chase is a machine learning engineer at Robust Intelligence with a background in sports, machine learning, software engineering, and statistics. He graduated from Harvard University in 2017.",
  facts: [
    "Harrison has worked as a machine learning engineer at both Kensho Technologies and Robust Intelligence",
    "He is active on Linkedin, where he shares and encages with posts related to Al and machine learning",
  ],
  interest: [
    "Sports analysis and machine learning",
    "Latest developments in natural language processing",
    "Applications of AI in the insurance industry",
  ],
};
export default function Home() {
  const router = useRouter();
  const [init, setInit] = useState(false);
  const { magicSearch, loading } = UseCard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInit(true);
    }, 2000);

    return () => clearTimeout(timer); // this clears the timer if the component is unmounted within 5 seconds
  }, []);

  if ((loading, !init))
    return (
      <main className="max-w-md mx-auto border flex flex-col items-center justify-center h-[100vh]">
        <svg
          className="animate-spin h-24 w-24  self-center mr-2 text-[#F6800A]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          enableBackground="new 0 0 40 40"
          xml="preserve"
        >
          <path
            opacity="0.2"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z" />
        </svg>
      </main>
    );
  return (
    <main className="max-w-md mx-auto border">
      <div className="w-full flex flex-col items-center">
        <div className="mt-4 mb-2  w-full grid grid-cols-3 items-between">
          <button type="button" onClick={() => router.back()}>
            <ChevronLeftIcon className="ml-1  h-8 w-8 text-gray-800" />
          </button>

          <p className="px-4 text-lg font-medium  col-span-2 text-[#F6800A] ">
            Magic Search
          </p>
        </div>
        <form
          onSubmit={handleSubmit(magicSearch)}
          id="price"
          className="flex flex-col items-center gap-2 px-4  mb-4 pb-2 border-b border-gray-300"
        >
          <p className="text-sm text-gray-600">
            Input a full name and a city to scrape the internet for details
            about them.
          </p>
          <div
            className={`${
              errors.search ? "border-red-600 " : "border-gray-300 "
            }   rounded-md border p-2 bg-white shadow-sm focus-within:border-indigo-600  w-full  focus-within:ring-1 focus-within:ring-indigo-600 `}
          >
            <input
              type="text"
              placeholder="Ahmed Al Amawi, Victoria"
              className={`block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0  focus:outline-none sm:text-lg`}
              {...register("search", {
                required: `Please enter a search term`,
              })}
            />
          </div>
          <div className="w-max">
            <button
              type="submit"
              form="price"
              className="text-lg bg-[#F6800A] hover:bg-white text-white  hover:text-[#F6800A]  text-center relative px-7 py-3.5 border border-[#F6800A]  hover:bg-softWhite rounded-lg leading-none flex justify-center items-center divide-x divide-gray-600"
            >
              <span className="pb-[0.09rem] transition duration-200 ">
                Magic Search
              </span>
            </button>
          </div>
        </form>
        <img
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-32 w-32 rounded-full "
        />
        <h1 className="font-semibold  text-2xl">Ahmed Al Amawi</h1>
        <div className="w-full flex flex-col  px-6">
          <p className="text-start font-medium">Summary</p>
          <p className="text-gray-700 mb-2 text-sm">{search.summary}</p>
          <p className="text-start font-medium">Interesting Facts</p>
          <ul className="text-gray-700  mb-2 list-disc px-4  text-sm">
            {search.facts.map((entry, index) => (
              <li key={index}> {entry}</li>
            ))}
          </ul>
          <p className="text-start font-medium">Topics of Interest</p>
          <ul className="text-gray-700  mb-2 list-disc px-4  text-sm">
            {search.interest.map((entry, index) => (
              <li key={index}> {entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
