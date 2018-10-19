CREATE TABLE DigitalChannel (
  idDigitalChannel INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  typeChannel CHAR(1) NOT NULL,
  PRIMARY KEY(idDigitalChannel)
);

CREATE TABLE UserData (
  idUser INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  userName CHAR(50) NOT NULL,
  userPassword CHAR(64) NULL,
  recordStatus CHAR(1) BINARY NULL,
  email VARCHAR(100) NULL,
  fullName VARCHAR(50) NULL,
  lastName VARCHAR(50) BINARY NULL,
  gender CHAR(1) NULL,
  documentType CHAR(1) NULL,
  documentNumber VARCHAR(10) NULL,
  cellphone VARCHAR(20) NULL,
  birthdate DATE NULL,
  PRIMARY KEY(idUser)
);

CREATE TABLE ChannelAccess (
  idChannelAcces INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  idDigitalChannel INTEGER UNSIGNED NOT NULL,
  pageId  CHAR(100) NULL,
  appId  CHAR(100) NULL,
  appSecret  CHAR(100) NULL,
  address CHAR(100) NULL,
  recordStatus INTEGER UNSIGNED NULL,
  PRIMARY KEY(idChannelAcces),
  FOREIGN KEY relDigitalChannelChannelAccess(idDigitalChannel)
    REFERENCES DigitalChannel(idDigitalChannel)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE BusinessTarget (
  idBusinessTarget INTEGER UNSIGNED NOT NULL,
  idUser INTEGER UNSIGNED NOT NULL,
  idDigitalChannel INTEGER UNSIGNED NOT NULL,
  name VARCHAR(100) NULL,
  description VARCHAR(200) NOT NULL,
  recordStatus BOOL NULL,
  PRIMARY KEY(idBusinessTarget),
  FOREIGN KEY relChannelAccessBusinessTarget(idDigitalChannel)
    REFERENCES DigitalChannel(idDigitalChannel)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY relUserDataBusinessTarget(idUser)
    REFERENCES UserData(idUser)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE PageToken (
  idpageToken INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  idChannelAcces INTEGER UNSIGNED NOT NULL,
  stringToken CHAR(255) NULL,
  expirationDate DATE NULL,
  recordStatus BOOL NULL,
  PRIMARY KEY(idpageToken),
  FOREIGN KEY relChannelAccessPageToken(idChannelAcces)
    REFERENCES ChannelAccess(idChannelAcces)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE KpiTarget (
  idKpiTarget INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  idBusinessTarget INTEGER UNSIGNED NOT NULL,
  kpiName CHAR(200) NULL,
  KpiTarget NUMERIC(10) NOT NULL,
  recordStatus BOOL NOT NULL,
  finishTargetDate INTEGER UNSIGNED NULL,
  PRIMARY KEY(idKpiTarget),
  FOREIGN KEY relBusinessTargetKpiTarget(idBusinessTarget)
    REFERENCES BusinessTarget(idBusinessTarget)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE SocialMediaMetricsTarget (
  idSocialMediaMetricsTarget INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  idKpiTarget INTEGER UNSIGNED NOT NULL,
  bounceRate NUMERIC NULL,
  numFans INTEGER UNSIGNED NULL,
  numTrafic INTEGER UNSIGNED NULL,
  sessions INTEGER UNSIGNED NULL,
  timeOnPage INTEGER UNSIGNED NULL,
  pageDepth INTEGER UNSIGNED NULL,
  scope INTEGER UNSIGNED NULL,
  targetDate INTEGER UNSIGNED NULL,
  recordStatus BOOL NULL,
  PRIMARY KEY(idSocialMediaMetricsTarget),
  FOREIGN KEY relKpiTargetSocialMediaMetricsTarget(idKpiTarget)
    REFERENCES KpiTarget(idKpiTarget)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);


/*Inserts*/
INSERT INTO `userdata` (`idUser`, `userName`, `userPassword`, `recordStatus`, `email`, `fullName`, `lastName`, `gender`, `documentType`, `documentNumber`, `cellphone`, `birthdate`) VALUES (NULL, 'jairleo95', 'Black321', '1', 'jairleo95@gmail.com', 'Jair ', 'Santos', '1', '1', '76521399', '955250060', '1995-08-07');



