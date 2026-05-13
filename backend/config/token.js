import jwt from "jsonwebtoken";

function getToken(userId) {
  try {
    const token = jwt.sign( {userId}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token
  } catch (error) {
    console.log(error);
  }
}

export default getToken;
