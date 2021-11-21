// server has error - custom message
export const onError = (err, req, res, next) => {
   console.error(err.message);
   // res.statusCode =
      // err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
   res.status(500).send(`Sever Error. ${err.message}`);
   res.json(`Server Error. ${err.message}`);
}
// if method not exists for route (404)
export const onNoMatch = (req, res, next) => {
  res.status(404).send("Page not found!");
}