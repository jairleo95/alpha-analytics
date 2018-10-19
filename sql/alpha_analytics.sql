-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2018 a las 21:55:49
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alpha_analytics`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_channel_access` (IN `spIdChannelAccess` INT)  begin UPDATE channel_access set record_status=0 where id_channel_access = spIdChannelAccess; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_digital_channel` (`id_digital_channel` INT)  begin UPDATE digital_channel set recordStatus=0 where id_digital_channel = spIdDigitalChannel; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_kpi` (IN `spIdKpi` INT)  begin UPDATE kpi set record_status=0 where id_kpi = spIdKpi; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_metric` (`id_metric` INT)  begin UPDATE metric set recordStatus=0 where id_metric = spIdMetric; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_metric_detail` (`id_metric_detail` INT)  begin UPDATE metric_detail set recordStatus=0 where id_metric_detail = spIdMetricDetail; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_target` (IN `spIdTarget` INT)  begin UPDATE target set record_status=0 where id_target = spIdTarget; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_token` (IN `spIdToken` INT)  begin UPDATE token set record_status=0 where id_token = spIdToken; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_user_data` (IN `spIdUser` INT)  begin UPDATE user_data set record_status=0 where id_user = spIdUser; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_channel_access` (IN `spIdDigitalChannel` INT, IN `spPageId` CHAR(100), IN `spAppId` CHAR(100), IN `spAppSecret` CHAR(100), IN `spAddress` CHAR(100), IN `spRecordStatus` INT, OUT `spIdChannelAccess` INT)  begin INSERT INTO channel_access(id_digital_channel,page_id,app_id,app_secret,address,record_status) values (spIdDigitalChannel,spPageId,spAppId,spAppSecret,spAddress,spRecordStatus);set spIdChannelAccess =LAST_INSERT_ID(); END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_digital_channel` (`spName` VARCHAR(200), `spChannelType` CHAR(1))  begin INSERT INTO digital_channel(name,channel_type) values (spName,spChannelType); END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_kpi` (IN `spIdTarget` INT, IN `spIdMetricDetail` INT, IN `spName` CHAR(200), IN `spTarget` DECIMAL, IN `spRecordStatus` TINYINT, OUT `spIdKpi` INT)  begin INSERT INTO kpi(id_target,id_metric_detail,name,target,record_status) values (spIdTarget,spIdMetricDetail,spName,spTarget,spRecordStatus);
set spIdKpi =LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_metric` (`spName` VARCHAR(50), `spDescription` VARCHAR(50), `spCode` CHAR(3), `spFormula` CHAR(30), `spRecordStatus` TINYINT)  begin INSERT INTO metric(name,description,code,formula,record_status) values (spName,spDescription,spCode,spFormula,spRecordStatus); END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_metric_detail` (`spIdDigitalChannel` INT, `spIdMetric` INT, `spRecordStatus` TINYINT)  begin INSERT INTO metric_detail(id_digital_channel,id_metric,record_status) values (spIdDigitalChannel,spIdMetric,spRecordStatus); END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_target` (IN `spIdUser` INT, IN `spName` VARCHAR(100), IN `spDescription` VARCHAR(200), IN `spInitDate` DATE, IN `spFinishDate` DATE, IN `spRecordStatus` TINYINT, OUT `spIdTarget` INT)  begin INSERT INTO target(id_user,name,description,init_date,finish_date,record_status) values (spIdUser,spName,spDescription,spInitDate,spFinishDate,spRecordStatus); 
set spIdTarget =LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_token` (IN `spIdChannelAccess` INT, IN `spStringToken` CHAR(255), IN `spExpirationDate` DATE, IN `spTokenType` CHAR(4), IN `spRecordStatus` TINYINT, OUT `spIdToken` INT)  begin INSERT INTO token(id_channel_access,string_token,expiration_date,token_type,record_status) values (spIdChannelAccess,spStringToken,spExpirationDate,spTokenType,spRecordStatus); 
set spIdToken =LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_user_data` (IN `spUsername` CHAR(50), IN `spUserPassword` CHAR(64), IN `spEmail` VARCHAR(100), IN `spFullName` VARCHAR(50), IN `spLastName` VARCHAR(50), IN `spGender` CHAR(1), IN `spDocumentType` CHAR(1), IN `spDocummentNumber` VARCHAR(10), IN `spCellphone` VARCHAR(20), IN `spBirthdate` DATE, IN `spRecordStatus` CHAR(1), OUT `spIdUser` INT)  begin INSERT INTO user_data(username,user_password,email,full_name,last_name,gender,document_type,documment_number,cellphone,birthdate,record_status) values (spUsername,spUserPassword,spEmail,spFullName,spLastName,spGender,spDocumentType,spDocummentNumber,spCellphone,spBirthdate,spRecordStatus);
set spIdUser =LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_channel_access` (`spIdDigitalChannel` INT, `spPageId` CHAR(100), `spAppId` CHAR(100), `spAppSecret` CHAR(100), `spAddress` CHAR(100), `spRecordStatus` INT)  begin UPDATE channel_access set id_channel_access=spIdChannelAccess,id_digital_channel=spIdDigitalChannel, id_digital_channel=spIdDigitalChannel,page_id=spPageId, page_id=spPageId,app_id=spAppId, app_id=spAppId,app_secret=spAppSecret, app_secret=spAppSecret,address=spAddress, address=spAddress,record_status=spRecordStatus, record_status=spRecordStatus where id_channel_access = spIdChannelAccess; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_digital_channel` (`spName` VARCHAR(200), `spChannelType` CHAR(1))  begin UPDATE digital_channel set id_digital_channel=spIdDigitalChannel,name=spName, name=spName,channel_type=spChannelType, channel_type=spChannelType where id_digital_channel = spIdDigitalChannel; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_kpi` (IN `spIdTarget` INT, IN `spIdMetricDetail` INT, IN `spName` CHAR(200), IN `spTarget` DECIMAL, IN `spRecordStatus` TINYINT, IN `spIdKpi` INT)  begin UPDATE kpi set id_kpi=spIdKpi,id_target=spIdTarget, id_target=spIdTarget,id_metric_detail=spIdMetricDetail, id_metric_detail=spIdMetricDetail,name=spName, name=spName,target=spTarget, target=spTarget,record_status=spRecordStatus, record_status=spRecordStatus where id_kpi = spIdKpi; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_metric` (`spName` VARCHAR(50), `spDescription` VARCHAR(50), `spCode` CHAR(3), `spFormula` CHAR(30), `spRecordStatus` TINYINT)  begin UPDATE metric set id_metric=spIdMetric,name=spName, name=spName,description=spDescription, description=spDescription,code=spCode, code=spCode,formula=spFormula, formula=spFormula,record_status=spRecordStatus, record_status=spRecordStatus where id_metric = spIdMetric; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_metric_detail` (`spIdDigitalChannel` INT, `spIdMetric` INT, `spRecordStatus` TINYINT)  begin UPDATE metric_detail set id_metric_detail=spIdMetricDetail,id_digital_channel=spIdDigitalChannel, id_digital_channel=spIdDigitalChannel,id_metric=spIdMetric, id_metric=spIdMetric,record_status=spRecordStatus, record_status=spRecordStatus where id_metric_detail = spIdMetricDetail; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_target` (IN `spIdUser` INT, IN `spName` VARCHAR(100), IN `spDescription` VARCHAR(200), IN `spInitDate` DATE, IN `spFinishDate` DATE, IN `spRecordStatus` TINYINT, IN `spIdTarget` INT)  begin UPDATE target set id_user=spIdUser, id_user=spIdUser,name=spName, name=spName,description=spDescription, description=spDescription,init_date=spInitDate, init_date=spInitDate,finish_date=spFinishDate, finish_date=spFinishDate,record_status=spRecordStatus, record_status=spRecordStatus where id_target = spIdTarget; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_token` (`spIdChannelAccess` INT, `spStringToken` CHAR(255), `spExpirationDate` DATE, `spTokenType` CHAR(4), `spRecordStatus` TINYINT)  begin UPDATE token set id_token=spIdToken,id_channel_access=spIdChannelAccess, id_channel_access=spIdChannelAccess,string_token=spStringToken, string_token=spStringToken,expiration_date=spExpirationDate, expiration_date=spExpirationDate,token_type=spTokenType, token_type=spTokenType,record_status=spRecordStatus, record_status=spRecordStatus where id_token = spIdToken; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_user_data` (IN `spUsername` CHAR(50), IN `spUserPassword` CHAR(64), IN `spEmail` VARCHAR(100), IN `spFullName` VARCHAR(50), IN `spLastName` VARCHAR(50), IN `spGender` CHAR(1), IN `spDocumentType` CHAR(1), IN `spDocummentNumber` VARCHAR(10), IN `spCellphone` VARCHAR(20), IN `spBirthdate` DATE, IN `spRecordStatus` CHAR(1), IN `spIdUser` INT)  begin UPDATE user_data set username=spUsername, username=spUsername,user_password=spUserPassword, user_password=spUserPassword,email=spEmail, email=spEmail,full_name=spFullName, full_name=spFullName,last_name=spLastName, last_name=spLastName,gender=spGender, gender=spGender,document_type=spDocumentType, document_type=spDocumentType,documment_number=spDocummentNumber, documment_number=spDocummentNumber,cellphone=spCellphone, cellphone=spCellphone,birthdate=spBirthdate, birthdate=spBirthdate,record_status=spRecordStatus, record_status=spRecordStatus where id_user = spIdUser; END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channel_access`
--

