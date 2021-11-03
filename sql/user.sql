CREATE USER 'fisiotera'@'localhost' IDENTIFIED BY 'fisiopass01';

GRANT All PRIVILEGES ON proyectoAdmin.* TO 'fisiotera'@'localhost';

FLUSH PRIVILEGES;
