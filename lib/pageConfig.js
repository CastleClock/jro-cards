import image from "../public/logo.png";

// eslint-disable-next-line import/prefer-default-export
export const config = {
  siteName: "jackrabbitops",
  blogTitle: "Blog",
  baseUrl: "jackrabbitops.com",
  websiteLogo: image,
  twitterHandle: "@amawi001",
  twitterCardType: "JackRabbit Blog",

  css: {
    primaryColor: "#111",
    accentColor: "#455A64",
    lightGray: "#eeeeee",
    backgroundColor: "#fff",
    black: "#111",
    white: "#fff",
    textColor: "#333",
    opacity: 0.7,
  },
};

const landing = {
  ...config,
  siteDescription:
    "Tap your JackRabbit digital business card to someone's phone to instantly connect- no app needed.",
  defaultPageTitle:
    "The Digital Business Card to Connect the World  - JackRabbit Ops",
};

const magic = {
  ...config,
  siteDescription:
    "Tap your JackRabbit digital business card to someone's phone to instantly connect- no app needed.",
  defaultPageTitle: "Magic Search - JackRabbit Ops",
};

export const configSet = {
  landing,
  magic,
};
