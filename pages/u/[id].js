const cards = [
  {
    src: "/contacts.png",
    name: "Contact Card",
    link: "data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AN:Al Amawi;Ahmed;;;%0ATEL;TYPE=CELL:+6476872780%0AEMAIL:ahmed@jackrabbitops.com%0AEND:VCARD",
  },
  {
    src: "/safari.png",
    name: "Wesbite",
    link: "https://www.jackrabbitops.com/",
  },
  {
    src: "/linkedin.png",
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ahmed-al-amawi/",
  },
  {
    src: "/mail.png",
    name: "Email",
    link: "mailto:ahmed@jackrabbitops.com",
  },
  {
    src: "/message.png",
    name: "Number",
    link: "sms:+6476872780",
  },
];
export default function Home() {
  return (
    <main className="max-w-md mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className="h-40 w-full">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            className="h-40 w-full object-cover opacity-80"
          />
        </div>
        <img
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-40 w-40 rounded-full -translate-y-20"
        />
        <h1 className="font-semibold -mt-14 text-2xl">Ahmed Al Amawi</h1>
        <p className="text-lg">CTO at Jackrabbit Ops</p>
        <a
          href={cards[0].href}
          className="bg-gray-900 w-2/3 px-8 py-4 rounded-full text-white hover:bg-gray-800 mt-2 text-2xl"
        >
          Save Contact
        </a>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10 px-6">
        {cards.map((card, index) => (
          <a
            href={card.link}
            key={index}
            className="flex flex-col items-center"
          >
            <img src={card.src} className="h-28 w-28" />
            <p className="text-sm text-gray-700 mt-1">{card.name}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
