-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2020 a las 12:06:01
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `g2p`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `partido_id` int(11) NOT NULL,
  `capitan_first` int(11) NOT NULL,
  `capitan_second` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `equipo_id` int(30) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `juego_id` int(11) NOT NULL,
  `capitan` int(11) NOT NULL,
  `ganadas` int(4) NOT NULL,
  `perdidas` int(4) NOT NULL,
  `empatadas` int(4) NOT NULL,
  `jugadas` int(4) NOT NULL,
  `biografia` varchar(360) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`equipo_id`, `nombre`, `juego_id`, `capitan`, `ganadas`, `perdidas`, `empatadas`, `jugadas`, `biografia`) VALUES
(1, 'LOS TITALES', 1, 5, 10, 3, 4, 17, 'Somos los titanes AUGHGHGHGHG'),
(2, 'LOS CAMALEONES', 2, 4, 7, 1, 2, 10, 'Nos camuflamos entre los jugadores, camaleones al combate !!!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_torneos`
--

CREATE TABLE `equipos_torneos` (
  `torneo_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_usuario`
--

CREATE TABLE `equipo_usuario` (
  `usuario_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `juego_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `foto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`juego_id`, `nombre`, `foto`) VALUES
(1, 'LOL', ''),
(2, 'FIFA', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `mensaje_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
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
-- Estructura de tabla para la tabla `reglas`
--

CREATE TABLE `reglas` (
  `reglas_id` int(11) NOT NULL,
  `modo` enum('1 VS 1','11 VS 11','5 VS 5','2 VS 2') NOT NULL,
  `juego_id` int(11) NOT NULL,
  `descripcion` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reglas`
--

INSERT INTO `reglas` (`reglas_id`, `modo`, `juego_id`, `descripcion`) VALUES
(133, '5 VS 5', 1, '12111'),
(142, '11 VS 11', 2, '132');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `torneo_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `fecha` date NOT NULL,
  `fases` enum('semifinal','cuartos','octavos','dieciseisavos') NOT NULL,
  `reglas_id` int(11) NOT NULL,
  `hora` varchar(30) NOT NULL,
  `puntos` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneo_usuario`
--

CREATE TABLE `torneo_usuario` (
  `torneo_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
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
  `admin` enum('admin','user') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nickname`, `nombre`, `apellido`, `url_perfil`, `nacimiento`, `correo`, `nacionalidad`, `contrasena`, `biografia`, `admin`) VALUES
(4, 'joseh', 'Jose', 'Herrera', '', '1980-11-04', 'joseh@g2p.com', 'Española', 'pepitopalote', 'Hola soy el profe de codenotch y hago folladas mentales xd', 'user'),
(5, 'jorger', 'Jorge', 'Rodriguez', '', '1996-07-12', 'jorger@g2p.com', 'Española', 'pepitopalote', 'Hola soy jorge y juego al LOL\r\nIQ: 100000000', 'user'),
(64, 'cacaaaaa', 'Luis', 'Fernandez', 'assets/images/logo.png', '1999-10-21', 'lualfer99@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user'),
(67, 'luisfr', '2222', 'Fernandez', 'assets/images/2222671609212087203luisfr.jpg', '0000-00-00', 'lualfer99@gmail.com', 'Estados Unidos', 'vVOQRWUkcaZ7Ai3lrZi9cA==', '212121212', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `partido_id` (`partido_id`),
  ADD KEY `capitan_first` (`capitan_first`),
  ADD KEY `capitan_second` (`capitan_second`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`equipo_id`),
  ADD KEY `capitan` (`capitan`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indices de la tabla `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD KEY `torneo_id` (`torneo_id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD KEY `equipo_id` (`equipo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`juego_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`mensaje_id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`partido_id`),
  ADD KEY `equipo_first` (`equipo_first`),
  ADD KEY `equipo_second` (`equipo_second`),
  ADD KEY `torneo_id` (`torneo_id`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`reglas_id`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`torneo_id`),
  ADD KEY `reglas_id` (`reglas_id`);

--
-- Indices de la tabla `torneo_usuario`
--
ALTER TABLE `torneo_usuario`
  ADD KEY `torneo_id` (`torneo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `equipo_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `juego_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mensaje_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `partido_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `reglas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `torneo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`partido_id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`capitan_first`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`capitan_second`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`capitan`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `equipos_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Filtros para la tabla `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD CONSTRAINT `equipos_torneos_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`),
  ADD CONSTRAINT `equipos_torneos_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`);

--
-- Filtros para la tabla `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD CONSTRAINT `equipo_usuario_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`),
  ADD CONSTRAINT `equipo_usuario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`chat_id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_1` FOREIGN KEY (`equipo_first`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `partidos_ibfk_2` FOREIGN KEY (`equipo_second`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `partidos_ibfk_3` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`);

--
-- Filtros para la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD CONSTRAINT `reglas_ibfk_1` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Filtros para la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD CONSTRAINT `torneos_ibfk_1` FOREIGN KEY (`reglas_id`) REFERENCES `reglas` (`reglas_id`);

--
-- Filtros para la tabla `torneo_usuario`
--
ALTER TABLE `torneo_usuario`
  ADD CONSTRAINT `torneo_usuario_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`),
  ADD CONSTRAINT `torneo_usuario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
