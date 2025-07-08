const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/telefonlar", async (req, res) => {
  try {
    const { title, telefonlarTuriId, xotirasi, price, color, img, desc } =
      req.body;

    if (!telefonlarTuriId) {
      return res.status(400).json({ error: "telefonlarTuriId kerak" });
    }

    const turi = await prisma.telefon_turlari.findUnique({
      where: { id: telefonlarTuriId },
    });

    if (!turi) {
      return res.status(404).json({ error: "Telefon turi topilmadi" });
    }

    const telefon = await prisma.telefonlar.create({
      data: {
        title,
        xotirasi,
        price,
        color,
        img,
        desc,
        telefonlarTuriId,
      },
    });

    res.status(201).json(telefon);
  } catch (error) {
    console.error("Telefon yaratishda xato:", error);
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
});

router.get("/telefonlar", async (req, res) => {
  try {
    const { title, color, priceMin, priceMax, telefonlarTuriId } = req.query;

    const filter = {};

    if (title) {
      filter.title = { contains: title, mode: "insensitive" };
    }

    if (color) {
      filter.color = { equals: color };
    }

    if (telefonlarTuriId) {
      filter.telefonlarTuriId = parseInt(telefonlarTuriId);
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.gte = parseFloat(priceMin);
      if (priceMax) filter.price.lte = parseFloat(priceMax);
    }

    const turlar = await prisma.telefonlar.findMany({
      where: filter,
      include: { telefon_turlari: true },
    });

    res.json(turlar);
  } catch (error) {
    console.error("Filterlashda xatolik:", error);
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
});

router.get("/telefonlar/:id", async (req, res) => {
  const { id } = req.params;
  const telefon = await prisma.telefonlar.findUnique({
    where: { id },
    include: { telefon_turlari: true },
  });

  if (!telefon)
    return res
      .status(404)
      .json({ error: "Telefon topilmadi yoki telefon oldin ochirilgan!" });
  res.json(telefon);
});

router.put("/telefonlar/:id", async (req, res) => {
  const { id } = req.params;
  const { title, telefonlarTuriId, xotirasi, price, color, img, desc } =
    req.body;

  const telefon = await prisma.telefonlar.update({
    where: { id },
    data: {
      title,
      telefonlarTuriId,
      xotirasi,
      price,
      color,
      img,
      desc,
    },
  });

  res.json(telefon);
});

router.delete("/telefonlar/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.telefonlar.delete({
    where: { id },
  });

  res.json({ message: "Telefon o‘chirildi" });
});

module.exports = router;
