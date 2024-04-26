-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:6306:6306
-- Generation Time: Mar 28, 2024 at 04:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g7_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `Description`, `Status`, `CreateAt`) VALUES
(1, 'Macbook', 'Des Macbook', 1, '2024-01-25 15:34:00'),
(2, 'HP', 'Des HP', 1, '2024-01-25 15:34:34'),
(3, 'Lenevoa', 'Des Lenevos', 1, '2024-01-25 15:34:45'),
(5, 'tes101', 'Des tes101', 1, '2024-01-25 15:38:26'),
(6, 'tes101', 'Des tes101', 1, '2024-02-08 14:33:33'),
(7, 'tes101', 'Des tes101', 1, '2024-02-08 14:39:13'),
(8, 'tes101', 'Des tes101', 1, '2024-02-09 06:42:17'),
(9, 'tes101', 'Des tes101', 1, '2024-02-09 06:42:30'),
(10, 'tes101', 'Des tes101', 0, '2024-02-09 06:42:31'),
(18, 'Display', 'Display', 1, '2024-03-04 15:41:39'),
(19, 'Printer', 'Printer', 1, '2024-03-05 15:02:04'),
(20, 'Desktop', 'Desktop', 0, '2024-03-05 15:03:16'),
(23, 'Phone', 'Phone com', 1, '2024-03-06 15:17:49'),
(24, 'Computer', 'Computer', 0, '2024-03-06 15:18:11'),
(26, 'Ice', 'iced coffee is a cold version of your favourite coffee', 1, '2024-03-13 13:16:31');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Id` int(11) NOT NULL,
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) DEFAULT 1,
  `Dob` datetime DEFAULT NULL,
  `Tel` varchar(120) NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Id`, `Firstname`, `Lastname`, `Gender`, `Dob`, `Tel`, `Email`, `Address`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(1, 'Luxyssss', 'Ly', 1, '2000-01-01 00:00:00', '098765432', 'mail@example.com', 'Phnom Penh', 1, '2024-02-05 14:47:32', NULL, NULL, NULL),
