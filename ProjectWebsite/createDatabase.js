const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')

db.run('CREATE TABLE IF NOT EXISTS "amaQuestions" ("id"	INTEGER, "name"	TEXT, "question"	TEXT, PRIMARY KEY("id" AUTOINCREMENT))')

db.run('CREATE TABLE IF NOT EXISTS "projectFeedback" ( "id"	INTEGER, "name"	TEXT, "feedback"	TEXT, "projectId"	INTEGER, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("projectId") REFERENCES "projects"("id") ON DELETE CASCADE)')

db.run('CREATE TABLE IF NOT EXISTS "projects" ("id"	INTEGER, "title"	TEXT, "description1"	TEXT, "image1path"	INTEGER, "description2"	INTEGER, "image2path"	INTEGER, PRIMARY KEY("id" AUTOINCREMENT))')