import { useState } from "react";
import Router from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";

import { LOGIN, UPDATE_USER } from "../lib/requests";

export default function useUser() {
  const [user, setUser] = useState(null);

  // REQUESTS
  /************************************************************************* */
  const [login, loginResponse] = useMutation(LOGIN, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      // expiries in an hour
      let userBody = {
        ...d.tokenAuth.user,
        token: d.tokenAuth.token,
        companyName: d.tokenAuth.user?.company?.name,
      };
      setUser(userBody);
      localStorage.setItem("user", JSON.stringify(userBody));
    },
    onError: (d) => console.log(d),
  });

  const [updateMemberDetails, memberDetailsResponse] = useMutation(
    UPDATE_USER,
    {
      fetchPolicy: "network-only",
      onCompleted: (d) => {
        let updatedUser = d.updateAccount.user;
        let cloneUser = JSON.parse(JSON.stringify(user));
        let userBody = {
          ...cloneUser,
          ...updatedUser,
        };
        setUser(userBody);
        // expiries in an hour
        console.log("new body", userBody);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(userBody));
      },
      onError: (d) => console.log("error", d),
    }
  );

  // FUNCTIONS
  /************************************************************************* */
  async function handleSign(data) {
    data.email = data.email.trim().toLowerCase();
    login({ variables: data });
  }

  async function updateUser(data) {
    console.log(user);
    updateMemberDetails({
      variables: data,
      context: { token: user?.token || "bye" },
    });
  }

  return {
    user,
    setUser,
    handleSign,
    loading: loginResponse.loading || memberDetailsResponse.loading,
    updateUser,
  };
}