(2, 'Sok ', 'Dara', 1, '2000-01-01 00:00:00', '098765432', 'sokdara@example.com', 'Phnom Penh', 1, '2024-02-14 15:26:43', NULL, NULL, NULL),
(3, 'So ', 'Channa', 0, '2000-01-01 00:00:00', '098765432', 'sochana@example.com', 'Phnom Penh', 0, '2024-02-14 15:27:04', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Id` int(11) NOT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) DEFAULT 1,
  `Dob` datetime DEFAULT NULL,
  `Tel` varchar(120) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `Image` varchar(255) DEFAULT NULL,
  `Salary` decimal(6,2) DEFAULT 0.00,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Id`, `RoleId`, `Firstname`, `Lastname`, `Gender`, `Dob`, `Tel`, `Password`, `Email`, `Address`, `Status`, `Image`, `Salary`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(1, 1, 'Admin101', 'Mr', 1, '2000-01-01 00:00:00', '099998888', '$2b$10$9e6fSCusI0LQ9wHU8yyRZ.D0fW3BJD996FJ9bg9XXFXDVhjwBGudm', 'mail@example.com', '#123, st233 Phnom Penh', 1, NULL, 1000.00, '2024-02-05 15:02:24', NULL, NULL, NULL),
(2, 1, 'Admin102', 'Mr', 1, '2000-01-01 00:00:00', '099992222', '$2b$10$9e6fSCusI0LQ9wHU8yyRZ.D0fW3BJD996FJ9bg9XXFXDVhjwBGudm', 'mail@example.com', '#123, st233 Phnom Penh', 1, NULL, 1000.00, '2024-02-05 15:03:09', NULL, NULL, NULL),
(3, 23, 'Douk', 'Dara', 1, '1990-04-04 00:00:00', '096898956', NULL, 'dara@gmail.com', NULL, 1, NULL, 1000.00, '2024-03-12 15:23:32', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `Id` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  `OrderStatusId` int(11) DEFAULT NULL,
  `OrderPaymentMethodId` int(11) DEFAULT NULL,
  `TotalQty` decimal(7,2) DEFAULT 0.00,
  `TotalAmount` decimal(7,2) DEFAULT 0.00,
  `TotalPaid` decimal(7,2) DEFAULT 0.00,
  `Note` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`Id`, `CustomerId`, `EmployeeId`, `OrderStatusId`, `OrderPaymentMethodId`, `TotalQty`, `TotalAmount`, `TotalPaid`, `Note`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(4, 1, 1, 3, 1, 3.00, 3000.00, 2000.00, NULL, 1, '2024-03-21 16:01:32', NULL, NULL, NULL),
(5, 1, 1, 4, 1, 1.00, 1000.00, 2000.00, NULL, 1, '2024-03-21 16:05:54', NULL, NULL, NULL),
(6, 1, 1, 4, 1, 1.00, 1000.00, 2000.00, NULL, 1, '2024-03-21 16:09:32', NULL, NULL, NULL),
(7, 1, 1, 4, 1, 1.00, 1000.00, 2000.00, NULL, 1, '2024-03-21 16:09:51', NULL, NULL, NULL),
(8, 1, 1, 4, 1, 1.00, 1000.00, 2000.00, NULL, 1, '2024-03-21 16:11:19', NULL, NULL, NULL),
(9, 2, 1, 4, 3, 3.00, 5500.00, 5500.00, NULL, 1, '2024-03-25 15:38:33', NULL, NULL, NULL),
(10, 3, 2, 4, 3, 1.00, 1000.00, 1000.00, NULL, 1, '2024-03-27 15:11:15', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `Id` int(11) NOT NULL,
  `InvoiceId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `Qty` int(11) DEFAULT 1,
  `Price` decimal(7,2) DEFAULT 0.00,
  `Discount` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`Id`, `InvoiceId`, `ProductId`, `Qty`, `Price`, `Discount`) VALUES
(3, 4, 1, 1, 2000.00, 9.99),
(4, 4, 2, 2, 1000.00, 0.00),
(5, 5, 1, 1, 2000.00, 9.99),
(6, 6, 1, 1, 2000.00, 9.99),
(7, 7, 1, 1, 2000.00, 9.99),
(8, 8, 1, 1, 2000.00, 50.00),
(9, 9, 1, 1, 2000.00, 50.00),
(10, 9, 3, 1, 3500.00, 0.00),
(11, 9, 2, 1, 1000.00, 0.00),
(12, 10, 1, 1, 2000.00, 50.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_payment_method`
--

CREATE TABLE `order_payment_method` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order_payment_method`
--

INSERT INTO `order_payment_method` (`Id`, `Name`, `Code`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(1, 'Cash', 'cash', 1, '2024-01-31 15:18:03', 1, NULL, NULL),
(2, 'ABA', 'aba', 1, '2024-01-31 15:18:54', 1, NULL, NULL),
(3, 'Wing', 'wing', 1, '2024-01-31 15:19:04', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`Id`, `Name`, `Code`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(1, 'Pending', 'Pending', 1, '2024-01-31 15:32:08', 1, NULL, NULL),
(2, 'Cancel', 'Cancel', 1, '2024-01-31 15:32:19', 1, NULL, NULL),
(3, 'Due', 'Due', 1, '2024-01-31 15:32:28', 1, NULL, NULL),
(4, 'Paid', 'Paid', 1, '2024-01-31 15:32:42', 1, NULL, NULL),
(7, 'Issues', 'Issues', 0, '2024-03-11 15:05:04', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Qty` int(6) DEFAULT 0,
  `Price` decimal(7,2) DEFAULT 0.00,
  `Discount` decimal(7,2) DEFAULT 0.00,
  `Image` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `CategoryId`, `Name`, `Description`, `Qty`, `Price`, `Discount`, `Image`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(1, 5, 'Macbook 2012', 'Tes Dest 111', 23, 2000.00, 50.00, 'image-1711381252161-381028879', 1, '2024-02-06 15:21:32', NULL, NULL, NULL),
(2, 2, 'Macbook 2012', 'Macbook 2012 | RAM 4G | SSD 265', 27, 1000.00, 0.00, 'image-1710777015677-865841074', 1, '2024-02-06 15:22:38', NULL, NULL, NULL),
(3, 3, 'Macbook2013', 'Macbook2013 | 16GB | SSD1T', 3, 3500.00, 0.00, 'image-1710777003107-568485838', 1, '2024-02-07 15:12:39', NULL, NULL, NULL),
(6, 3, 'Lenevo P009', 'Lenevo P009', 12, 2000.00, 10.00, 'image-1710860057414-224889712', 0, '2024-03-18 15:11:37', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `Id` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `Status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `Id` int(11) NOT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  `SupplierId` int(11) DEFAULT NULL,
  `PurchaeStatus` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL,
  `PurchaseAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_product`
--

CREATE TABLE `purchase_product` (
  `Id` int(11) NOT NULL,
  `PurchaseId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `Qty` int(11) DEFAULT 1,
  `Price` decimal(7,2) DEFAULT 0.00,
  `ProductStatus` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Id`, `Name`, `Code`, `Status`, `CreateAt`) VALUES
(1, 'Admin', 'ADMIN', 1, '2024-01-22 15:24:06'),
(2, 'Account', 'ACCOUNT', 1, '2024-01-22 15:25:19'),
(22, 'Seller', 'SELLER', 1, '2024-01-24 15:26:16'),
(23, 'IT', 'IT', 0, '2024-01-24 15:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Tel` varchar(120) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Addres` text NOT NULL,
  `WebsiteUrl` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleId` (`RoleId`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `OrderStatusId` (`OrderStatusId`),
  ADD KEY `OrderPaymentMethodId` (`OrderPaymentMethodId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `InvoiceId` (`InvoiceId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `order_payment_method`
--
ALTER TABLE `order_payment_method`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `SupplierId` (`SupplierId`);

--
-- Indexes for table `purchase_product`
--
ALTER TABLE `purchase_product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PurchaseId` (`PurchaseId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_payment_method`
--
ALTER TABLE `order_payment_method`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_product`
--
ALTER TABLE `purchase_product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`Id`),
  ADD CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`OrderStatusId`) REFERENCES `order_status` (`Id`),
  ADD CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`OrderPaymentMethodId`) REFERENCES `order_payment_method` (`Id`),
  ADD CONSTRAINT `invoice_ibfk_4` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`Id`);

--
-- Constraints for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `invoice_details_ibfk_1` FOREIGN KEY (`InvoiceId`) REFERENCES `invoice` (`Id`),
  ADD CONSTRAINT `invoice_details_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);

--
-- Constraints for table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`Id`),
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`SupplierId`) REFERENCES `supplier` (`Id`);

--
-- Constraints for table `purchase_product`
--
ALTER TABLE `purchase_product`
  ADD CONSTRAINT `purchase_product_ibfk_1` FOREIGN KEY (`PurchaseId`) REFERENCES `purchase` (`Id`),
  ADD CONSTRAINT `purchase_product_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
