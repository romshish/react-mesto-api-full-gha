// const allowedCors = [
//   'https://api.mesto.project.nomoredomains.monster/',
//   'https://mesto.project.nomoredomains.monster',
//   'http://mesto.project.nomoredomains.monster',
//   'http://localhost:3000',
// ];

// function checkSource(req, res, next) {
//   const { method } = req;
//   const { origin } = req.headers;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requetsHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requetsHeaders);
//     return res.end();
//   }
//   return next();
// }

// export default checkSource;
