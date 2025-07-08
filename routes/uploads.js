const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

route.post("/upload", upload.single("image"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/upload/${
    req.file.filename
  }`;
  res.send({ url: fileUrl });
});

route.get("/upload", (req, res) => {
  fs.readdir("upload/", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Fayllarni o‘qishda xatolik" });
    }

    const fileUrls = files.map((file) => {
      return `${req.protocol}://${req.get("host")}/upload/${file}`;
    });

    res.json({ files: fileUrls });
  });
});

route.delete("/upload/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../upload", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ error: "Fayl topilmadi yoki o‘chirishda xatolik" });
    }
    res.json({ message: `${fileName} muvaffaqiyatli o‘chirildi` });
  });
});

module.exports = route;
