import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const UseCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // REQUESTS
  /************************************************************************* */

  // const [inquire, inquiryResponse] = useMutation(SUBMIT_JACKALOPE, {
  //   fetchPolicy: "network-only",
  //   onCompleted: (d) => router.push("/thankyou"),
  //   onError: (d) => alert(d),
  // });

  // FUNCTIONS
  /************************************************************************* */

  async function magicSearch(data) {
    setLoading(true);

    router.push("/magic");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  }

  return {
    loading,
    magicSearch,
  };
};
export default UseCard;
