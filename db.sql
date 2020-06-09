-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 09, 2020 at 01:06 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `proyecto_series`
--
CREATE DATABASE IF NOT EXISTS `proyecto_series` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `proyecto_series`;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL,
  `serie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `message`, `rating`, `serie_id`) VALUES
(21, 11, 'increible!!!!', 9, 60735),
(22, 11, 'Un poco depre', 7, 66788),
(23, 11, 'Muy copada', 8, 2734),
(24, 11, 'Increible produccion', 10, 66017),
(25, 11, 'Enamorado.', 8, 99799),
(26, 12, 'Buen desarrollo', 6, 100),
(27, 12, 'No me gustó', 3, 83097),
(28, 12, 'Buena trama', 7, 42573),
(29, 12, 'Me encanta el animé', 9, 83095),
(30, 12, 'Quiero la 2', 7, 70785),
(31, 13, 'Estoy flipando', 10, 48866),
(32, 13, 'No me gustó', 4, 1403),
(33, 13, 'Amé esta serie', 10, 62710),
(34, 13, 'Muy repetitiva', 3, 79680),
(35, 13, 'Mi prefe', 10, 60572),
(36, 14, 'Esta mal pero no tan mal', 6, 57243),
(37, 14, 'Bien de cast', 7, 1622),
(38, 14, 'Me gusta el estilo', 8, 48866),
(39, 14, 'Shoro', 10, 1396),
(40, 14, 'Clasico', 10, 456),
(41, 16, 'Copia barata', 1, 1433),
(42, 16, 'Me gustan los actores', 6, 4656),
(43, 16, 'Sobre todo los valores', 7, 62852),
(44, 16, 'Va bien', 5, 80986),
(45, 16, '1810', 4, 502);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(11, 'benja', 'benja@flash.com', '$2a$10$zoEeoMH3G3.4lhRaMN1S5.KPPt35oMONBbhT6vnZc2o2htgADDa56'),
(12, 'santos', 'santos@flash.com', '$2a$10$AH8Mku8Ndeo78H7byakHuecV8sWsmfogdvLW27sb8gfoFuqH1b3Zq'),
(13, 'Juan', 'juan@flash.com', '$2a$10$dVGtUw6YNLsOfL8eA5qhxOdVxZGMPvutM/8Y6rhIt41dl9bhjO24y'),
(14, 'Pepito', 'pepito@flash.com', '$2a$10$NGuTi4DJ4IKMw8vwdNV.cutw/.59sVW2.mZ5RG1vUWP/PbWsf3eJS'),
(15, 'Pepito', 'pepito@gmail.com', '$2a$10$U1jUc.meE95y/y509oHjAOU946LVbT59rPbC96PQ38OlQ0ILEj/0W'),
(16, 'Osvaldo', 'osvaldo@flash.com', '$2a$10$DGXLPojoK5JrETBCBZ.Nlubj44IET5gagy2vfSVPyHe/AM6xEvUPa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_FK` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
