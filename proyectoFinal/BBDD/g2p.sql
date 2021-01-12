-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-01-2021 a las 09:44:25
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
  `logo` longtext DEFAULT 'assets/images/logo.png',
  `juego_id` int(11) NOT NULL,
  `capitan` int(11) NOT NULL,
  `ganadas` int(4) NOT NULL,
  `perdidas` int(4) NOT NULL,
  `empatadas` int(4) NOT NULL,
  `jugadas` int(4) NOT NULL,
  `biografia` varchar(360) NOT NULL,
  `puntuacion` int(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`equipo_id`, `nombre`, `logo`, `juego_id`, `capitan`, `ganadas`, `perdidas`, `empatadas`, `jugadas`, `biografia`, `puntuacion`) VALUES
(5, 'LOS CAGAOS', 'assets/images/logo.png', 1, 67, 5, 6, 1, 12, 'xd', 200),
(6, 'LOS INTOCABLES2', 'assets/images/logo.png', 1, 4, 0, 0, 0, 0, 'xd', 100),
(7, 'LOS INTOCABLES3', 'assets/images/logo.png', 1, 75, 20, 5, 0, 25, 'xd', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_torneos`
--

CREATE TABLE `equipos_torneos` (
  `torneo_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos_torneos`
--

INSERT INTO `equipos_torneos` (`torneo_id`, `equipo_id`) VALUES
(4, 5),
(3, 7),
(4, 5),
(5, 5),
(3, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_usuario`
--

CREATE TABLE `equipo_usuario` (
  `usuario_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipo_usuario`
--

INSERT INTO `equipo_usuario` (`usuario_id`, `equipo_id`) VALUES
(75, 5),
(73, 5),
(86, 6),
(86, 7);

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
(1, 'LOL', 'd'),
(2, 'FIFA', 'x');

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
  `juego_id` int(11) DEFAULT NULL,
  `fecha` varchar(30) NOT NULL,
  `hora` varchar(30) DEFAULT NULL,
  `equipo_first` int(11) NOT NULL,
  `equipo_second` int(11) NOT NULL,
  `resultado_first` int(10) NOT NULL DEFAULT 0,
  `resultado_second` int(10) NOT NULL DEFAULT 0,
  `comentario` longtext NOT NULL DEFAULT '\'sin comentarios\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`partido_id`, `torneo_id`, `juego_id`, `fecha`, `hora`, `equipo_first`, `equipo_second`, `resultado_first`, `resultado_second`, `comentario`) VALUES
(1, 3, 1, '2021-01-06', '22:35', 5, 6, 5, 6, 'sin comentarios'),
(2, 3, 1, '1999-10-21', '22:20', 5, 7, 0, 0, 'sin comentarios'),
(3, 3, 2, '2020-12-31', '19:29', 5, 5, 0, 0, '');

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
(147, '1 VS 1', 1, '<p>1.Información General <br>\n            2.Cuentas <br>\n            <br>\n            Para la participación en cualquier evento online es necesario el tener indicado en la configuración del\n            perfil el Game ID (Nombre de Invocador) correspondiente. Es responsabilidad de cada jugador que el valor\n            indicado en cada caso sea correcto. Tener un Game ID mal cumplimentado puede suponer la expulsión de la\n            competición. <br>\n\n            2.1.Jugador <br>\n            <br>\n            Cada jugador, únicamente, puede poseer una cuenta en la web. Este puede configurar su cuenta como desee,\n            siempre y cuando los datos introducidos sean reales y veraces.<br>\n\n            Para la participación en cualquier torneo/evento online es necesario tener introducido tu “GameID” en la\n            configuración del perfil. Paso importante a realizar ya que tener un “GameID” mal introducido puede\n            suponer su expulsión de la competición, o en su defecto, la de su equipo.\n\n            Únicamente, un jugador/equipo no será expulsado de la competición si el correspondiente “GameID” está mal\n            cumplimentado debido a la introducción del TAG y no el “GameID” o un mínimo fallo en cuanto a caracteres\n            sobre el “GameID” original. Obviamente este jugador/equipo será advertido por la organización de que su\n            incorrecta cumplimentación de los datos, los cuales deberá corregir con la mayor brevedad posible.\n            Solamente podrá tener mal introducido su “GameID” una persona por equipo. De no ser así, tener a varios\n            jugadores con su “GameID” mal introducido, por pequeños que sean los errores, acarrearán las medidas\n            expuestas con anterioridad.<br>\n\n            Es, totalmente, responsabilidad de cada jugador que el valor introducido en cada paso sea correcto. Si\n            esto repercute a un equipo, la responsabilidad recae sobre este, sufriendo así las consecuencias.<br>\n\n            <br>\n            3.Competiciones<br>\n            <br>\n            3.1.Modo de juego<br>\n            <br>\n            El torneo será disputado en el modo “Torneo de Reclutamiento” y se jugarán en “El abismo de los\n            lamentos.<br>\n\n            El ganador de cada partida será el jugador que consiga uno de los siguientes objetivos:<br>\n            • El equipo rival se rinda (surrender).<br>\n            • Uno de los equipos destruye la primera torre del rival.<br>\n            • Conseguir un total de dos eliminaciones.<br>\n            <br>\n            3.2.Elección<br>\n            <br>\n            La fase de pick y bans será Blind Mode\n            <br>\n            4.Procedimiento del partido<br>\n            <br>\n            4.1.Antes del partido<br>\n            <br>\n            4.1.1.Ficha del partido<br>\n            Cuando un torneo comienza, automáticamente se crea en la web el partido en donde los jugadores de cada\n            equipo podrán: <br>\n            • Visualizar el “Nombre de Invocador” de cada uno de los miembros de ambos equipos. <br>\n            • Hablar con sus contrincantes por medio de comentarios. Estos comentarios solo podrán ser visualizados\n            por los integrantes del partido, es decir los miembros de ambos equipos, o en su defecto, si el encuentro\n            es individual, ambos jugadores. <br>\n            • Introducir el resultado del partido. <br>\n            • Abrir una protesta. <br>\n            <br>\n            4.1.2.Creador de la partida <br>\n            <br>\n            El encargado de crear la partida será el jugado que esté situado en la parte superior en el cuadro de\n            enfrentamientos. Si por cualquier motivo ambos llegáis a un acuerdo y la crea el otro jugador/equipo no\n            existe ningún problema. <br>\n\n            Las características que la partida debe contener están expuestas en el siguiente punto.<br>\n            <br>\n            4.1.3.Configuración del servidor<br>\n            <br>\n            La configuración de la partida deberá tener las siguientes características: <br>\n            • Nombre de la partida: Jugador/Equipo 1 vs Jugador/Equipo 2 <br>\n            • Ubicación del servidor: Europa Oeste (EU West) <br>\n            • Mapa: El abismo de los lamentos <br>\n            • Modo de juego: Blind Mode <br>\n            • Equipo inicial: (PUNTO 3.2) <br>\n            • Espectadores: Todos<br>\n            <br>\n            4.1.4.Tiempo de espera / no presentado<br>\n            <br>\n            Cuando uno de los dos jugadores/equipos no se presente, se conceden 15 minutos de cortesía para que éste\n            se presente. Si después de este tiempo no aparece, se le adjudicará una victoria por defecto (defwin) al\n            jugador/equipo que está presente en ese enfrentamiento. Dicho jugador/equipo presente, debe hacer constar\n            esto a los organizadores, mediante una protesta del tipo \"Oponente no presentado\", comunicando a los\n            árbitros que su rival no ha aparecido y estos actúen en consecuencia.\n            <br>\n            Si por cualquier motivo hace falta entregar pruebas. El capitan del equipo presente deberá enviar una\n            captura de pantalla de la partida creada, en la cual deberá verse el nombre de la partida, la invitación\n            al equipo rival, y la hora.\n          </p>'),
(148, '5 VS 5', 1, '<p>1.Información General <br>\n            2.Cuentas <br>\n            <br>\n            Para la participación en cualquier evento online es necesario el tener indicado en la configuración del\n            perfil el Game ID (Nombre de Invocador) correspondiente. Es responsabilidad de cada jugador que el valor\n            indicado en cada caso sea correcto. Tener un Game ID mal cumplimentado puede suponer la expulsión de la\n            competición. <br>\n\n            2.1.Jugador <br>\n            <br>\n            Cada jugador, únicamente, puede poseer una cuenta en la web. Este puede configurar su cuenta como desee,\n            siempre y cuando los datos introducidos sean reales y veraces.<br>\n\n            Para la participación en cualquier torneo/evento online es necesario tener introducido tu “GameID” en la\n            configuración del perfil. Paso importante a realizar ya que tener un “GameID” mal introducido puede\n            suponer su expulsión de la competición, o en su defecto, la de su equipo.\n\n            Únicamente, un jugador/equipo no será expulsado de la competición si el correspondiente “GameID” está mal\n            cumplimentado debido a la introducción del TAG y no el “GameID” o un mínimo fallo en cuanto a caracteres\n            sobre el “GameID” original. Obviamente este jugador/equipo será advertido por la organización de que su\n            incorrecta cumplimentación de los datos, los cuales deberá corregir con la mayor brevedad posible.\n            Solamente podrá tener mal introducido su “GameID” una persona por equipo. De no ser así, tener a varios\n            jugadores con su “GameID” mal introducido, por pequeños que sean los errores, acarrearán las medidas\n            expuestas con anterioridad.<br>\n\n            Es, totalmente, responsabilidad de cada jugador que el valor introducido en cada paso sea correcto. Si\n            esto repercute a un equipo, la responsabilidad recae sobre este, sufriendo así las consecuencias.<br>\n\n            <br>\n            2.2.1.Capitán <br>\n            <br>\n            Cada equipo deberá tener uno o varios capitanes, estos tendrán la posibilidad de abrir protestas para\n            mantener una línea directa con la administración y resolver encuentros con rivales no presentados,\n            incumplimientos del reglamento u otras cuestiones.<br>\n\n            Este se encargará de que los miembros de su equipo tengan introducidos correctamente el “Nombre de\n            Invocador” de forma correcta. Recordamos que este procedimientos es muy importante, ya que un equipo que\n            juegue con un jugador el cual no tenga su \"GameID\" introducido, acarreará una derrota en su\n            enfrentamiento, junto a la descalificación de la competición.<br>\n            <br>\n            2.2.2.Miembros <br>\n            <br>\n            Cada miembro del clan es un jugador, por lo que deberá cumplir con todo los expuesto en el punto 2.1.<br>\n\n            Todos los miembros del equipo pueden inscribir un equipo en cualquier competición siempre y cuando cumpla\n            los requisitos básicos.<br>\n\n            Un jugador nunca podrá competir con dos equipos diferentes en una misma competición. Si esto se detecta el\n            jugador será sancionado y los equipos expulsados de la competición.<br>\n\n            Queda totalmente prohibido añadir nuevos miembros al equipo durante el trascurso de un torneo. En caso de\n            realizarse esta acción, dicho equipo será expulsado de la competición inmediatamente.<br>\n            <br>\n            3.Competiciones<br>\n            <br>\n            3.1.Modo de juego<br>\n            <br>\n            El torneo será disputado en el modo “Torneo de Reclutamiento” y se jugarán en “La Grieta del\n            Invocador”.<br>\n\n            El ganador de cada partida será el equipo que consiga uno de los siguientes objetivos:<br>\n            • El equipo rival se rinda (surrender).<br>\n            • Uno de los equipos destruye la base del equipo rival.<br>\n            <br>\n            3.2.Primera elección (First Pick)<br>\n            <br>\n            El equipo que disponga de un mejor seeding, o en su defecto esté situado en la parte izquierda del\n            enfrentamiento y en la parte superior en el cuadro de enfrentamientos, tendrá “First Pick””.<br>\n\n            En el caso de que el torneo o la eliminatoria se disputen al mejor de tres o cinco partidas se irán\n            alternando las opciones no pudiendo repetir opción consecutivamente.<br>\n            <br>\n            4.Procedimiento del partido<br>\n            <br>\n            4.1.Antes del partido<br>\n            <br>\n            4.1.1.Ficha del partido<br>\n            Cuando un torneo comienza, automáticamente se crea en la web el partido en donde los jugadores de cada\n            equipo podrán: <br>\n            • Visualizar el “Nombre de Invocador” de cada uno de los miembros de ambos equipos. <br>\n            • Hablar con sus contrincantes por medio de comentarios. Estos comentarios solo podrán ser visualizados\n            por los integrantes del partido, es decir los miembros de ambos equipos, o en su defecto, si el encuentro\n            es individual, ambos jugadores. <br>\n            • Introducir el resultado del partido. <br>\n            • Abrir una protesta. <br>\n            <br>\n            4.1.2.Creador de la partida <br>\n            <br>\n            El encargado de crear la partida será el jugado que esté situado en la parte superior en el cuadro de\n            enfrentamientos. Si por cualquier motivo ambos llegáis a un acuerdo y la crea el otro jugador/equipo no\n            existe ningún problema. <br>\n\n            Las características que la partida debe contener están expuestas en el siguiente punto.<br>\n            <br>\n            4.1.3.Configuración del servidor<br>\n            <br>\n            La configuración de la partida deberá tener las siguientes características: <br>\n            • Nombre de la partida: Jugador/Equipo 1 vs Jugador/Equipo 2 <br>\n            • Ubicación del servidor: Europa Oeste (EU West) <br>\n            • Mapa: La Grieta del Invocador <br>\n            • Modo de juego: Torneo de Reclutamiento <br>\n            • Equipo inicial: (PUNTO 3.2) <br>\n            • Espectadores: Todos<br>\n            <br>\n            4.1.4.Tiempo de espera / no presentado<br>\n            <br>\n            Cuando uno de los dos jugadores/equipos no se presente, se conceden 15 minutos de cortesía para que éste\n            se presente. Si después de este tiempo no aparece, se le adjudicará una victoria por defecto (defwin) al\n            jugador/equipo que está presente en ese enfrentamiento. Dicho jugador/equipo presente, debe hacer constar\n            esto a los organizadores, mediante una protesta del tipo \"Oponente no presentado\", comunicando a los\n            árbitros que su rival no ha aparecido y estos actúen en consecuencia.\n            <br>\n            Si por cualquier motivo hace falta entregar pruebas. El capitan del equipo presente deberá enviar una\n            captura de pantalla de la partida creada, en la cual deberá verse el nombre de la partida, la invitación\n            al equipo rival, y la hora.\n          </p>'),
(149, '1 VS 1', 2, '<p>1.Información General <br>\n            2.Presentación <br>\n            <br>\n            2.1.Asistencia <br>\n            <br>\n            Tienes 10 minutos para poder presentarte en el chat de la hoja de partido a partir de la hora indicada en\n            \"Fecha de juego\". Una vez finalizado este tiempo el rival podrá reportar como “Rival no presentado”. <br>\n            <br>\n            2.2.Nombre de usuario<br>\n            <br>\n            El ID de los jugadores tiene que ser exactamente igual en la web como en el cliente de juego. En el caso\n            que no coincida en su totalidad será decisión del administrador si ese jugador puede disputar o no los\n            partidos. <br>\n            <br>\n            3.Creación de partida y restricciones<br>\n            <br>\n            3.1.Creación de partida. <br>\n            <br>\n            Los partidos se deben jugar siguiendo el siguiente procedimiento: <br>\n\n            • Agregar la ID del jugador rival a tu cuenta. <br>\n            • El jugador que aparezca en la parte superior de la tabla deberá crear una Temporada Amistosa Online en\n            la sección de FIFA Ultimate Team e invitar al rival. <br>\n            • Se deberá seguir las normas estipuladas por el torneo. <br>\n            <br>\n            3.2. Configuración y funcionamiento. <br>\n            <br>\n            Los desafíos se deben crear con la siguiente configuración y con las plantillas actualizadas. <br>\n\n            • Duración: 6 minutos por parte. <br>\n            • Tipo de partida: FIFA Ultimate Team. <br>\n            • Controles: Semiasistidos<br>\n            • Velocidad de juego: Normal<br>\n            • Tiempo: Sol / Despejado<br>\n            • En caso de empate se deberá jugar prórroga y penaltis<br>\n            <br>\n            Está prohibido el uso de la defensa clásica.\n          </p>'),
(150, '11 VS 11', 2, '<p>1.Información General <br>\n            2.Presentación <br>\n            <br>\n            2.1.Asistencia <br>\n            <br>\n            El equipo entero tiene 10 minutos para poder presentarte en el chat de la hoja de partido a partir de la\n            hora indicada en \"Fecha de juego\". Una vez finalizado este tiempo el rival podrá reportar como “Rival no\n            presentado”. <br>\n            <br>\n            2.2.Nombre de usuarios<br>\n            <br>\n            El ID de los jugadores tiene que ser exactamente igual en la web como en el cliente de juego. En el caso\n            que no coincida en su totalidad será decisión del administrador si ese jugador puede disputar o no los\n            partidos. <br>\n            <br>\n            3.Creación de partida y restricciones<br>\n            <br>\n            3.1.Creación de partida. <br>\n            <br>\n            Los partidos se deben jugar siguiendo el siguiente procedimiento: <br>\n\n            • Agregar la ID del jugador rival a tu cuenta. <br>\n            • El equipo que aparezca en la parte superior de la tabla deberá crear una Temporada Amistosa Online en la\n            sección de FIFA Ultimate Team e invitar al rival. <br>\n            • Se deberá seguir las normas estipuladas por el torneo. <br>\n            <br>\n            3.2. Configuración y funcionamiento. <br>\n            <br>\n            Los desafíos se deben crear con la siguiente configuración y con las plantillas actualizadas. <br>\n\n            • Duración: 6 minutos por parte. <br>\n            • Tipo de partida: FIFA Ultimate Champions. <br>\n            • Controles: Semiasistidos<br>\n            • Velocidad de juego: Normal<br>\n            • Tiempo: Sol / Despejado<br>\n            • En caso de empate se deberá jugar prórroga y penaltis<br>\n            <br>\n          </p>');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `torneo_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `fecha` varchar(30) NOT NULL,
  `fases` enum('semifinal','cuartos','octavos','dieciseisavos') NOT NULL,
  `reglas_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `hora` varchar(30) NOT NULL,
  `puntos` int(10) NOT NULL,
  `estado` enum('ACTIVO','FINALIZADO','PENDIENTE') NOT NULL DEFAULT 'PENDIENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`torneo_id`, `nombre`, `fecha`, `fases`, `reglas_id`, `game_id`, `hora`, `puntos`, `estado`) VALUES
(3, 'PAPO', '2021-01-14', 'semifinal', 149, 2, '20:30', 200, 'ACTIVO'),
(4, 'PAPO2', '2021-01-14', 'semifinal', 149, 2, '20:30', 200, 'PENDIENTE'),
(5, 'PAPO3', '2021-01-14', 'semifinal', 149, 2, '20:30', 200, 'FINALIZADO');

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
  `admin` enum('admin','user') DEFAULT NULL,
  `isBanned` tinyint(1) NOT NULL DEFAULT 0,
  `puntuacion` int(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nickname`, `nombre`, `apellido`, `url_perfil`, `nacimiento`, `correo`, `nacionalidad`, `contrasena`, `biografia`, `admin`, `isBanned`, `puntuacion`) VALUES
(4, 'joseh', 'Jose', 'Herrera', 'assets/images/Jose41609347944696joseh.jpg', '1980-11-03', 'joseh@g2p.com', 'Española', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'Hola soy el profe de codenotch y hago folladas mentales xd', 'user', 0, 50),
(67, 'luisfr', 'Luis ', 'Fernandez', 'assets/images/Luis 671610062219208luisfr.jpg', '1999-10-20', 'lualfer99@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', '¡Hola soy luis!', 'admin', 0, 40),
(73, 'asdasdasd', 'email', 'email', 'assets/images/logo.png', '2020-12-25', 'aasdas@asasd.com', 'Puerto Rico', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user', 0, 60),
(75, 'elpepe', 'elpepe', 'elpepe', 'assets/images/elpepe751610096221840elpepe.jpg', '2016-01-20', 'elpepe@gmail.com', 'Peru', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'elpepeasasdasdadsads', 'user', 1, 70),
(76, 'xpepe', 'Luis', 'Fernandez', 'assets/images/logo.png', '1999-10-21', 'pepitopalote@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user', 0, 100),
(85, 'xpepa3', 'Luisa', 'Fernandea', 'assets/images/logo.png', '1999-10-21', 'laasd@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user', 0, 7),
(86, 'xpepa311', 'Luisa', 'Fernandea', 'assets/images/logo.png', '1999-10-21', 'laasd@gmail.com', 'Espana', 'vVOQRWUkcaZ7Ai3lrZi9cA==', 'melachupas', 'user', 0, 65);

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
  ADD KEY `equipos_ibfk_1` (`capitan`),
  ADD KEY `equipos_ibfk_2` (`juego_id`);

--
-- Indices de la tabla `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD KEY `equipos_torneos_ibfk_1` (`torneo_id`),
  ADD KEY `equipos_torneos_ibfk_2` (`equipo_id`);

--
-- Indices de la tabla `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD KEY `equipo_usuario_ibfk_1` (`equipo_id`),
  ADD KEY `equipo_usuario_ibfk_2` (`usuario_id`);

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
  ADD KEY `mensajes_ibfk_1` (`chat_id`),
  ADD KEY `mensajes_ibfk_2` (`usuario_id`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`partido_id`),
  ADD KEY `partidos_ibfk_3` (`torneo_id`),
  ADD KEY `partidos_ibfk_4` (`equipo_first`),
  ADD KEY `partidos_ibfk_5` (`equipo_second`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`reglas_id`),
  ADD KEY `reglas_ibfk_1` (`juego_id`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`torneo_id`),
  ADD KEY `torneos_ibfk_1` (`reglas_id`),
  ADD KEY `torneos_ibfk_2` (`game_id`);

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
  MODIFY `equipo_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `partido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `reglas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `torneo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

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
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`capitan`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipos_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `equipos_torneos`
--
ALTER TABLE `equipos_torneos`
  ADD CONSTRAINT `equipos_torneos_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipos_torneos_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `equipo_usuario`
--
ALTER TABLE `equipo_usuario`
  ADD CONSTRAINT `equipo_usuario_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipo_usuario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`chat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_3` FOREIGN KEY (`torneo_id`) REFERENCES `torneos` (`torneo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `partidos_ibfk_4` FOREIGN KEY (`equipo_first`) REFERENCES `equipos` (`equipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `partidos_ibfk_5` FOREIGN KEY (`equipo_second`) REFERENCES `equipos` (`equipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `partidos_ibfk_6` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Filtros para la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD CONSTRAINT `reglas_ibfk_1` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD CONSTRAINT `torneos_ibfk_1` FOREIGN KEY (`reglas_id`) REFERENCES `reglas` (`reglas_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `torneos_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `juegos` (`juego_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
