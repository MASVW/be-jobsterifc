-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 04:41 PM
-- Server version: 10.6.14-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u917904281_cp_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `applyments`
--

CREATE TABLE `applyments` (
  `applyId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `batchId` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `batchs`
--

CREATE TABLE `batchs` (
  `batchId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `campaignName` varchar(255) DEFAULT NULL,
  `campaignDesc` text DEFAULT NULL,
  `campaignPeriod` datetime DEFAULT NULL,
  `campaignKeyword` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `predict` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`predict`)),
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `batchs`
--

INSERT INTO `batchs` (`batchId`, `userId`, `campaignName`, `campaignDesc`, `campaignPeriod`, `campaignKeyword`, `status`, `predict`, `startDate`, `endDate`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Cloud Computing Campaign', 'Cloud Computing Campaigns are strategic initiatives aimed at promoting the adoption and use of cloud computing technology. These campaigns can take various forms, but they generally include the following elements: 1. Education and Awareness: The campaign seeks to educate potential users about the benefits of cloud computing. This includes explaining what cloud computing is, how it works, and how it can benefit businesses and individuals. This is often done through webinars, workshops, and informational content', '2023-12-15 05:45:41', '#Campagin#ClooudComputing#Tech', 1, '{\"agriculture\":0.3615926504135132,\"datascience\":0.22795680165290833,\"etldeveloper\":0.09118685126304626,\"javadeveloper\":0.07652974873781204,\"testing\":0.072756826877594,\"digitalmedia\":0.027260495349764824,\"informationtechnology\":0.026594217866659164,\"publicrelations\":0.021446436643600464,\"automationtesting\":0.015308167785406113,\"webdesigning\":0.013020997866988182}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:32:51', '2023-12-15 22:32:51'),
(2, 1, 'Sales Marketing', 'Sales Recruitment Campaigns are strategic initiatives aimed at attracting talented sales professionals to join our team. These campaigns educate potential candidates about the benefits of being part of our sales team, including our sales philosophy, the advanced tools and resources we provide, and how our team-oriented approach can lead to individual and collective success. We highlight the opportunities for professional growth within our organization, including continuous training, performance-based incentives, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our sales professionals, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our sales team has on the business, reinforcing the meaningful and rewarding nature of the work. Through these strategic initiatives, we aim to attract dedicated, ambitious, and highly skilled sales professionals to drive our business growth and success.', '2023-12-15 05:45:41', '#Sales#Marketing#SalesMan', 1, '{\"sales\":0.9846816062927246,\"consultant\":0.002476699184626341,\"dotnetdeveloper\":0.002215086715295911,\"apparel\":0.0020521439146250486,\"advocate\":0.001494648982770741,\"etldeveloper\":0.0010573449544608593,\"agriculture\":0.0009041820303536952,\"informationtechnology\":0.0006881761364638805,\"mechanicalengineer\":0.0006332300836220384,\"arts\":0.0005845520063303411}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:33:43', '2023-12-15 22:33:43'),
(3, 1, 'Doctors | Doctor Specialist', 'Doctor Recruitment Campaigns are strategic initiatives aimed at attracting qualified medical professionals to join our healthcare team. These campaigns educate potential candidates about the benefits of joining our team, including our healthcare philosophy, the state-of-the-art facilities we offer, and how our team approach can benefit both doctors and patients. This is often done through webinars, workshops, and informational content. We highlight the opportunities for professional growth within our organization, including continuing education, research opportunities, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our doctors, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our doctors have on the community, reinforcing the meaningful and rewarding nature of the work. Through these strategic initiatives, we aim to attract dedicated, compassionate, and highly skilled doctors to provide the best possible care for our patients.', '2023-12-15 05:45:41', '#Health #Doctor', 1, '{\"datascience\":0.1506699174642563,\"agriculture\":0.137562558054924,\"etldeveloper\":0.1297234445810318,\"digitalmedia\":0.10639690607786179,\"automobile\":0.0680154487490654,\"testing\":0.06713717430830002,\"healthcare\":0.06580715626478195,\"publicrelations\":0.059722382575273514,\"dotnetdeveloper\":0.05762157961726189,\"consultant\":0.02292294055223465}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:34:23', '2023-12-15 22:34:23'),
(4, 1, 'Match Teacher', 'Teacher Recruitment Campaigns are strategic initiatives aimed at attracting dedicated and passionate educators to join our academic team. These campaigns educate potential candidates about the benefits of being part of our educational community, including our teaching philosophy, the advanced resources we provide, and how our collaborative approach can lead to enriching learning experiences. We highlight the opportunities for professional growth within our organization, including continuous professional development, diverse teaching experiences, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our teachers, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our teachers have on students’ lives, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, innovative, and highly skilled teachers to inspire and shape the minds of our students.', '2023-12-15 05:45:41', '#Teaacher#School', 1, '{\"teacher\":0.9743374586105347,\"agriculture\":0.005944987293332815,\"testing\":0.0056367176584899426,\"digitalmedia\":0.005280619487166405,\"consultant\":0.00275214365683496,\"devopsengineer\":0.0017732955748215318,\"etldeveloper\":0.0017136321403086185,\"arts\":0.001377080101519823,\"publicrelations\":0.00019461516058072448,\"automationtesting\":0.0001886307290988043}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:35:18', '2023-12-15 22:35:18'),
(5, 1, 'Advocate', 'Advocate Recruitment Campaigns are strategic initiatives aimed at attracting skilled and dedicated legal professionals to join our team. These campaigns educate potential candidates about the benefits of being part of our legal community, including our advocacy philosophy, the advanced resources we provide, and how our collaborative approach can lead to successful legal outcomes. We highlight the opportunities for professional growth within our organization, including continuous legal education, diverse case experiences, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our advocates, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our advocates have on our clients’ lives, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, ethical, and highly skilled advocates to represent and protect the interests of our clients.', '2023-12-15 05:45:41', '#Advocate', 1, '{\"advocate\":0.9999810457229614,\"testing\":0.000008912154044082854,\"businessdevelopment\":0.000007880024895712268,\"networksecurityengineer\":0.0000010983720812873798,\"javadeveloper\":6.286988991632825e-7,\"sales\":1.488540419813944e-7,\"digitalmedia\":8.786511074276859e-8,\"aviation\":7.070953955690129e-8,\"apparel\":6.821790776712078e-8,\"dotnetdeveloper\":5.263112257125613e-8}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:36:21', '2023-12-15 22:36:21'),
(6, 1, 'Consultant', 'Consultant Recruitment Campaigns are strategic initiatives aimed at attracting skilled and experienced consultants to join our team. These campaigns educate potential candidates about the benefits of being part of our consulting community, including our consulting philosophy, the advanced tools and methodologies we use, and how our collaborative approach can lead to successful client outcomes. We highlight the opportunities for professional growth within our organization, including continuous learning, exposure to diverse projects, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our consultants, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our consultants have on our clients’ businesses, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, analytical, and highly skilled consultants to drive our clients’ success and growth.', '2023-12-15 05:45:41', '#Consultant', 1, '{\"consultant\":0.9949232935905457,\"etldeveloper\":0.002279971493408084,\"digitalmedia\":0.0005558679695241153,\"automationtesting\":0.00037800174322910607,\"sales\":0.0002843596739694476,\"testing\":0.00023552650236524642,\"datascience\":0.0002306454407516867,\"agriculture\":0.00021671474678441882,\"hr\":0.00021287564595695585,\"publicrelations\":0.00020331749692559242}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 22:36:48', '2023-12-15 22:36:48'),
(7, 1, 'Cloud Tech Talent Drive', 'Our Cloud Computing and Backend Development Recruitment Campaign is a strategic initiative aimed at attracting professionals who are passionate about leveraging technology to drive business growth. We offer continuous learning opportunities, exposure to diverse projects, and potential for advancement. We emphasize a healthy work-life balance with flexible scheduling options and personal well-being support. Our campaign showcases the meaningful and rewarding nature of the profession, aiming to attract dedicated, innovative, and highly skilled professionals. We value leadership skills and project management experience, making our campaign suitable for individuals who have led teams and managed projects successfully. We appreciate individuals who are eager to learn, explore new technologies, and contribute to digital transformation using web and cloud technologies. Our campaign is designed to attract professionals who are skilled in Cloud Computing and Backend Development, possess strong leadership skills, a passion for learning, and a vision for leveraging technology to drive business growth.', '2023-12-15 05:45:41', '#informationtechnology#webdesigning', 1, '{\"agriculture\":0.3704119920730591,\"datascience\":0.21803919970989227,\"informationtechnology\":0.08822263777256012,\"javadeveloper\":0.0528440922498703,\"digitalmedia\":0.04485607147216797,\"publicrelations\":0.04208586737513542,\"testing\":0.037154536694288254,\"etldeveloper\":0.02869691513478756,\"webdesigning\":0.013683721423149109,\"sapdeveloper\":0.01269339956343174}', '2023-11-29 13:58:43', '2023-11-29 13:58:43', '2023-12-15 23:37:10', '2023-12-15 23:37:10');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('001-create-users.js'),
('002-create-batchs.js'),
('003-create-applyments.js'),
('20231122030306-create-user.js'),
('20231122032127-create-users.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `isCustomer` tinyint(1) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT 0,
  `status` tinyint(1) DEFAULT 0,
  `job` varchar(255) DEFAULT NULL,
  `sex` enum('MALE','FEMALE') DEFAULT 'MALE',
  `address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `predict` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`predict`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `token`, `resume`, `profile`, `isCustomer`, `isAdmin`, `status`, `job`, `sex`, `address`, `website`, `description`, `phone`, `predict`, `createdAt`, `updatedAt`) VALUES
(1, 'Asus', 'Company', 'asus@gmail.com', 'U2FsdGVkX1/+AOJOGmu6bCL9Sec3AWhdm7mco/u2Weg=', NULL, NULL, NULL, 1, 0, 0, NULL, 'MALE', 'Jln Linggarjati no 5A', 'www.asus.com', 'Advanced Tech Co. is an innovative technology company dedicated to creating impactful digital solutions. /n We focus on developing products and services that leverage cutting-edge technologies such as Cloud Computing, Artificial Intelligence, and Machine Learning to help businesses and individuals navigate the digital world more efficiently and effectively. /n We believe that technology is the key to unlocking limitless potential and we are committed to bringing this technology into the hands of our customers. /n Our team consists of experienced and talented experts in various technology disciplines, dedicated to creating innovative, reliable, and sustainable solutions. /n At Advanced Tech Co., we strive to create an inclusive and diverse work environment, where every team member feels valued, respected, and empowered to reach their full potential. /n We believe that by working together, we can create technology that can change the world', '+061782828', NULL, '2023-12-16 16:18:25', '2023-12-16 16:18:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applyments`
--
ALTER TABLE `applyments`
  ADD PRIMARY KEY (`applyId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `batchId` (`batchId`);

--
-- Indexes for table `batchs`
--
ALTER TABLE `batchs`
  ADD PRIMARY KEY (`batchId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applyments`
--
ALTER TABLE `applyments`
  MODIFY `applyId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `batchs`
--
ALTER TABLE `batchs`
  MODIFY `batchId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applyments`
--
ALTER TABLE `applyments`
  ADD CONSTRAINT `applyments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL,
  ADD CONSTRAINT `applyments_ibfk_2` FOREIGN KEY (`batchId`) REFERENCES `batchs` (`batchId`) ON DELETE SET NULL;

--
-- Constraints for table `batchs`
--
ALTER TABLE `batchs`
  ADD CONSTRAINT `batchs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
