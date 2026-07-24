-- CreateTable
CREATE TABLE "servicios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);
