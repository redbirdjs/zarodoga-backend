-- CreateTable
CREATE TABLE `zarodolgozatok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(50) NOT NULL,
    `zarodolgozatcim` VARCHAR(100) NOT NULL,
    `rovidleiras` VARCHAR(191) NULL,
    `ladasidatum` DATE NOT NULL,
    `konzulensnev` VARCHAR(50) NOT NULL,
    `ertekeles` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
