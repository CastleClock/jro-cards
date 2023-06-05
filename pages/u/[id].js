import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-sm mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className="h-24 w-full">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            className="h-24 w-full object-cover opacity-80"
          />
        </div>
        <img
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-24 w-24 rounded-full -translate-y-10"
        />
        <h1 className="font-semibold -mt-6">Ahmed Al Amawi</h1>
        <p>CTO at Jackrabbit Ops</p>
        <button className="bg-gray-900 px-6 py-2 rounded-full text-white hover:bg-gray-800 mt-2 text-lg">
          Save Contact
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-8">
        <button>
          <img src="/linkedin.png" />
        </button>
        <button>
          <img src="/mail.png" />
        </button>
        <button>
          <img src="/message.png" />
        </button>
      </div>
    </main>
  );
}
