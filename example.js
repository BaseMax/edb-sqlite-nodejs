// https://github.com/BaseMax/edb-sqlite-nodejs
const database = require(`./database`)

// open
database.open(`database.db`)

// create table
database.run(`CREATE TABLE IF NOT EXISTS 'record'
(
    ID                      INTEGER PRIMARY KEY          NOT NULL,
    meetingId               CHAR(70)                     NOT NULL,
    recordId                CHAR(70)                     NOT NULL,
    status                  INTEGER                      NOT NULL
)`)

// close
database.close()
