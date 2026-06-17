/**
 * *Middleware to validate required fields in request body
 * *Used in POST and PUT routes
 */
export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(
      field => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    next();
  };
};
