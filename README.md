# edb-sqlite-nodejs

## Easy Database Sqlite Node-Js

### Import edb-sqlite

```
const database = require(`./database`)
```

### Using edb-sqlite

#### Open/Connect DB

```
database.open(`database.db`)
```

#### Create Table

```
database.run(`CREATE TABLE IF NOT EXISTS 'record'
(
    ID                      INTEGER PRIMARY KEY          NOT NULL,
    meetingId               CHAR(70)                     NOT NULL,
    recordId                CHAR(70)                     NOT NULL,
    status                  INTEGER                      NOT NULL
)`)
```

#### update

```
database.update(`UPDATE langs SET name = ? WHERE name = ?`, [`test`, `c`])
```

#### Delete

```
database.delete(`DELETE FROM langs WHERE rowid=?`, [1])
```

#### Insert

```
database.insert(`INSERT INTO langs(name) VALUES(?)`, [4])
```

#### Select Count

```
database.select(`SELECT COUNT(*) as count FROM record WHERE meetingId = ? AND recordId = ?`, [5, 8], (res) => {
  if(res[`count`]) {
    console.log(res[`count`])
  } else {
    console.log(`Error: ${res}`)
  }
})
```

#### Close/Disconnect db

```
database.close()
```

### TODO EDB-Sqlite

- Adding example js files

I appreciate if anyone does this and send PR to me.

---------

# Max Base

My nickname is Max, Programming language developer, Full-stack programmer. I love computer scientists, researchers, and compilers.

## Asrez Team

A team includes some programmer, developer, designer, researcher(s) especially Max Base.

[Asrez Team](https://www.asrez.com/)
