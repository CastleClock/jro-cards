import { NextSeo } from "next-seo";
import { createSEOPageConfig } from "../..//utils/seo";
import { configSet } from "../../lib/pageConfig";
import Link from "next/link";
import { PlusIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

//HOOKS
import UseCard from "../../hooks/useCard";
import { useEffect } from "react";

//COMPONENTS
import Magic from "../../components/magic";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const { magicSearch, loadPersono, error, person, cards, loading, facts } =
    UseCard();

  useEffect(() => {
    if (!person && id) loadPersono(id);
  }, [id]);

  if (error) {
    return (
      <main className="max-w-md mx-auto border flex flex-col items-center justify-center h-[100vh] px-4 text-center">
        <h1 className="text-3xl text-[#F6800A] font-bold">OOPS!</h1>
        <p className="text-sm text-gray-500 mt-8">
          It looks like you are trying to access a profile that does not exist.
        </p>
        <p className="text-sm text-gray-500">
          Tap a card to view their profile.
        </p>
      </main>
    );
  }
  if (!person) {
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
  }
  return (
    <main className="max-w-md mx-auto ">
      <NextSeo {...createSEOPageConfig(configSet.landing)} />
      <div className="flex flex-row  justify-between items-center px-4 mt-4">
        <p className="font-bold">Scale YYJ</p>
        <Link
          href="https://www.jackrabbitops.com/"
          className="border border-black text-black h-min px-6 py-2 rounded-lg text-sm hover:bg-black hover:text-gray-50"
        >
          <p className="text-sm">See Events</p>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="h-52 grid grid-cols-2 mx-4 rounded-xl my-4 bg-black shadow-lg ">
          <img
            src={person.linkedinProfilePicUrl}
            className="rounded-l-xl object-cover h-full w-full"
          />
          <div className="flex flex-col justify-center text-gray-50 p-4 ">
            <h1 className="font-semibold  text-3xl">
              {person.firstName} {person.lastName}
            </h1>
            <p className="text-sm text-slate-400">{person.position} @</p>
            <p className="text-sm  text-slate-400 mt-0 ">
              {person.companyName}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1  w-full px-4">
          <a
            href={cards[0]?.link}
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
      {!facts ? (
        <div className="border rounded-lg m-4 my-6 p-2">
          <p className=" mt-1 text-xl font-semibold text-black  tracking-tighter">
            Break the Ice with <span className="text-[#F6800A]">AI</span>
          </p>
          <p className="text-sm  text-gray-700">
            We&apos;ll look up {person.firstName} {person.lastName} for you.
          </p>
          <div className="w-full flex flex-col items-center justify-center my-3 mt-3">
            <button
              type="submit"
              onClick={() => magicSearch()}
              form="price"
              className=" w-full flex flex-row justify-center items-center gap-2 text-base bg-black hover:bg-white text-white  hover:text-black px-7 py-2 border border-black  hover:bg-softWhite rounded-lg "
            >
              <RocketLaunchIcon className="h-6 w-6" />
              Launch AI Helper
              {loading && (
                <svg
                  className="animate-spin h-7 w-7  ml-2 self-center "
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
              )}
            </button>
          </div>
        </div>
      ) : (
        <Magic />
      )}
    </main>
  );
}