CREATE TABLE `channel_access` (
  `id_channel_access` int(10) UNSIGNED NOT NULL,
  `id_digital_channel` int(10) UNSIGNED NOT NULL,
  `page_id` char(100) DEFAULT NULL,
  `app_id` char(100) DEFAULT NULL,
  `app_secret` char(100) DEFAULT NULL,
  `address` char(100) DEFAULT NULL,
  `record_status` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `channel_access`
--

INSERT INTO `channel_access` (`id_channel_access`, `id_digital_channel`, `page_id`, `app_id`, `app_secret`, `address`, `record_status`) VALUES
(3, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(4, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(5, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(6, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(7, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(8, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 0),
(9, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1),
(10, 1, 'fegosknq3p04924592jwegjneetetet3495', '23423434543556456', 'asdadadadadqweqe344qccdasd3434', 'https://www.facebook.com/', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `digital_channel`
--

CREATE TABLE `digital_channel` (
  `id_digital_channel` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `channel_type` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `digital_channel`
--

INSERT INTO `digital_channel` (`id_digital_channel`, `name`, `channel_type`) VALUES
(1, 'Facebook', 'F'),
(2, 'Youtube', 'Y');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kpi`
--

CREATE TABLE `kpi` (
  `id_kpi` int(10) UNSIGNED NOT NULL,
  `id_target` int(10) UNSIGNED NOT NULL,
  `id_metric_detail` int(10) UNSIGNED NOT NULL,
  `name` char(200) DEFAULT NULL,
  `target` decimal(10,0) NOT NULL,
  `record_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `kpi`
--

INSERT INTO `kpi` (`id_kpi`, `id_target`, `id_metric_detail`, `name`, `target`, `record_status`) VALUES
(1, 1, 1, '352oiguhso444433333s3434342sdgsfgssdg4', '34343', 0),
(4, 1, 1, 'werwdwrwersdsfsdfsf', '34', 1),
(5, 1, 1, '33', '34', 1),
(6, 1, 1, '332', '34', 1),
(7, 1, 1, '33232', '34', 1),
(8, 1, 1, '33233242', '34', 1),
(9, 1, 1, '3323233242', '34', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metric`
--

CREATE TABLE `metric` (
  `id_metric` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `code` char(3) NOT NULL,
  `formula` char(30) DEFAULT NULL,
  `record_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `metric`
--

INSERT INTO `metric` (`id_metric`, `name`, `description`, `code`, `formula`, `record_status`) VALUES
(1, 'bounce rate', 'lgshfgksfgñlsfgkjshg', 'BR', NULL, 1),
(2, 'Visits', 'asdiajd939833737', 'VS', NULL, 1),
(3, 'dadfsdfsdf', 'sdfsdf', '1', '3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metric_detail`
--

CREATE TABLE `metric_detail` (
  `id_metric_detail` int(10) UNSIGNED NOT NULL,
  `id_digital_channel` int(10) UNSIGNED NOT NULL,
  `id_metric` int(10) UNSIGNED NOT NULL,
  `record_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `metric_detail`
--

INSERT INTO `metric_detail` (`id_metric_detail`, `id_digital_channel`, `id_metric`, `record_status`) VALUES
(1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `target`
--

CREATE TABLE `target` (
  `id_target` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `init_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `record_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `target`
--

INSERT INTO `target` (`id_target`, `id_user`, `name`, `description`, `init_date`, `finish_date`, `record_status`) VALUES
(1, 5, 'Aumentar visibilidad en 333', 'sdfsdfsdf334asdasd34', '2018-04-23', '2018-04-30', 1),
(2, 5, 'Aumentar visibilidad en facebook', 'sdfsdfsdf33434', '2018-04-23', '2018-04-30', 1),
(3, 5, 'Aumentar visibilidad en facebook 2', 'sd34sdss4', '2018-04-23', '2018-04-30', 1),
(4, 5, 'Aumentar visibilidad en facebook 3', 'sd34sdss4', '2018-04-23', '2018-04-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

CREATE TABLE `token` (
  `id_token` int(10) UNSIGNED NOT NULL,
  `id_channel_access` int(10) UNSIGNED NOT NULL,
  `string_token` char(255) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `token_type` char(4) DEFAULT NULL,
  `record_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `token`
--

INSERT INTO `token` (`id_token`, `id_channel_access`, `string_token`, `expiration_date`, `token_type`, `record_status`) VALUES
(1, 3, 'asd45345rtwrtwertwert34523452345ergergw452452452345234523f', '2018-04-11', '123', 0),
(4, 3, 'asd45345rtwrtwertwert34523452345ergergw452452452345234523ssdsdsdsdf', '2018-04-11', '123', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_data`
--

CREATE TABLE `user_data` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `username` char(50) NOT NULL,
  `user_password` char(64) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `document_type` char(1) DEFAULT NULL,
  `documment_number` varchar(10) DEFAULT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `record_status` char(1) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_data`
--

INSERT INTO `user_data` (`id_user`, `username`, `user_password`, `email`, `full_name`, `last_name`, `gender`, `document_type`, `documment_number`, `cellphone`, `birthdate`, `record_status`) VALUES
(5, 'jairleo95', '$2a$10$vYMrxfiWPD0zRKpu1e/DnebAJIOm9Lcg6EjT2kyX2Qdr9AoEzh1ym', 'jairleo95@gmail.com', 'Jair', 'Santos', '1', '1', '76521399', '955250060', '1995-08-07', '1'),
(13, 'alex1', '$2a$10$zK2IlOgp4pd4h0D/GDri8e.P3ngxXlCYaXp76WjsgwW9HGYN.DeaS', 'alex1@gmail.com', 'alex1', 'diaz1', '1', '1', '123456789', '955250060', '1995-08-06', '0'),
(15, 'alex2', '$2a$10$774.CXNRwkX6kgz8PHnGXeTQR7TPCmETM3.5LhDrWqAUSlmeImEe.', 'alex2@gmail.com', 'alex2', 'diaz2', '1', '1', '123456789', '955250060', '1995-08-06', '0'),
(20, 'alex3', '$2a$10$5FgdBjlSSXLmwfuFxJsMOOnxiYj33wJ6PTysxx26XgW6IdZQACn86', 'alex2@gmail.com', 'alexxxx', 'diazzzz', '1', '1', '123456789', '955250060', '1995-08-06', '0'),
(21, 'alex23', '$2a$10$VQ2DCQYQrIdzKhktuqFXTuNhH9qWpu3Hf.Qk/n1M73OkgIj85Fg1u', 'alex2@gmail.com', 'alex2', 'diaz2', '1', '1', '123456789', '955250060', '1995-08-06', '1'),
(22, 'alex23er', '$2a$10$qS/snOq9GvwM5a5NNqp55.oT1vZ6ZV4SyvaIzsmyBopDZCDpKZmvm', 'alex2@gmail.com', 'alex2', 'diaz2', '1', '1', '123456789', '955250060', '1995-08-06', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `channel_access`
--
ALTER TABLE `channel_access`
  ADD PRIMARY KEY (`id_channel_access`),
  ADD KEY `id_digital_channel` (`id_digital_channel`);

--
-- Indices de la tabla `digital_channel`
--
ALTER TABLE `digital_channel`
  ADD PRIMARY KEY (`id_digital_channel`);

--
-- Indices de la tabla `kpi`
--
ALTER TABLE `kpi`
  ADD PRIMARY KEY (`id_kpi`),
  ADD KEY `id_target` (`id_target`),
  ADD KEY `id_metric_detail` (`id_metric_detail`);

--
-- Indices de la tabla `metric`
--
ALTER TABLE `metric`
  ADD PRIMARY KEY (`id_metric`);

--
-- Indices de la tabla `metric_detail`
--
ALTER TABLE `metric_detail`
  ADD PRIMARY KEY (`id_metric_detail`),
  ADD KEY `id_metric` (`id_metric`),
  ADD KEY `id_digital_channel` (`id_digital_channel`);

--
-- Indices de la tabla `target`
--
ALTER TABLE `target`
  ADD PRIMARY KEY (`id_target`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `id_channel_access` (`id_channel_access`);

--
-- Indices de la tabla `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `channel_access`
--
ALTER TABLE `channel_access`
  MODIFY `id_channel_access` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `digital_channel`
--
ALTER TABLE `digital_channel`
  MODIFY `id_digital_channel` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `kpi`
--
ALTER TABLE `kpi`
  MODIFY `id_kpi` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `metric`
--
ALTER TABLE `metric`
  MODIFY `id_metric` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `metric_detail`
--
ALTER TABLE `metric_detail`
  MODIFY `id_metric_detail` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `target`
--
ALTER TABLE `target`
  MODIFY `id_target` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `token`
--
ALTER TABLE `token`
  MODIFY `id_token` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `channel_access`
--
ALTER TABLE `channel_access`
  ADD CONSTRAINT `channel_access_ibfk_1` FOREIGN KEY (`id_digital_channel`) REFERENCES `digital_channel` (`id_digital_channel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `kpi`
--
ALTER TABLE `kpi`
  ADD CONSTRAINT `kpi_ibfk_1` FOREIGN KEY (`id_target`) REFERENCES `target` (`id_target`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `kpi_ibfk_2` FOREIGN KEY (`id_metric_detail`) REFERENCES `metric_detail` (`id_metric_detail`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `metric_detail`
--
ALTER TABLE `metric_detail`
  ADD CONSTRAINT `metric_detail_ibfk_1` FOREIGN KEY (`id_metric`) REFERENCES `metric` (`id_metric`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `metric_detail_ibfk_2` FOREIGN KEY (`id_digital_channel`) REFERENCES `digital_channel` (`id_digital_channel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `target`
--
ALTER TABLE `target`
  ADD CONSTRAINT `target_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_data` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`id_channel_access`) REFERENCES `channel_access` (`id_channel_access`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
