USE groupomania;

INSERT INTO users (firstname, name, email, password, imageUrl, isAdmin, createdAt, updatedAt)
 VALUES
 ('I am', 'the Admin', 'admin@gmail.com', 'azerty', 'https://static.papergeek.fr/2017/03/x-men-patrick-stewart-role-professeur-xavier-condition.jpg', 1, '2022-09-19', '2022-09-19'),
 ('Captain', 'America', 'captain@gmail.com', 'azerty', 'https://image.thanhnien.vn/1200x630/Uploaded/2022/wsxrxqeiod/2018_10_05/chris-evans_hnyp.jpg', 0, '2022-09-19', '2022-09-19'),
 ('Iron', 'Man', 'rambo@gmail.com', 'azerty', 'https://trendy.letudiant.fr/wp-content/uploads/trendy/2022/05/sans-titre35.jpeg', 0, '2022-09-19', '2022-09-19'),
 ('Thor', 'Fils DODIN', 'rambo@gmail.com', 'azerty', 'https://www.journaldugeek.com/content/uploads/2022/07/2-1.jpg', 0, '2022-09-19', '2022-09-19'),
 ('THE', 'HULK', 'rambo@gmail.com', 'azerty', 'https://radiodisneyclub.fr/wp-content/uploads/2022/06/Hulk.jpg', 0, '2022-09-19', '2022-09-19'),
 ('Spider', 'Man', 'rambo@gmail.com', 'azerty', 'https://www.muycomputer.com/wp-content/uploads/2021/08/Spider-Man.jpg', 0, '2022-09-19', '2022-09-19'),
 ('JESAPPEL', 'GROOT', 'rambo@gmail.com', 'azerty', 'https://gamelegends.it/wp-content/uploads/2022/06/Baby-Groot-1200x900.jpg', 0, '2022-09-19', '2022-09-19');

 INSERT INTO posts (user_id, description, imageUrl, createdAt, updatedAt)
 VALUES
 (2, 'Je suis Captain America', 'https://image.thanhnien.vn/1200x630/Uploaded/2022/wsxrxqeiod/2018_10_05/chris-evans_hnyp.jpg', '2022-09-19', '2022-09-19'),
 (3, 'Je fabrique des trucs supers, jai une copine géniale et je sauve occasionnellement le monde.', 'https://trendy.letudiant.fr/wp-content/uploads/trendy/2022/05/sans-titre35.jpeg', '2022-09-19', '2022-09-19'),
 (4, 'Comment osez-vous, vous en prendre au fils dOdin ?!', 'https://www.journaldugeek.com/content/uploads/2022/07/2-1.jpg', '2022-09-19', '2022-09-19'),
 (5, 'HULK PAS CONTENT', 'https://radiodisneyclub.fr/wp-content/uploads/2022/06/Hulk.jpg', '2022-09-19', '2022-09-19'),
 (6, 'Je suis la petite araignée sympa du quartier !', 'https://www.muycomputer.com/wp-content/uploads/2021/08/Spider-Man.jpg', '2022-09-19', '2022-09-19'),
 (7, 'JESAPPEL GROOT', 'https://gamelegends.it/wp-content/uploads/2022/06/Baby-Groot-1200x900.jpg', '2022-09-19', '2022-09-19');
