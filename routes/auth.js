const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username va password talab qilinadi" });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Bu username allaqachon olingan" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get("/register", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username va password talab qilinadi" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Username yoki parol noto‘g‘ri" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Username yoki parol noto‘g‘ri" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      "my-secret",
      {
        expiresIn: "1h",
      }
    );

    return res.json({ message: "User logged in", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.get("/login", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = route;
