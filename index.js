const express = require("express");
const app = express();
const telefonRoute = require("./routes/telefonTuri");
const telefonlar = require("./routes/telefonlar");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/uploads");
const count = require("./routes/count")
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(telefonRoute);
app.use(telefonlar);
app.use(authRoute);
app.use(uploadRoute);
app.use(count)
app.use(express.urlencoded({ extended: true }));


app.use("/upload", express.static("upload"));

app.get("/user", async (req, res) => {
  try {
    const user = await prisma.User.find();

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/upload", (req, res) => {
  console.log(req.ip);
  res.send("Server is working");
});

app.listen(9090, () => {
  console.log("server started on posrt 9090");
});
