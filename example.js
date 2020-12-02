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

// insert
database.insert(`INSERT INTO record(meetingId, recordId, status) VALUES(?, ?, ?)`, [1000, 50505050, 1])
database.insert(`INSERT INTO record(meetingId, recordId, status) VALUES(?, ?, ?)`, [5000, 45678050, 1])
database.insert(`INSERT INTO record(meetingId, recordId, status) VALUES(?, ?, ?)`, [8000, 505, 0])
database.insert(`INSERT INTO record(meetingId, recordId, status) VALUES(?, ?, ?)`, [9400, 564567, 0])
database.insert(`INSERT INTO record(meetingId, recordId, status) VALUES(?, ?, ?)`, [3400, 9949494, 2])

// selects
database.selects(`SELECT * FROM record WHERE status = 0 ORDER BY ID ASC LIMIT 5`, [],
(rows) => {
  console.log(rows)
  for(let row of rows) {
    console.log(row)
  }
})

// select
database.select(`SELECT * FROM record WHERE meetingId = ? AND recordId = ?`, [5, 8], (res) => {
  console.log(res)
})

// select COUNT
database.select(`SELECT COUNT(*) as count FROM record WHERE meetingId = ? AND recordId = ?`, [5, 8], (res) => {
  if(res[`count`]) {
    console.log(res[`count`])
  } else {
    console.log(`Error: ${res}`)
  }
})

// close
database.close()
