const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/count", async (req, res) => {
  try {
    const registerCount = await prisma.user.count();

    const loginCount = await prisma.user.count();

    res.json({ registerCount, loginCount });
  } catch (error) {
    console.error("Statistika olishda xatolik:", error);
    res.status(500).json({ message: "Statistikani olishda server xatosi" });
  }
});

module.exports = router;
