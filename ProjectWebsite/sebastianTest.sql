BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "amaQuestions" (
	"id"	INTEGER,
	"name"	TEXT,
	"question"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "projectFeedback" (
	"id"	INTEGER,
	"name"	TEXT,
	"feedback"	TEXT,
	"projectId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("projectId") REFERENCES "projects"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "projects" (
	"id"	INTEGER,
	"projectName"	TEXT,
	"description1"	TEXT,
	"image1path"	INTEGER,
	"description2"	INTEGER,
	"image2path"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "amaQuestions" ("id","name","question") VALUES (1,'Barbara Middleton','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (2,'Sean Brown','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (3,'Kayli Eunice','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (4,'aa','aaa');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (5,'asd','asdasda');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (6,'kjh','lkj');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (7,'sdfsd','dfsdfsdfsddf');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (8,'fgdf','fgdfgdfg');
INSERT INTO "amaQuestions" ("id","name","question") VALUES (9,'testing ','hello does dis shit still work work');

INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (1,'David Blomkvist','Har du testat att göra det bättre?',6);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (2,'Anders Andersson','Eller typ att faktiskt göra det bra?',6);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (3,'test','test test',6);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (4,'maybe','this will work',6);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (5,'asdasd','asdasdasd',5);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (6,'asdasd','asdasdasd',1);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (7,'asdasd','asdasd',6);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (8,'askjdkasjdas','lkasjdlkasjlkdja',5);
INSERT INTO "projectFeedback" ("id","name","feedback","projectId") VALUES (9,'does this work now?','please',12);

INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (1,'My First Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (2,'My Second Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (3,'My Third Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (4,'My Fourth Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (5,'My Fifth Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (6,'My Sixth Project','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png','Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.','https://bulma.io/images/placeholders/1280x960.png');
INSERT INTO "projects" ("id","projectName","description1","image1path","description2","image2path") VALUES (12,'asdasd','asdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasöasdasdasdasjdasodjaslkfjaöksjdaöksjdökasjdköasjdökajsödjasö','/uploads/image1-1632844394791.png','asdasdsa','/uploads/image2-1632844394796.png');
COMMIT;
