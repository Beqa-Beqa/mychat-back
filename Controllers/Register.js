const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Database models
const { userModel } = require("../Db/Models");

const createJwt = (_id) => {
  // Import jwt secret key
  const jwtKey = process.env.JWT_SECRET_KEY;
  // Sign the key { uid, secret key, expiration date }
  return jwt.sign({_id}, jwtKey, {expiresIn: "30d"});
}

const registerUser = async (req, res) => {
  try {
    // Get credentials from request body
    const {username, email, pass} = req.body;
    // Check if user exists
    let user = await userModel.findOne({email});

    // If user exists return error code and message
    if(user) return res.status(400).json({message: "Email already in use!"});
    // Reject if any info lacks
    if(!username || !email || !pass) return res.status(400).json({message: "Insufficient credentials"});
    // Reject in case of invalid email
    if(!validator.isEmail(email)) return res.status(400).json({message: "Invalid email"});

    // Define new user
    user = new userModel({username, email, pass});
    // Generate salt for password hash
    const salt = await bcrypt.genSalt(10);
    // Hash and salt the password
    user.pass = await bcrypt.hash(pass, salt);
    // Save created user
    await user.save();

    // Generate jwt of the user
    const token = createJwt(user._id);

    // Send back the info including the token
    res.status(201).json({
      _id: user._id,
      username,
      email,
      token
    });
    
  } catch (err) {
    res.status(500).json({err});
  }
}

module.exports = { registerUser };