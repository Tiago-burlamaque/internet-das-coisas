CREATE TABLE `dourado_lanches`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(225) NULL,
  `email` VARCHAR(225) NULL,
  `senha` VARCHAR(225) NULL,
  PRIMARY KEY (`idusuario`));

ALTER TABLE `dourado_lanches`.`usuario` 
ADD COLUMN `ativo` INT NULL DEFAULT 1 AFTER `senha`;

ALTER TABLE `dourado_lanches`.`usuario` 
ADD COLUMN `tipo_usuario` INT NULL DEFAULT 1 COMMENT '1 = usuario normal\n2 = admin' AFTER `ativo`;

ALTER TABLE `dourado_lanches`.`usuario` 
CHANGE COLUMN `senha` `senha` CHAR(64) NULL DEFAULT NULL ;
