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

  open: function(fileName = `database.db`) {
    // open the database
    const dbPath = path.resolve(__dirname, fileName)
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message)
      }
      console.log(`Connected to the chinook database.`)
    })
  },

  delete: function(query, values = [], callback = undefined) {
    this.db.run(query, values, function(err) {
      if (err) {
        console.error(err.message)
        if(callback !== undefined) {
          callback(false)
        }
      }
      if(callback !== undefined) {
        callback(true)
      }
    })
  },

  insert: function(query, values, callback = undefined) {
    this.db.run(query, values, function(err) {
      if (err) {
        console.log(err.message)
        if(callback !== undefined) {
          callback(false)
        }
      }
      if(callback !== undefined) {
        callback(this.lastID)
      }
    })
  },

  update: function(query, values, callback = undefined){
    this.db.run(query, values, function(err) {
      if (err) {
        console.error(err.message)
        if(callback !== undefined) {
          callback(false)
        }
      }
      if(callback !== undefined) {
        callback(this.changes)
      }
    })
  },

  selects: function(query, values = [], callback = undefined) {
    this.db.serialize(() => {
      this.db.each(query, (err, row) => {
        if (err) {
          console.error(err.message)
        }
        if(callback !== undefined) {
          callback(row)
        }
        // console.log(row)
      })
    })
    // let items = []
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

  select: function(query, values = [], callback=undefined) {
    this.db.get(query, values, (err, row) => {
      if (err) {
        console.error(err.message)
        if(callback !== undefined) {
          callback(null)
        }
      }
      if(callback !== undefined) {
        callback(row)
      }
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

module.exports = database
