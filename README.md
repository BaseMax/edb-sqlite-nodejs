# edb-sqlite-nodejs

## Easy Database Sqlite Node-Js

For some small applications that use SQLite Database, I needed to design a small library to simplify my work.
And connect to the database without any worries.
So I also published the library that I implemented for the projects here.

### Import edb-sqlite

```javascript
const database = require(`./database`)
```

### Using edb-sqlite

#### Open/Connect DB

```javascript
database.open(`database.db`)
```

#### Create Table

```javascript
database.run(`CREATE TABLE IF NOT EXISTS 'record'
(
    ID                      INTEGER PRIMARY KEY          NOT NULL,
    meetingId               CHAR(70)                     NOT NULL,
    recordId                CHAR(70)                     NOT NULL,
    status                  INTEGER                      NOT NULL
)`)
```

#### update

```javascript
database.update(`UPDATE langs SET name = ? WHERE name = ?`, [`test`, `c`])
```

#### Delete

```javascript
database.delete(`DELETE FROM langs WHERE rowid=?`, [1])
```

#### Insert

```javascript
database.insert(`INSERT INTO langs(name) VALUES(?)`, [4])
```

#### Select(s) Rows

```javascript
database.selects(`SELECT * FROM record WHERE status = 0 ORDER BY ID ASC LIMIT 5`, [],
(rows) => {
  console.log(rows)
  for(let row of rows) {
    console.log(row)
x  }
})
```

#### Single Select

```javascript
database.select(`SELECT * FROM record WHERE meetingId = ? AND recordId = ?`, [5, 8], (res) => {
  console.log(res)
})
```

#### Single Select Count

```javascript
database.select(`SELECT COUNT(*) as count FROM record WHERE meetingId = ? AND recordId = ?`, [5, 8], (res) => {
  if(res[`count`]) {
    console.log(res[`count`])
  } else {
    console.log(`Error: ${res}`)
  }
})
```

#### Close/Disconnect db

```javascript
database.close()
```

### TODO EDB-Sqlite

- Adding example js files
- Publish package to **npm** package manager

I appreciate if anyone does these and send PR to me.

---------

# Max Base

My nickname is Max, Programming language developer, Full-stack programmer. I love computer scientists, researchers, and compilers.

## Asrez Team

A team includes some programmer, developer, designer, researcher(s) especially Max Base.

[Asrez Team](https://www.asrez.com/)
