const sqlite3 = require('sqlite3').verbose()
const DataBase = require('./controller_db')
const controllerDb = new DataBase()


class BotActions {
  constructor(){
    this.botIsCount = false
    this.numUsers = 0
    this.arrUsers = []
    this.arrGroups = []
    this.arrLeaders = []
    this.rtm = {}
    this.channel = ''
  }

  userExists(user){
    return this.arrUsers.includes(user)
  }

  getGreaterInteger(num){
    return Math.ceil(this.numUsers/num)
  }

  splitIntoGroups(group, usersPerGroup){
    for(let i = 0; i<group; i++)
      this.arrGroups.push(this.arrUsers.splice(0,usersPerGroup))
  }

  shuffleArray(){
    this.arrUsers.sort( () => Math.random() - 0.5 )
  }

  getLeaders(){
    this.arrLeaders = this.arrGroups.map( e => e[0] )
  }

  checkRepeatedLeaders(rows){
    this.arrLeaders = this.arrLeaders.map( (e, i) => {
      return rows.includes(e) ? this.arrGroups[i][1] : e
    })
  }

  resetStatus(){
    this.numUsers = 0
    this.arrUsers = []
    this.arrGroups = []
  }

  translateMessages(e, rtm, channel, autoStart) {
    const msg = e.text

    this.rtm = rtm
    this.channel = channel
    this.db = controllerDb.createDatabase()

    if(msg == 'bottis start') {
      this.sendMessageBot('Ey! Who is going to have lunch out today?', true)
    } else if(msg == 'bottis stop') {
      this.sendMessageBot('Goodbye!', false)
    } else if(msg == ':+1:') {
      (this.botIsCount || autoStart) && this.startCountUsers(e)
    }
  }

  sendMessageBot(msg, status) {
    this.rtm.sendMessage(msg, this.channel)
    .then( res => {
      this.botIsCount = status
      !status && this.managementGroups(7)
    })
    .catch( err => console.log('status', err))
  }

  startCountUsers(e) {
    if(!this.userExists(e.user)) {
      this.arrUsers.push(e.user)
      this.rtm.sendMessage('<@'+e.user+'> is in!', this.channel)
    }
  }

  managementGroups(maxUsers){
    this.arrUsers = [1,2,3,4,5,6,7,8,9,10,11]
    this.numUsers = this.arrUsers.length
    this.shuffleArray()

    const numGroups = this.getGreaterInteger(maxUsers)
    const usersPerGroup = this.getGreaterInteger(numGroups)
    const smallGroup = (usersPerGroup*numGroups) - this.numUsers
    const bigGroup = numGroups-smallGroup

    this.splitIntoGroups(bigGroup, usersPerGroup)

    if(this.numUsers > 7 && smallGroup > 0)
      this.splitIntoGroups(smallGroup, usersPerGroup-1)

    this.chooseLeader()
  }

  showGroups(){
    this.arrGroups.forEach( (e,i) => {
      e = e.map( e => `<@${e}>`)
      this.rtm.sendMessage(`Group ${i}: ${e} -> Leader: <@${this.arrLeaders[i]}>`, this.channel)
    })

    this.resetStatus()
  }

  chooseLeader(){

    controllerDb.requestDatabase(this.db)
      .then( res => {
        this.getLeaders()

        if(!res.length){
          controllerDb.insertData(this.db, this.arrLeaders)
            .then( res => console.log('Data inserted') )
            .catch( err => console.log(err) )
        }else{
          const rowsDB = res.map(e => e.name)
          this.checkRepeatedLeaders(rowsDB)
        }

      controllerDb.deleteDatabase(this.db)
        .then( res => console.log('Deleted DB') )
        .catch( err => console.log(err) )

      controllerDb.insertData(this.db, this.arrLeaders)
        .then( res => console.log('Data inserted') )
        .catch( err => console.log(err) )

      this.db.close()

      this.showGroups()
    })
    .catch((err) => { console.log(err) })
  }
}

module.exports = BotActions
