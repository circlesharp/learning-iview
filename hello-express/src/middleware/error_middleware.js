const error_handle_middleware = (err, req, res, next) => {
  console.log(233, err);
  if (err) {
    const error_code = 500;
    res.status(error_code).json(
      {
        message: err.message,
        error_code,
      }
    );
  } else {
    // 
  }
};

const not_found_middleware = (req, res, next) => {
  res.json({
    message: 'not found error',
    error_code: 404,
  });
};

module.exports = {
  error_handle_middleware,
  not_found_middleware,
};
