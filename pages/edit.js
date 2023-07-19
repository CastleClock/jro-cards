import Link from "next/link";
import { NextSeo } from "next-seo";
import { createSEOPageConfig } from "../utils/seo";
import { configSet } from "../lib/pageConfig";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Input from "../components/inputs/text";

//HOOKS
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";

export default function EditPage() {
  const router = useRouter();
  const { user, setUser, handleSign, updateUser } = useUser();
  useEffect(() => {
    if (user) return;
    const localUser = localStorage.getItem("user");
    if (localUser) setUser(JSON.parse(localUser));
  }, [user]);

  return (
    <main className="max-w-md mx-auto ">
      <NextSeo {...createSEOPageConfig(configSet.landing)} />
      <div className="sticky bg-white top-0 flex flex-row  justify-between items-center px-4 mt-4 border-b">
        <p className="font-bold">Scale YYJ</p>
        <button
          type="button"
          onClick={() => router.back()}
          className=" text-black h-min px-2 py-2 rounded-lg text-sm hover:bg-black hover:text-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <div>
        {user ? (
          <EditSection user={user} updateUser={updateUser} />
        ) : (
          <LoginSection handleSign={handleSign} />
        )}
      </div>
    </main>
  );
}

function LoginSection({ handleSign }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSign)} className="mt-2">
      <p className="text-sm text-gray-500">Login to edit profile.</p>
      <div className="mt-4 flex flex-col gap-6">
        <Input
          title="Email"
          name="email"
          type="text"
          register={register}
          errors={errors.email}
          background="bg-white"
        />
        <Input
          title="Password"
          name="password"
          type="password"
          register={register}
          errors={errors.password}
          background="bg-white"
        />
      </div>
      <div className="mt-6 flex items-center justify-center">
        <button
          type="submit"
          className="w-full rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Login
        </button>
      </div>
      <Link
        href="/reset-password"
        className="my-2.5 flex items-center justify-center"
      >
        <span className="text-blue-600 hover:text-blue-900 text-sm">
          Forgot Password?
        </span>
      </Link>
    </form>
  );
}

function EditSection({ user, updateUser }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fields = [
    {
      title: "First Name",
      name: "firstName",
      type: "text",
    },
    {
      title: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      title: "Email",
      name: "email",
      type: "email",
    },
    {
      title: "Phone Number",
      name: "phoneNumber",
      type: "text",
    },
    {
      title: "Position",
      name: "position",
      type: "text",
    },
    {
      title: "Company",
      name: "companyName",
      type: "text",
    },
    {
      title: "LinkedIn Url",
      name: "linkedinUrl",
      type: "text",
    },
  ];

  useEffect(() => {
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
    setValue("phoneNumber", user?.phoneNumber);
    setValue("position", user?.position);
    setValue("companyName", user?.companyName);
    setValue("linkedinUrl", user?.linkedinUrl);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(updateUser)} className="mt-2">
      <p className="text-sm text-gray-500">Edit Profile Below.</p>
      <div className="mt-4 flex flex-col gap-6">
        {fields.map((field, index) => {
          return (
            <Input
              title={field.title}
              name={field.name}
              type={field.type}
              register={register}
              errors={errors.firstName}
              background="bg-white"
              key={index}
            />
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <button
          type="submit"
          className="w-full rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
