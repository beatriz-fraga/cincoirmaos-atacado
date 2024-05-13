-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "total" REAL,
    "closed" BOOLEAN,
    "closedAt" DATETIME,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cart" ("closed", "closedAt", "id", "total", "userId") SELECT "closed", "closedAt", "id", "total", "userId" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
CREATE TABLE "new_CartHasProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER,
    "productPrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "CartHasProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartHasProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CartHasProduct" ("cartId", "id", "productId", "productPrice", "quantity") SELECT "cartId", "id", "productId", "productPrice", "quantity" FROM "CartHasProduct";
DROP TABLE "CartHasProduct";
ALTER TABLE "new_CartHasProduct" RENAME TO "CartHasProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
