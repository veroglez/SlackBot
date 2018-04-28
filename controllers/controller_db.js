const sqlite3 = require('sqlite3').verbose()

class DataBase {
  constructor(){}

  createDatabase() {
    const db = new sqlite3.Database('slackbotgroups.db')
    const sql = 'CREATE TABLE IF NOT EXISTS leaders(id)'

    db.run(sql, (err, row) => {
      err && console.log('Unable to create DB')
    })

    return db
  }

  requestDatabase(db) {
    let sql = `SELECT DISTINCT id name FROM leaders`

    return new Promise( (resolve, reject) => {
      db.all(sql, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }

  insertData(db, data){
    let a = data.map( e => '(?)').join(',')
    let sql = `INSERT INTO leaders(id) VALUES ${a}`

    return new Promise( (resolve, reject) => {
      db.run(sql, data, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }

  deleteDatabase(db){
    let sql = `DELETE FROM leaders`
    return new Promise( (resolve, reject) => {
      db.run(sql, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }
}

module.exports = DataBase
