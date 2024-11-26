function requiresAuthentication(req) {
  const protectedRoutes = [
    '/questions',
    '/users',
    '/categories',
    '/answers',
  ];
  return protectedRoutes.some((route) => req.originalUrl.startsWith(route));
}

function authorize() {
  return (req, res, next) => {
    if (!requiresAuthentication(req)) {
      next();
      return;
    }

    if (!req.session.userId) {
      res.status(401).send('You are not logged in.');
    } else {
      next();
    }
  };
}

export default authorize;
