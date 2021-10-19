const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')


db.run('CREATE TABLE IF NOT EXISTS "blogPost" ("Id" INTEGER, "title" TEXT, PRIMARY KEY("Id" AUTOINCREMENT))')

