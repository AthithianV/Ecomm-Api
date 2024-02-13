import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //1. Check if authorization header is empty.
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }

  //2. Extract Credentials
  const base64Credentials = authHeader.replace("Basic ", "");
  console.log("base64Credentials " + base64Credentials);

  //3. Decode Credentials
  const decodeCredentails = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  console.log("Decoded Credentials " + decodeCredentails);

  const credentials = decodeCredentails.split(":");
  console.log("Credentials: " + credentials);

  const user = UserModel.getAll().find(
    (u) => u.email == credentials[0] && u.password == credentials[1]
  );

  if (user) {
    next();
  } else {
    return res.status(401).send("No authorization details found");
  }
};

export default basicAuthorizer;
