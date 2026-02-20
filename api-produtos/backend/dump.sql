CREATE SCHEMA `dourado_lanches` ;

CREATE TABLE `dourado_lanches`.`produto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `valor` DECIMAL(7,2) NULL,
  `descricao` VARCHAR(255) NULL,
  `ativo` INT NULL,
  PRIMARY KEY (`id`));


INSERT INTO produto (nome, valor, descricao, ativo) VALUES
('X-Burguer', 18.90, 'Pão, hambúrguer, queijo, alface e tomate', 1),
('X-Salada', 20.50, 'Pão, hambúrguer, queijo, presunto, alface e tomate', 1),
('X-Bacon', 23.00, 'Pão, hambúrguer, queijo e bacon crocante', 1),
('X-Tudo', 29.90, 'Hambúrguer, queijo, presunto, bacon, ovo, alface e tomate', 1),
('Cachorro-Quente Simples', 12.00, 'Pão, salsicha, molho e batata palha', 1),
('Cachorro-Quente Especial', 16.50, 'Pão, 2 salsichas, queijo, milho e batata palha', 1),
('Batata Frita Pequena', 10.00, 'Porção de batata frita crocante', 1),
('Batata Frita Grande', 18.00, 'Porção grande de batata frita crocante', 1),
('Onion Rings', 15.90, 'Anéis de cebola empanados e fritos', 1),
('Refrigerante Lata', 6.00, 'Refrigerante lata 350ml', 1),
('Refrigerante 2L', 12.00, 'Refrigerante garrafa 2 litros', 1),
('Suco Natural Laranja', 8.50, 'Suco natural de laranja 300ml', 1),
('Suco Natural Abacaxi', 8.50, 'Suco natural de abacaxi 300ml', 1),
('Milkshake Chocolate', 14.90, 'Milkshake cremoso sabor chocolate', 1),
('Milkshake Morango', 14.90, 'Milkshake cremoso sabor morango', 1),
('Hambúrguer Artesanal', 27.90, 'Hambúrguer artesanal 180g com queijo cheddar', 1),
('X-Frango', 21.90, 'Pão, frango grelhado, queijo e salada', 1),
('Combo X-Burguer', 29.90, 'X-Burguer + batata pequena + refrigerante lata', 1),
('Combo X-Bacon', 34.90, 'X-Bacon + batata pequena + refrigerante lata', 1),
('Açaí 400ml', 16.00, 'Açaí com granola e leite condensado', 1);