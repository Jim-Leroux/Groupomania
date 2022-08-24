USE groupomania;

INSERT INTO users (firstname, name, email, password, imageUrl, createdAt, updatedAt)
 VALUES
 ('Captain', 'America', 'captain@gmail.com', 'azerty', 'https://image.thanhnien.vn/1200x630/Uploaded/2022/wsxrxqeiod/2018_10_05/chris-evans_hnyp.jpg', '2013-01-04', '2013-01-04'),
 ('Iron', 'Man', 'rambo@gmail.com', 'azerty', 'https://trendy.letudiant.fr/wp-content/uploads/trendy/2022/05/sans-titre35.jpeg', '2013-01-04', '2013-01-04'),
 ('Thor', 'Fils DODIN', 'rambo@gmail.com', 'azerty', 'https://www.journaldugeek.com/content/uploads/2022/07/2-1.jpg', '2013-01-04', '2013-01-04'),
 ('THE', 'HULK', 'rambo@gmail.com', 'azerty', 'https://radiodisneyclub.fr/wp-content/uploads/2022/06/Hulk.jpg', '2013-01-04', '2013-01-04'),
 ('Spider', 'Man', 'rambo@gmail.com', 'azerty', 'https://www.muycomputer.com/wp-content/uploads/2021/08/Spider-Man.jpg', '2013-01-04', '2013-01-04'),
 ('JESAPPEL', 'GROOT', 'rambo@gmail.com', 'azerty', 'https://gamelegends.it/wp-content/uploads/2022/06/Baby-Groot-1200x900.jpg', '2013-01-04', '2013-01-04');

 INSERT INTO posts (user_id, description, imageUrl, createdAt, updatedAt)
 VALUES
 (1, 'Je suis Captain America', 'https://image.thanhnien.vn/1200x630/Uploaded/2022/wsxrxqeiod/2018_10_05/chris-evans_hnyp.jpg', '2013-01-04', '2013-01-04'),
 (2, 'Je fabrique des trucs supers, jai une copine géniale et je sauve occasionnellement le monde.', 'https://trendy.letudiant.fr/wp-content/uploads/trendy/2022/05/sans-titre35.jpeg', '2013-01-04', '2013-01-04'),
 (3, 'Comment osez-vous, vous en prendre au fils dOdin ?!', 'https://www.journaldugeek.com/content/uploads/2022/07/2-1.jpg', '2013-01-04', '2013-01-04'),
 (4, 'HULK PAS CONTENT', 'https://radiodisneyclub.fr/wp-content/uploads/2022/06/Hulk.jpg', '2013-01-04', '2013-01-04'),
 (5, 'Je suis la petite araignée sympa du quartier !', 'https://www.muycomputer.com/wp-content/uploads/2021/08/Spider-Man.jpg', '2013-01-04', '2013-01-04'),
 (6, 'JESAPPEL GROOT', 'https://gamelegends.it/wp-content/uploads/2022/06/Baby-Groot-1200x900.jpg', '2013-01-04', '2013-01-04');
