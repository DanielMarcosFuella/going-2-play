-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2021 at 12:28 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g2p`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `partido_id` int(11) NOT NULL,
  `capitan_first` int(11) NOT NULL,
  `capitan_second` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `equipos`
--

CREATE TABLE `equipos` (
  `equipo_id` int(30) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `logo` varchar(900) NOT NULL,
  `juego_id` int(11) NOT NULL,
  `capitan` int(11) NOT NULL,
  `ganadas` int(4) NOT NULL DEFAULT 0,
  `perdidas` int(4) NOT NULL DEFAULT 0,
  `jugadas` int(4) NOT NULL DEFAULT 0,
  `biografia` varchar(360) NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipos`
--

INSERT INTO `equipos` (`equipo_id`, `nombre`, `logo`, `juego_id`, `capitan`, `ganadas`, `perdidas`, `jugadas`, `biografia`, `puntuacion`) VALUES
(1, 'Los papis', 'assets/images/logo.png', 1, 5, 10, 3, 17, 'Chomoloko', 0),
(2, 'LOS CAMALEONES', 'assets/images/logo.png', 2, 4, 7, 1, 10, 'Nos camuflamos entre los jugadores, camaleones al combate !!!', 0),
(8, 'Los colosos', 'assets/images/logo.png', 1, 4, 25, 0, 25, 'Vamonoh pal pary', 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipos_torneos`
--

CREATE TABLE `equipos_torneos` (
  `torneo_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `equipo_usuario`
--

CREATE TABLE `equipo_usuario` (
  `usuario_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipo_usuario`
--

INSERT INTO `equipo_usuario` (`usuario_id`, `equipo_id`) VALUES
(5, 2),
(4, 8),
(4, 8),
(67, 8),
(70, 8),
(71, 8);

-- --------------------------------------------------------

--
-- Table structure for table `juegos`
--

CREATE TABLE `juegos` (
  `juego_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `foto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `juegos`
--

INSERT INTO `juegos` (`juego_id`, `nombre`, `foto`) VALUES
(1, 'LOL', ''),
(2, 'FIFA', '');

-- --------------------------------------------------------

--
-- Table structure for table `mensajes`
--

CREATE TABLE `mensajes` (
  `mensaje_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `partidos`
--

CREATE TABLE `partidos` (
  `partido_id` int(11) NOT NULL,
  `torneo_id` int(11) NOT NULL,
  `equipo_first` int(11) NOT NULL,
  `equipo_second` int(11) NOT NULL,
  `resultado_first` int(10) NOT NULL,
  `resultado_second` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reglas`
--

CREATE TABLE `reglas` (
  `reglas_id` int(11) NOT NULL,
  `modo` enum('1 VS 1','11 VS 11','5 VS 5','2 VS 2') NOT NULL,
  `juego_id` int(11) NOT NULL,
  `descripcion` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reglas`
--

INSERT INTO `reglas` (`reglas_id`, `modo`, `juego_id`, `descripcion`) VALUES
(133, '5 VS 5', 1, '12111'),
(142, '11 VS 11', 2, '132');

-- --------------------------------------------------------

--
-- Table structure for table `torneos`
--

CREATE TABLE `torneos` (
  `torneo_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `juego` enum('FIFA','LOL') NOT NULL,
  `fecha` date NOT NULL,
  `fases` enum('semifinal','cuartos','octavos','dieciseisavos') NOT NULL,
  `reglas_id` int(11) NOT NULL,
  `hora` varchar(30) NOT NULL,
  `puntos` int(10) NOT NULL,
  `resultado` enum('ganado','perdido','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `torneos`
--

INSERT INTO `torneos` (`torneo_id`, `nombre`, `juego`, `fecha`, `fases`, `reglas_id`, `hora`, `puntos`, `resultado`) VALUES
(1, 'torneazo', '', '2021-01-13', 'semifinal', 133, '', 1000, 'ganado'),
(2, 'tornefaka', '', '2021-01-15', 'cuartos', 142, '', 5000, 'ganado');

-- --------------------------------------------------------

--
-- Table structure for table `torneo_usuario`
--

CREATE TABLE `torneo_usuario` (
  `torneo_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(90) NOT NULL,
  `url_perfil` longtext NOT NULL,
  `nacimiento` date NOT NULL,
  `correo` varchar(90) NOT NULL,
  `nacionalidad` varchar(30) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `biografia` varchar(360) NOT NULL,
  `admin` enum('admin','user') DEFAULT NULL,
  `isBanned` tinyint(1) NOT NULL DEFAULT 0,
  `puntuacion` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nickname`, `nombre`, `apellido`, `url_perfil`, `nacimiento`, `correo`, `nacionalidad`, `contrasena`, `biografia`, `admin`, `isBanned`, `puntuacion`) VALUES
(4, 'joseh', 'Jose', 'Herrera', '', '1980-11-04', 'joseh@g2p.com', 'Española', 'pepitopalote', 'Hola soy el profe de codenotch y hago folladas mentales xd', 'user', 0, 0),
(5, 'jorger', 'Jorge', 'Rodriguez', '', '1996-07-12', 'jorger@g2p.com', 'Española', 'pepitopalote', 'Hola soy jorge y juego al LOL\r\nIQ: 100000000', 'user', 0, 0),
(64, 'cacaaaaa', 'Luis', 'Fernandez', 'assets/images/logo.png', '1999-10-21', 'lualfer99@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user', 0, 0),
(67, 'luisfr', '2222', 'Fernandez', 'assets/images/2222671609212087203luisfr.jpg', '0000-00-00', 'lualfer99@gmail.com', 'Estados Unidos', 'vVOQRWUkcaZ7Ai3lrZi9cA==', '212121212', 'admin', 0, 0),
(70, 'surikato', 'urik', 'landa', 'sdsfd', '0000-00-00', 'ddsf', '', '', '', 'user', 0, 0),
(71, 'carollys', 'carolly', 'csdfs', 'fsd', '0000-00-00', '', '', '', '', NULL, 0, 0),
(72, '', '', '', '', '0000-00-00', '', '', '', '', 'user', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `partido_id` (`partido_id`),
  ADD KEY `capitan_first` (`capitan_first`),
  ADD KEY `capitan_second` (`capitan_second`);

--
-- Indexes for table `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`equipo_id`),
  ADD KEY `capitan` (`capitan`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indexes for table `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD KEY `torneo_id` (`torneo_id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indexes for table `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD KEY `equipo_id` (`equipo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`juego_id`);

--
-- Indexes for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`mensaje_id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`partido_id`),
  ADD KEY `equipo_first` (`equipo_first`),
  ADD KEY `equipo_second` (`equipo_second`),
  ADD KEY `torneo_id` (`torneo_id`);

--
-- Indexes for table `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`reglas_id`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indexes for table `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`torneo_id`),
  ADD KEY `reglas_id` (`reglas_id`);

--
-- Indexes for table `torneo_usuario`
--
ALTER TABLE `torneo_usuario`
  ADD KEY `torneo_id` (`torneo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equipos`
--
ALTER TABLE `equipos`
  MODIFY `equipo_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `juegos`
--
ALTER TABLE `juegos`
  MODIFY `juego_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mensaje_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partidos`
--
ALTER TABLE `partidos`
  MODIFY `partido_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reglas`
--
ALTER TABLE `reglas`
  MODIFY `reglas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `torneos`
--
ALTER TABLE `torneos`
  MODIFY `torneo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`partido_id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`capitan_first`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`capitan_second`) REFERENCES `usuarios` (`usuario_id`);

--
-- Constraints for table `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`capitan`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `equipos_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Constraints for table `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD CONSTRAINT `equipos_torneos_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`),
  ADD CONSTRAINT `equipos_torneos_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`);

--
-- Constraints for table `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD CONSTRAINT `equipo_usuario_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`),
  ADD CONSTRAINT `equipo_usuario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Constraints for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`chat_id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Constraints for table `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_1` FOREIGN KEY (`equipo_first`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `partidos_ibfk_2` FOREIGN KEY (`equipo_second`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `partidos_ibfk_3` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`);

--
-- Constraints for table `reglas`
--
ALTER TABLE `reglas`
  ADD CONSTRAINT `reglas_ibfk_1` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Constraints for table `torneos`
--
ALTER TABLE `torneos`
  ADD CONSTRAINT `torneos_ibfk_1` FOREIGN KEY (`reglas_id`) REFERENCES `reglas` (`reglas_id`);

--
-- Constraints for table `torneo_usuario`
--
ALTER TABLE `torneo_usuario`
  ADD CONSTRAINT `torneo_usuario_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`),
  ADD CONSTRAINT `torneo_usuario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
