const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const route = express.Router();

route.post("/telefonlarTuri", async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body);

    if (!title || undefined) {
      return res.status(400).send({ error: "Title and price are required" });
    }

    const createTelefon = await prisma.telefon_turlari.create({
      data: { title },
    });
    res.send(createTelefon);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

route.get("/telefonlarTuri", async (req, res) => {
  let { limit, page, minPrice, maxPrice, title } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 200;

  const skip = (page - 1) * limit;
  const where = {};

  if (title) {
    where.title = { contains: title, mode: "insensitive" };
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (!isNaN(parseFloat(minPrice))) where.price.gte = parseFloat(minPrice);
    if (!isNaN(parseFloat(maxPrice))) where.price.lte = parseFloat(maxPrice);
  }

  try {
    const telefonlar = await prisma.telefon_turlari.findMany({
      skip,
      take: limit,
      where,
    });
    res.send({ telefonlar, message: "Get all products" });
  } catch (err) {
    console.error("Get all error:", err);

    res.status(500).send({ error: "Something went wrong" });
  }
});

route.get("/telefonlarTuri/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const telProduct = await prisma.telefon_turlari.findUnique({
      where: { id },
      select: {
        title: true,
        telefonlar: true,
      },
    });

    if (!telProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.send({ telProduct, message: "Get product" });
  } catch (err) {
    console.error("Get one error:", err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

route.put("/telefonlarTuri/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  const data = {};
  if (title !== undefined) data.title = title;

  if (Object.keys(data).length === 0) {
    return res.status(400).send({ error: "No fields to update" });
  }

  try {
    const updateTelefon = await prisma.telefon_turlari.update({
      where: { id },
      data,
    });
    res.send({ updateTelefon, message: "Product updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send({ error: "Cannot update product" });
  }
});

route.delete("/telefonlarTuri/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTelefon = await prisma.telefon_turlari.delete({
      where: { id },
    });
    res.send({ deleteTelefon, message: "Product deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send({ error: "Cannot delete product" });
  }
});

module.exports = route;
