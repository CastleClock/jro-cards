import VerifyAuth from "./verifyAuth";

export async function authHandler({ req, res }) {
  try {
    const user = req.session.user;
    if (!user) throw 500;

    const isLoggedIn = await VerifyAuth(user);
    if (!isLoggedIn) throw 401;

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    res.statusCode = err;
    return {
      props: {
        user: null,
      },
    };
  }
}
