import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

//REQUESTS
import { USER_LOOKUP } from "../lib/requests";

const UseCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  // REQUESTS
  /************************************************************************* */

  const [loadUser, loadUserRes] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      let person = d.userLookup;
      console.log(person);
      if (!person) {
        setError(true);
        return;
      }
      setPerson(person);
      const vCardUrl = createVCard(
        person,
        `https://scale.jackrabbitops.com/u/${person.cardQrCode}`
      );
      setCards([
        {
          src: "/contacts.svg",
          name: "Contact",
          link: vCardUrl,
        },
        {
          src: "/linkedin.svg",
          name: "LinkedIn",
          link: person.linkedinUrl,
        },
        {
          src: "/mail.svg",
          name: "Email",
          link: `mailto:${person.email}`,
        },
      ]);
    },
    onError: (d) => setError(true),
  });

  // FUNCTIONS
  /************************************************************************* */

  async function loadPersono(id) {
    loadUser({
      variables: {
        code: id,
      },
    });
  }

  return {
    error,
    loading,
    person,
    cards,
    loadPersono,
  };
};
export default UseCard;

const createVCard = (person, jro_url) => {
  const vCardData = `BEGIN:VCARD%0AVERSION:3.0${
    person.lastName && person.firstName
      ? `%0AN:${person.lastName};${person.firstName}`
      : ""
  }${person.companyName ? `%0AORG:${person.companyName}` : ""}${
    person.position ? `%0ATITLE:${person.position}` : ""
  }${person.phoneNumber ? `%0ATEL:${person.phoneNumber}` : ""}${
    person.email ? `%0AEMAIL:${person.email}` : ""
  }${person.linkedinUrl ? `%0AURL:${person.linkedinUrl}` : ""}${
    jro_url ? `%0AURL:${jro_url}` : ""
  }%0APHOTO:${person.linkedinProfilePicUrl || ""}%0AEND:VCARD`;

  return `data:text/vcard;charset=utf-8,${vCardData}`;
};
