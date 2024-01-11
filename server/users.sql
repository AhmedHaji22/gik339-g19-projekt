DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,model VARCHAR(8) NOT NULL
  ,mileage  VARCHAR(9) NOT NULL
  ,fuel  VARCHAR(10) NOT NULL
  ,year  VARCHAR(8) NOT NULL
  ,transmission  VARCHAR(16) NOT NULL
  ,color     VARCHAR(6) NOT NULL
);
INSERT INTO users(id,model,mileage,fuel,year,transmission,color) VALUES (1,'BMW','12000','Bensin','2022', 'Manuell', 'purple');
INSERT INTO users(id, model,mileage,fuel,year,transmission,color) VALUES (2,'AUDI','9000','Bensin','2021','Automat', 'green' );
INSERT INTO users(id,model,mileage,fuel,year,transmission,color) VALUES (3,'Ferrari','2000','Diesel','2011', 'Manuell', 'red');



select * from users;