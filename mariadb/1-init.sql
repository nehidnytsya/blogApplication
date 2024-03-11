ALTER DATABASE springboot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'javauser'@'%' IDENTIFIED BY 'dfgfd$#^dsg';
GRANT ALL PRIVILEGES  ON springboot.* TO 'javauser'@'%';