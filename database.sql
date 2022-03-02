-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2022 at 06:53 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marbles`
--

-- --------------------------------------------------------

--
-- Table structure for table `commands`
--

CREATE TABLE `commands` (
  `Id` int(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Parameter` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commands`
--

INSERT INTO `commands` (`Id`, `Name`, `Parameter`) VALUES
(1, '!camera 1', 'one'),
(2, '!camera 2', 'two'),
(3, '!camera 3', 'three'),
(4, '!camera 4', 'four'),
(5, '!camera 5', 'five'),
(6, '!camera 6', 'six'),
(7, '!camera 7', 'seven'),
(8, '!camera 8', 'eight'),
(9, '!camera 9', 'nine');

-- --------------------------------------------------------

--
-- Table structure for table `playeramount`
--

CREATE TABLE `playeramount` (
  `Id` int(255) NOT NULL,
  `amount` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `playeramount`
--

INSERT INTO `playeramount` (`Id`, `amount`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `racestate`
--

CREATE TABLE `racestate` (
  `Id` int(255) NOT NULL,
  `RaceState` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `racestate`
--

INSERT INTO `racestate` (`Id`, `RaceState`) VALUES
(1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `playeramount`
--
ALTER TABLE `playeramount`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `racestate`
--
ALTER TABLE `racestate`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commands`
--
ALTER TABLE `commands`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `playeramount`
--
ALTER TABLE `playeramount`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `racestate`
--
ALTER TABLE `racestate`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
