import { useForm } from "react-hook-form";
import { NextSeo } from "next-seo";
import { createSEOPageConfig } from "../..//utils/seo";
import { configSet } from "../../lib/pageConfig";
import Link from "next/link";
import { PlusIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

//HOOKS
import UseCard from "../../hooks/useCard";
const cards = [
  {
    src: "/contacts.svg",
    name: "Contact",
    link: "data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AN:Al Amawi;Ahmed;;;%0ATEL;TYPE=CELL:+16476872780%0AEMAIL:ahmed@jackrabbitops.com%0AEND:VCARD",
  },
  {
    src: "/safari.svg",
    name: "Website",
    link: "https://www.jackrabbitops.com/",
  },
  {
    src: "/linkedin.svg",
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ahmed-al-amawi/",
  },
  {
    src: "/mail.svg",
    name: "Email",
    link: "mailto:ahmed@jackrabbitops.com",
  },
  // {
  //   src: "/message.svg",
  //   name: "Number",
  //   link: "sms:+6476872780",
  // },
];
export default function Home() {
  const { magicSearch } = UseCard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <main className="max-w-md mx-auto ">
      <NextSeo {...createSEOPageConfig(configSet.landing)} />
      <div className="flex flex-row  justify-between items-center px-4 mt-4">
        <p className="font-bold">Scale YYJ</p>
        <Link
          href="/"
          className="border border-black text-black h-min px-6 py-2 rounded-lg text-sm hover:bg-black hover:text-gray-50"
        >
          <p className="text-sm">See Events</p>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-2 mx-4 rounded-xl my-4 bg-black shadow-lg ">
          <img
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="rounded-l-xl "
          />
          <div className="flex flex-col justify-center text-gray-50 p-4">
            <h1 className="font-semibold  text-3xl">Ahmed Al Amawi</h1>
            <p className="text-sm text-slate-400">Founder @</p>
            <p className="text-sm  text-slate-400 mt-0 ">Jackrabbit Ops </p>
          </div>
        </div>
        <div className="grid grid-cols-1  w-full px-4">
          <a
            href={cards[0].link}
            className="shadow-lg flex flex-row gap-2 items-center justify-center border border-[#F6800A] hover:text-[#F6800A]  px-6 py-2 rounded-lg text-lg w-full text-center bg-[#F6800A] hover:bg-white text-gray-50"
          >
            <PlusIcon className="h-5 w-5  text-auto" />
            Add to Contact
          </a>
        </div>
      </div>
      <div className="flex flex-row flex-wrap  justify-center gap-8 mt-6 px-6">
        {cards.map((card, index) => (
          <a
            href={card.link}
            key={index}
            className="flex flex-col items-center"
          >
            <img src={card.src} className="h-14 w-14 " />
            <p className="text-sm text-gray-700 mt-1">{card.name}</p>
          </a>
        ))}
      </div>
      <div className="border rounded-lg m-4 my-6 p-2">
        <p className=" mt-1 text-xl font-semibold text-black  tracking-tighter">
          Break the Ice with <span className="text-[#F6800A]">AI</span>
        </p>
        <p className="text-sm  text-gray-700">
          We&apos;ll look up Ahmed Al Amawi for you.
        </p>
        <div className="w-full flex flex-col items-center justify-center my-3 mt-3">
          <button
            type="submit"
            form="price"
            className=" w-full flex flex-row justify-center items-center gap-2 text-base bg-black hover:bg-white text-white  hover:text-black px-7 py-2 border border-black  hover:bg-softWhite rounded-lg "
          >
            <RocketLaunchIcon className="h-6 w-6" />
            Launch AI Helper
          </button>
        </div>
      </div>
      {/* <form
        onSubmit={handleSubmit(magicSearch)}
        id="price"
        className="flex flex-col items-center gap-2 px-4  mb-6"
      >
        <div className="w-max">
          <button
            type="submit"
            form="price"
            className="text-lg bg-[#F6800A] hover:bg-white text-white  hover:text-[#F6800A]  text-center relative px-7 py-3.5 border border-[#F6800A]  hover:bg-softWhite rounded-lg leading-none flex justify-center items-center divide-x divide-gray-600"
          >
            <span className="pb-[0.09rem] transition duration-200 ">
              Get Latest Fun Facts
            </span>
          </button>
        </div>
      </form> */}
    </main>
  );
}
