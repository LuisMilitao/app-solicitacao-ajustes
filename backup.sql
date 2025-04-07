-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: app_solicitacao_ajustes
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  `numero_chamado` varchar(255) NOT NULL,
  `nome_projeto` varchar(255) NOT NULL,
  `versao` varchar(50) DEFAULT NULL,
  `empresa_responsavel` int DEFAULT NULL,
  `contatos` text,
  `resumo_ajuste` text,
  `ambiente` varchar(50) DEFAULT NULL,
  `tipo_usuario` varchar(50) DEFAULT NULL,
  `rota_para_tela` varchar(255) DEFAULT NULL,
  `o_que_esta_acontecendo` text,
  `midia_url` varchar(255) DEFAULT NULL,
  `justificacao` text,
  `solucao_a_ser_tomada` text,
  `sugestao` text,
  `resolvido_por` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_responsavel` (`empresa_responsavel`),
  CONSTRAINT `formulario_ibfk_1` FOREIGN KEY (`empresa_responsavel`) REFERENCES `fornecedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (1,'2025-04-04 07:39:37','2025_0002','lizelouca',NULL,1,'dev','senhas conferem','windows','estabelecimnto','na principal clique em reservas',NULL,'/uploads/midia-1743767537980-505667982.jpeg','nao para de apoitar','troca senha',NULL,'dev'),(3,'2025-04-04 09:05:39','2025_0005','cacapropagand',NULL,1,'devi','senhas confere','windows10','estabelecimento','na principal clique em reserva',NULL,'/uploads/midia-1743768339768-847953791.jpeg','nao para de apoitar','troca senha',NULL,'dev'),(4,'2025-04-04 16:41:53','m2','lizeloca','mvp 1.0',1,'dev ograo',NULL,'windows',NULL,'na tela inicial clique em menu','a senha salva mesmo sem igual','/uploads/midia-1743795713675-783737702.jpeg','preciso de certeza',NULL,'nenhuma','dev'),(5,'2025-04-05 05:24:19','20250010','lizeloca','2025',5,'dev e ogrão','precisa atualizar a senha','windows e imac','estabelecimento','na tela principal digite o caminho','a senha esta sendo salva mesmo nao estando iguais','/uploads/midia-1743841459035-466939421.jpeg','vai dar problema no futuro','deixe as senhas iguais','use o corretor','luis militao '),(6,'2025-04-05 05:43:20','20250011','caça propaganda','mvp',3,'dev e ogrão','a primeira pagina vem sem acentuação','windows','professor','na tela inicial voce clica em resumo de compras','o resumo de compras esta com problema','/uploads/midia-1743842600222-597435927.jpeg','sempre que entro nos pedidos de compra nao aparece a ultima compra efetuada','arrumar o pedido de compra','nao faca compra','dev');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empresa` varchar(255) NOT NULL,
  `contatos` text,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
INSERT INTO `fornecedores` VALUES (1,'Fornecedor Atualizado','Maria Oliveira','maria@empresa.com','(11) 91234-5678'),(2,'Fornecedor Atualizado','Maria josé','maria@lize.com','(11) 91234-5678'),(3,'Fornecedor Atualizado','Maria josé','maria@lize.com','(11) 91234-5678'),(4,'Fornecedor Atualizado','Maria josé','maria@lize.com','(11) 999747759'),(5,'DevTech Solutions','Ana Souza, Carlos Lima','contato@devtech.com','11999998888'),(6,'NetHelp Suporte','Roberto Silva','roberto@nethelp.com.br','11988887777'),(7,'Business Inteligência','Marina Ferreira, João Alves','consultoria@businessi.com','1133224455');
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `empresa_responsavel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_responsavel` (`empresa_responsavel`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
INSERT INTO `projetos` VALUES (1,'App de Relatórios','XPTO Solutions'),(2,'App de Gestão Financeira','1'),(5,'Dashboard de Indicadores','3'),(7,'Sistema de Gestão de Clientes','TechSolutions LTDA'),(8,'Aplicativo de Entregas Express','RápidoEntregas S/A'),(9,'Plataforma EAD para Treinamentos Internos','EducaCorp'),(10,'Plataforma EAD para Treinamentos Internos','EducaCorp');
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-05  6:44:40
