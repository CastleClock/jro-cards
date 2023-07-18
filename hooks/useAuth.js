import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import fetchJson, { FetchError } from "../lib/fetchJson";
import useUser from "./useUser";
import { REGISTER_USER, RESET_REQUEST, RESET_PASSWORD } from "../lib/requests";
import { fetchPostJSON } from "../utils/api-helpers";

const useAuth = () => {
  const router = useRouter();
  const { redirect, code } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [userReference, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetRequested, setResetRequest] = useState("");
  const { mutateUser } = useUser({
    redirectTo: redirect ?? "/",
    redirectIfFound: false,
  });

  // REQUESTS
  /************************************************************************* */
  const [requestForgot, forgotResponse] = useMutation(RESET_REQUEST, {
    onCompleted: async (d) => {
      setLoading(false);
      setResetRequest(true);
    },
    onError: (d) => {
      setErrorMsg(d.message);
      setLoading(false);
    },
  });
  const [resetPassword, resetResponse] = useMutation(RESET_PASSWORD, {
    onCompleted: async (d) => {
      setLoading(false);
      router.push("/login");
    },
    onError: (d) => {
      setErrorMsg(d.message);
      setLoading(false);
    },
  });

  // FUNCTIONS
  /************************************************************************* */

  async function handleRegistration(data) {
    try {
      data.email = data.email.trim().toLowerCase();
      setLoading(true);
      mutateUser(
        await fetchJson("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      );
    } catch (error) {
      setLoading(false);
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  }

  async function handleSetPassword(data) {
    if (data.password !== data.confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setLoading(true);
    // createAcc({ variables: data });
  }

  async function handleSign(data) {
    try {
      data.email = data.email.trim().toLowerCase();
      setLoading(true);
      data.remember &&
        secureLocalStorage.setItem("thumper", JSON.stringify(data));

      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      );
      router.reload();
    } catch (error) {
      setLoading(false);
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  }

  async function handleForgot(data) {
    requestForgot({ variables: data });
  }

  async function handleReset(data) {
    if (data.pass !== data.confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }
    resetPassword({
      variables: {
        linkCode: code,
        password: data.pass,
        passwordMatch: data.confirm,
      },
    });
  }

  async function handleRegistration(data) {
    try {
      data.email = data.email.trim().toLowerCase();
      setLoading(true);
      mutateUser(
        await fetchJson("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      );
      const promo = JSON.parse(secureLocalStorage.getItem("alpha"));
      const response = await fetchPostJSON("/api/checkout_sessions", {
        email: data.email,
        promo: promo,
      });

      if (response.statusCode === 500) {
        console.error(response.message);
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.id,
      });
      console.warn(error.message);
    } catch (error) {
      setLoading(false);
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  }

  return {
    isLoading,
    userReference,
    errorMsg,
    router,
    code,
    resetRequested,
    handleRegistration,
    handleSetPassword,
    handleSign,
    handleForgot,
    handleReset,
    handleRegistration,
  };
};
export default useAuth;
