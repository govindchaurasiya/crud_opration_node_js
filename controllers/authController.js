const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.signup = async (req, res) => {
    // Implement the signup logic here
    const {firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist.");
    }

    try {
        await user.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    // Implement the login logic here
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('User not found.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid password.');
    }else{
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;// Update the token field with the new token
        //   user.tokens.push({ token });
          await user.save();
          res.status(200).json(user);
    }

    // At this point, the user is authenticated
    // You can generate and send a JWT token here for further authentication

  
};
