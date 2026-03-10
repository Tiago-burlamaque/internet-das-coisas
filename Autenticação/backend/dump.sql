CREATE TABLE `dourado_lanches`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `email` VARCHAR(225) NULL,
  `senha` CHAR(64) NULL,
  `tipo_usuario` INT NULL,
  `ativo` INT NULL DEFAULT 1 COMMENT '1 = usuario normal\n2 = admin',
  PRIMARY KEY (`id`));
