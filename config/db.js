const sqlite3 = require('sqlite3').verbose()

// open database in memory
let db = new sqlite3.Database('./config/slackbotgroups.db', (err) => {
  if (err) return console.error(err.message)
  console.log('Connected to the in-memory SQlite database.')
})

db.run('CREATE TABLE liders(user_id text)');
