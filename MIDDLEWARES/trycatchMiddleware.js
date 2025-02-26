const TryCatchMiddleware = (handler) => async (req, res, next) => {
    try {
      await handler(req, res, next); // Only execute the handler once
    } catch (error) {
      console.error("Error in TryCatchMiddleware:", error);
      if (!res.headersSent) {  // Prevent multiple responses
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }
  };
  
  export default TryCatchMiddleware;
  