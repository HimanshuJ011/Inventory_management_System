const errorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
  
    switch (statusCode) {
      case 400:
        console.log("Invalid");
        res.json({
          title: "Validation Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case 404:
        res.json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case 403:
        res.json({
          title: "Forbidden",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      default:
        console.log("All set");
        break;
    }
  };
  
  module.exports = errorHandle;
  