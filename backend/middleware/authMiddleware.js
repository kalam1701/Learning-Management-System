const jwt =require("jsonwebtoken");

const protect = (req , res , next)=>{
    // Get token from request header
  // Frontend sends it like:  Authorization: Bearer eyJhbGci...
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message : "No token , acces deneid"});
  }

  const token = authHeader.split(" ")[1];

  try{
    // Verify the token using our secret key
  const decoded = jwt.verify(token , process.env.JWT_SECRET);
    // Attach the user info to the request so the next function can use it
  req.user = decoded;
  next(); // move on to the actual route handler
  }catch(error){
    res.status(401).json({message : "Token invalid or expired"})
  }
};

module.exports = {protect} ;