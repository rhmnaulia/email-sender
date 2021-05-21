const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "7ustfortesting@gmail.com",
      // I've change the real password || sudah saya ganti password aslinya
      pass: "Not a real password",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "7ustfortesting@gmail.com",
    subject: `Mail from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
