-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema phonebook
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `phonebook` DEFAULT CHARACTER SET utf8 ;
USE `phonebook` ;

-- -----------------------------------------------------
-- Table `phonebook`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `phonebook`.`contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `last_name` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `phonebook`.`phone_number`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `phonebook`.`phone_number` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(45) NULL,
  `contact_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_phone_number_contact_idx` (`contact_id` ASC),
  CONSTRAINT `fk_phone_number_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `phonebook`.`contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
