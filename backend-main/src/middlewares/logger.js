/**
 * *Logger middleware
 * *Logs HTTP method and URL with timestamp for each request
 */
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
