/*
 * @Name: edb-sqlite-nodejs 
 * @Author: Max Base
 * @Date: 2020-11-08, 2020-12-01, 2020-12-02, 2020-12-03
 * @Repository: https://github.com/BaseMax/edb-sqlite-nodejs
 */

// import libraries
const sqlite3 = require(`sqlite3`).verbose()
const path = require(`path`)

// database toolkit
const Open = (fileName = `database.db`) => {
  // open the database
  const dbPath = path.resolve(__dirname, fileName)
  this.db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`Connected to the chinook database.`)
  })
}

const Delete = (query, values = [], callback = undefined) => {
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
}

const Insert = (query, values, callback = undefined) => {
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
}

const Update = (query, values, callback = undefined) => {
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
}

const Selects = (query, values = [], callback = undefined) => {
  this.db.all(query, values, (err, rows) => {
    if (err) {
      if(callback !== undefined) {
        callback(false)
      }
      // throw err;
    }
    if(callback !== undefined) {
      callback(rows)
    }
    // rows.forEach((row) => {
    //   console.log(row.name);
    // });
  });
  // this.db.each(query, values, (err, row) => {
  //   if (err) {
  //     console.error(err.message)
  //   }
  //   if(callback !== undefined) {
  //     callback(row)
  //   }
  //   // console.log(row)
  // })
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
}

const Select = (query, values = [], callback=undefined) => {
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
}

const Close = () => {
  this.db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Close the database connection.')
  })
}
const Run = (query) => {
  return this.db.run(query)
}

let database = {
  db: undefined,

  open: Open,

  delete: Delete,

  insert: Insert,

  update: Update,

  selects: Selects,

  select: Select,

  close: Close,

  run: Run,
}

module.exports = database
