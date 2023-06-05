import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const UseCard = () => {
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
    console.log(data);
  }

  return {
    magicSearch,
  };
};
export default UseCard;
