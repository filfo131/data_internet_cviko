-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: host.docker.internal:3306
-- Čas generovania: St 18.Nov 2026, 22:34
-- Verzia serveru: 11.4.13-MariaDB-ubu2404
-- Verzia PHP: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `kniznica`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `autori`
--

CREATE TABLE `autori` (
  `id` int(11) NOT NULL,
  `meno` varchar(255) NOT NULL,
  `krajina` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Sťahujem dáta pre tabuľku `autori`
--

INSERT INTO `autori` (`id`, `meno`, `krajina`) VALUES
(1, 'George Orwell', 'Spojené kráľovstvo'),
(2, 'J. R. R. Tolkien', 'Spojené kráľovstvo'),
(3, 'Antoine de Saint-Exupéry', 'Francúzsko'),
(4, 'Božena Němcová', 'Česko'),
(5, 'Jules Verne', 'Francúzsko');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `kniha`
--

CREATE TABLE `kniha` (
  `id` int(11) NOT NULL,
  `názov` varchar(255) NOT NULL,
  `autor_id` int(11) NOT NULL,
  `rok_vydania` int(11) NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `žáner` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Sťahujem dáta pre tabuľku `kniha`
--

INSERT INTO `kniha` (`id`, `názov`, `autor_id`, `rok_vydania`, `cena`, `žáner`) VALUES
(1, '1984', 3, 1949, 12.90, 'Dystópia'),
(2, 'Hobit', 2, 1937, 25.00, 'Fantasy'),
(3, 'Malý princ', 3, 1943, 9.90, 'Rozprávka'),
(4, 'Babička', 4, 1855, 8.50, 'Klasika'),
(5, 'Cesta do stredu Zeme', 1, 1864, 11.90, 'Dobrodružný');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `autori`
--
ALTER TABLE `autori`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `autori_id_unique` (`id`);

--
-- Indexy pre tabuľku `kniha`
--
ALTER TABLE `kniha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `knihy_id_unique` (`id`),
  ADD KEY `knihy_autor_fk` (`autor_id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `autori`
--
ALTER TABLE `autori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pre tabuľku `kniha`
--
ALTER TABLE `kniha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `kniha`
--
ALTER TABLE `kniha`
  ADD CONSTRAINT `knihy_autor_fk` FOREIGN KEY (`autor_id`) REFERENCES `autori` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
