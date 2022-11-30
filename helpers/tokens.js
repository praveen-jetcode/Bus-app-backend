const jwt = require("jsonwebtoken");

// async function tokenGenerate(user){
//     return (token = await jwt.sign({id:user._id, role: user.role },process.env.JWT_SECRET,{expiresIn: "1 hour",}));

// }

async function tokenGenerate(user) {
  return (jwtToken = await jwt.sign(
    { data: { _id: user._id, userType: user.userType } },
    process.env.JWT_SECRET,
    { expiresIn: "750 hour" }
  ));
}

function validateToken(req, res, next) {
  var incomingToken = req.header("Authorization");
  if (incomingToken) {
    jwt.verify(incomingToken, process.env.JWT_SECRET, function (err, decoded) {
      if (decoded) {
        req.userType = decoded.data.userType;
        console.log(req.userType)
        req.userId = decoded.data._id;
        console.log(req.userId)
        next();
      } else {
        res.status(401).json({
          message: "Invalid Token",
        });
      }
    });
  } else {
    res.status(401).json({
      message: "No Token Present",
    });
  }
}

function permit(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;
  return (request, response, next) => {
    if (request.userType && isAllowed(request.userType)) {
      next();
    } else {
      response.status(403).json({
        message: "Not Authorized",
      });
    }
  };
}

module.exports.tokenGenerate = tokenGenerate;
module.exports.validateToken = validateToken;
module.exports.permit = permit;


