import { useForm } from "react-hook-form";
import { NextSeo } from "next-seo";
import { createSEOPageConfig } from "../..//utils/seo";
import { configSet } from "../../lib/pageConfig";
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
    <main className="max-w-md mx-auto border">
      <NextSeo {...createSEOPageConfig(configSet.landing)} />
      <div className="w-full flex flex-col items-center">
        <div className="h-36 w-full">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            className="h-36 w-full object-cover opacity-80"
          />
        </div>
        <img
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-40 w-40 rounded-full -translate-y-24"
        />
        <h1 className="font-semibold -mt-20 text-2xl">Ahmed Al Amawi</h1>
        <p className="text-lg">CTO at Jackrabbit Ops</p>
        <a
          href={cards[0].link}
          className="bg-gray-900 w-2/3 px-8 py-4 rounded-full text-center text-white hover:bg-gray-800 mt-2 text-2xl"
        >
          Save Contact
        </a>
      </div>
      <div className="flex flex-row flex-wrap  justify-center gap-8 mt-10 px-6">
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
      <p className="mt-4 border-t pt-2 px-4 text-lg font-medium text-[#F6800A] ">
        Magic Search
      </p>
      <form
        onSubmit={handleSubmit(magicSearch)}
        id="price"
        className="flex flex-col items-center gap-2 px-4  mb-6"
      >
        <p
          className={`text-sm ${
            errors.search ? "text-red-600" : "text-gray-600"
          }`}
        >
          Input a full name and a city to scrape the internet for details about
          them.
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
              validate: {
                minLength: (v) => v.length > 3,
              },
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
    </main>
  );
}
