CREATE SCHEMA `full_stack` ;

CREATE TABLE `full_stack`.`usuario` (
  `id` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(225) NULL,
  `senha` VARCHAR(225) NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

  CREATE TABLE estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    quantidade INT,
    unidade VARCHAR(20) -- ex: g, kg, unidade
);
