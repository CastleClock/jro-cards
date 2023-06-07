import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

//REQUESTS
import { USER_LOOKUP } from "../lib/requests";

const UseCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [cards, setCards] = useState([]);
  const [facts, setFacts] = useState(null);
  const [error, setError] = useState(false);

  // REQUESTS
  /************************************************************************* */

  const [loadUser, loadUserRes] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      let person = d.userLookup;
      setPerson(person);
      setCards([
        {
          src: "/contacts.svg",
          name: "Contact",
          link: `data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AN:${person.lastName};${person.firstName};;;%0ATEL;EMAIL:${person.email}%0AEND:VCARD`,
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

  async function magicSearch(data) {
    setLoading(true);

    // router.push("/magic");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  }

  return {
    error,
    loading,
    person,
    cards,
    facts,
    loadPersono,
    magicSearch,
  };
};
export default UseCard;
