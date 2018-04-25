const sqlite3 = require('sqlite3').verbose()
const DataBase = require('./controller_db')
const controllerDb = new DataBase()

class BotActions {
  constructor(){
    this.botIsCount = false
    this.numPersons = 0
    this.arrPersons = []
    this.arrAllGroups = []
    this.arrLiders = []
    this.rtm = {}
    this.channel = ''
  }

  translateMessages(e, rtm, channel) {
    const msg = e.text

    this.rtm = rtm
    this.channel = channel

    if(msg == 'bottis start') {
      this.sendMessageBot(e, 'Ey! Who is going to have lunch out today?', true)
    } else if(msg == 'st') {
      this.sendMessageBot(e, 'Goodbye!', false)
    } else if(msg == ':+1:') {
      this.botIsCount && this.startCountPersons(e)
    }
  }

  sendMessageBot(e, msg, status) {
    this.rtm.sendMessage(msg, this.channel)
    .then( res => {
      this.botIsCount = status
      !status && this.managementGroups(7)
    })
    .catch( err => console.log('status', err))
  }

  startCountPersons(e) {
    const userExists = this.arrPersons.includes(e.user)
    const reaction = e.text

    // if(!userExists && reaction === ':+1:') {
      this.arrPersons.push(e.user)
      this.rtm.sendMessage('<@'+e.user+'> is in!', this.channel)
  }

  managementGroups(maxPersons){
    this.arrPersons = [1,2,3,4,5,6,7,8,9]
    this.numPersons = this.arrPersons.length
    this.shuffleArray()

    const numGroups = Math.ceil(this.numPersons/maxPersons)
    const numPerGroup = Math.ceil(this.numPersons/numGroups)
    const smallGroup = (numPerGroup*numGroups) - this.numPersons
    const bigGroup = numGroups-smallGroup

    for(let i = 0; i<bigGroup; i++)
      this.arrAllGroups.push(this.arrPersons.splice(0, numPerGroup))

    if(this.numPersons > 7 && smallGroup > 0){
      for(let i = 0; i<smallGroup; i++)
        this.arrAllGroups.push(this.arrPersons.splice(0,numPerGroup-1))
    }
    this.chooseLider()
  }

  showGroups(){
    this.arrAllGroups.forEach( (e,i) => {
      e = e.map( e => `<@${e}>`)
      this.rtm.sendMessage(`Group ${i}: ${e} -> Lider: <@${this.arrLiders[i]}>`, this.channel)
    })

    this.numPersons = 0
    this.arrPersons, this.arrAllGroups = []
  }

  shuffleArray(){
    this.arrPersons.sort( () => Math.random() - 0.5 )
  }

  chooseLider(){

    this.db = controllerDb.createDatabase()

    controllerDb.requestDatabase(this.db)
    .then( (res) =>{

      this.arrLiders = this.arrAllGroups.map( e => e[0] )

      if(!res.length){

        controllerDb.insertData(this.db, this.arrLiders)
          .then( res => console.log('Data inserted') )
          .catch( err => console.log(err) )

      }else{
        const rows = res.map(e => e.name)

        this.arrLiders = this.arrLiders.map( (e, i) => {
          if(rows.includes(e)) e = this.arrAllGroups[i][1]
          return e
        })

      }

      controllerDb.deleteDatabase(this.db)
        .then( res => console.log('Deleted DB') )
        .catch( err => console.log(err) )

      controllerDb.insertData(this.db, this.arrLiders)
        .then( res => console.log('Data inserted') )
        .catch( err => console.log(err) )

      this.db.close()

      this.showGroups()
    })
    .catch((err) => { console.log(err) })
  }
}

module.exports = BotActions
