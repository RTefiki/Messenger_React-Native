const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");
const port = 8001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Lidhja me MongoDB
mongoose
  .connect("mongodb+srv://Rinor:Rinori22@cluster0.nync0if.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connection", err);
  });

app.listen(port, () => {
  console.log(`Serveri është i gatshëm në portin ${port}`);
});

const User = require("./models/user");
const Message = require("./models/message");

// Endpoint për regjistrim
app.post("/register", async (req, res) => {
  console.log("Jeni regjistruar me sukses");
  const { id, name, email, password, image } = req.body;

  const newUser = new User({ id, name, email, password, image });
  await newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "Regjistrimi u krye me sukses." });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Diçka shkoi keq." });
    });
});

// function to create a token for the user
const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  //Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Titari", { expiresIn: "1h" });
  return token;
};

app.post("/login", async (req, res) => {
  console.log("Login successfull");
  const { email, password } = req.body;

  // Gjej përdoruesin nga emri i përdoruesit

  if (!email || !password) {
    return res.status(404).json({ message: "Emai or Passwor is not correct" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ message: "User not found" });
      }

      //compare the provided password with the pasword in the database
      if (user.password !== password) {
        return res.status(404).json({ message: "Passwords do not match" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Somthig is wrong." });
    });
});

//except the users that currently logged in are

app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;

  // Kontrollo nëse ID e përdoruesit është e vlefshme
  if (!loggedInUserId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  // Kontrollo nëse përdoruesi ekziston
  User.findById(loggedInUserId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Marrim përdoruesit e tjerë
      User.find({ _id: { $ne: loggedInUserId } })
        .select("-password -__v")
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((error) => {
          console.log("Error", error);
          res.status(500).json({ message: "Error retrieving users" });
        });
    })
    .catch((error) => {
      console.log("Error", error);
      res.status(500).json({ message: "Error checking user existence" });
    });
});

//Friends Requests sending

app.post("/friend-request", async (req, res) => {
   console.log("Friend request route hit");
  console.log("Request body:", req.body);
  const { currentUserId, selectedUserId } = req.body;

  console.log("currentUserId:", currentUserId);
  console.log("selectedUserId:", selectedUserId);

  if (!currentUserId || !selectedUserId) {
    return res.status(404).send("User not found");
  }
  try {
    //update the reception of friend request Array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    //update the sender of send friend request
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sendFriendRequests: selectedUserId },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log("Error", err);
    res.sendStatus(500);
  }
});


app.get("/friend-requests/:userId", async (req, res) => {
  console.log("Request friend:", req.body);
  try{
    const {userId} = req.params

    const user = await User.findById(userId).populate("friendRequests"," name email image").lean()

    const friendRequests =  user.friendRequests;
    res.json(friendRequests)
  }
  catch (err) {
    console.log("error to get friend requests", err)
    res.status(500).json({message: "Interval Server Error"})
  }
})
