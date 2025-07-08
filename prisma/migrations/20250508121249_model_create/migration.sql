-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefon_turlari" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "telefon_turlari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefonlar" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "xotirasi" INTEGER NOT NULL,
    "telefon_turlariId" TEXT NOT NULL,

    CONSTRAINT "telefonlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefonlarTuri" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "telefonlarTuri_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "telefon_turlari_id_key" ON "telefon_turlari"("id");

-- CreateIndex
CREATE UNIQUE INDEX "telefon_turlari_title_key" ON "telefon_turlari"("title");

-- CreateIndex
CREATE UNIQUE INDEX "telefonlar_id_key" ON "telefonlar"("id");

-- AddForeignKey
ALTER TABLE "telefonlar" ADD CONSTRAINT "telefonlar_telefon_turlariId_fkey" FOREIGN KEY ("telefon_turlariId") REFERENCES "telefon_turlari"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
