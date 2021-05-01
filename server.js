const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json()); // express can understand json

// database
const users = [];

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

// create user
app.post("/users", async (req, res) => {
  try {
    //  salt
    const salt = await bcrypt.genSalt(); //by default 10

    // create hashedWith salt
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // const hashedPassWithSalt = await bcrypt.hash(user.password, 10); //shorthand

    const user = { name: req.body.name, password: hashedPass };

    users.push(user);

    res.status(201).send();
  } catch {
    res.status(500).send();
  }

  // without async await
  // bcrypt.genSalt().then((res) => {
  //   console.log(res);
  //   bcrypt.hash(res, 10).then((res2) => {
  //     console.log(res2);
  //   });
  // });
});

// login user
app.post("/users/login", (req, res) => {
  //find user
  const user = users.find((user) => user.name === req.body.name);

  if (user) {
    console.log(user);
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        res.status(200).send("login success");
      } else {
        res.status(401).send("not allowed");
      }
    });
  } else {
    res.status(500).send();
  }
});

app.listen(4000);
