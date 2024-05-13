export function adminCheckMiddleware(req, res, next) {
  if (req.user.admin) {
    return next();
  } else {
    return res.json({ message: "Acesso não autorizado" }).status(401);
  }
}
