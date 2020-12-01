/*
 * @Name: edb-sqlite-nodejs 
 * @Author: Max Base
 * @Date: 2020-10-08, 2020-11-01
 * @Repository: https://github.com/BaseMax/edb-sqlite-nodejs
 */

// import libraries
const sqlite3 = require(`sqlite3`).verbose()
const path = require(`path`)

// database toolkit
let database = {
  db: undefined,

  open: function() {
    // open the database
    const dbPath = path.resolve(__dirname, `database.db`)
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message)
      }
      console.log(`Connected to the chinook database.`)
    })
  },

  delete: function(query, values=[]) {
    this.db.run(query, values, function(err) {
      if (err) {
        console.error(err.message)
        return false
      }
      return true
    })
  },

  insert: function(query, values) {
    this.db.run(query, values, function(err) {
      if (err) {
        console.log(err.message)
        return false
      }
      return this.lastID
    })
  },

  update: function(query, values){
    this.db.run(query, values, function(err) {
      if (err) {
        console.error(err.message)
        return false
      }
      return this.changes
    })
  },

  selects: function(query, values=[]) {
    this.db.serialize(() => {
      this.db.each(query, (err, row) => {
        if (err) {
          console.error(err.message)
        }
        // console.log(row)
        return row
      })
    })
    // let items=[]
    // this.db.each(query, values, (err, row) => {
    //   if (err) {
    //     console.error(err.message)
    //     // return null
    //   }
    //   items.push(row)
    //   console.log(row)
    // })
    // console.log(items)
    // return items
  },

  select: function(query, values=[]) {
    this.db.get(query, values, (err, row) => {
      if (err) {
        console.error(err.message)
        return null
      }
      return row
    })
  },

  close: function() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Close the database connection.')
    })
  },

  run: function(query) {
    return this.db.run(query)
  }
}

database.open()
database.run(`CREATE TABLE IF NOT EXISTS 'record'
(
    ID                      INTEGER PRIMARY KEY          NOT NULL,
    meetingId               CHAR(70)                     NOT NULL,
    recordId                CHAR(70)                     NOT NULL,
    status                  INTEGER                      NOT NULL
)`)

module.exports = database
