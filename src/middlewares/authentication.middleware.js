import jwt from "jsonwebtoken";

export function authenticationMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "invalid token" });
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    return res.status(401).json({ message: "invalid token" });
  }

  try {
    jwt.verify(token, "beatriz");

    //  // userId: 2,
    //   name: 'Beatriz Fraga',
    //   email: 'bea.m.fraga@hotmail.com',
    //   admin: false,
    //   iat: 1715003493,
    //   exp: 1715010693

    const decoded = jwt.decode(token);
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ message: "invalid token" });
  }
}
