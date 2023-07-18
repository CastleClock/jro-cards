import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { useLazyQuery, useMutation } from "@apollo/client";

import { UPDATE_USER } from "../lib/requests";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("../pages/api/user");

  // REQUESTS
  /************************************************************************* */

  const [updateUserDetails, userDetails] = useMutation(UPDATE_USER, {
    fetchPolicy: "network-only",
    context: user,
    onCompleted: (d) => {
      setOpenMember(false);
      fetchMembers();
    },
    onError: (d) => console.log("error", d),
  });

  // FUNCTIONS
  /************************************************************************* */

  async function updateUser(data) {
    updateUserDetails({ variables: data });
  }

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser, updateUser };
}
