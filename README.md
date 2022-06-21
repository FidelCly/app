# app
Mobile app in React Native


## Commit "Register done!"
Juste un backend qui permet de créer un user dans la base de donnée.

## What to do
- Créer un user mysql.
- Créer une database fildeclydb.
- Créer une table avec la commande : 
```
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ```
- Change the /database/dbConnection.js file and fill it with the correct values (user, host, database)
- Run ```node index.js```