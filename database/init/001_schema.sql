CREATE TABLE IF NOT EXISTS autori (
    id INT NOT NULL AUTO_INCREMENT,
    meno VARCHAR(255) NOT NULL,
    krajina VARCHAR(100),
    PRIMARY KEY (id),
    UNIQUE KEY autori_id_unique (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS knihy (
    id INT NOT NULL AUTO_INCREMENT,
    `názov` VARCHAR(255) NOT NULL,
    autor_id INT NOT NULL,
    rok_vydania INT NOT NULL,
    cena DECIMAL(10, 2) NOT NULL,
    `žáner` VARCHAR(100),
    PRIMARY KEY (id),
    UNIQUE KEY knihy_id_unique (id),
    CONSTRAINT knihy_autor_fk FOREIGN KEY (autor_id) REFERENCES autori (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
