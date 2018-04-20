class BotActions {
  constructor(){
    this.botIsCount = false
    this.numPersons = 0
    this.arrPersons = []
    this.arrAllGroups = []
    this.rtm = {}
    this.channel = ''
  }

  translateMessages(e, rtm, channel) {
    const msg = e.text

    this.rtm = rtm
    this.channel = channel

    if(msg == 'bottis start') {
      this.sendMessageBot(e, 'Ey! Who is going to have lunch out today?', true)
    } else if(msg == 'bottis stop') {
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
    .catch( err => { console.log('status', err) })
  }

  startCountPersons(e) {
    const userExists = this.arrPersons.includes(e.user)
    const reaction = e.text

    // if(!userExists && reaction === ':+1:') {
    if(reaction === ':+1:') {
      this.arrPersons.push(e.user)
      this.rtm.sendMessage('<@'+e.user+'> is in!', this.channel)
    }
  }

  managementGroups(maxPersons){
    this.numPersons = this.arrPersons.length

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

    this.showGroups()
  }

  showGroups(){

    for(let i = 0; i < this.arrAllGroups.length; i++){
      this.rtm.sendMessage('Group '+i+':', this.channel)
      for(let j = 0; j < this.arrAllGroups.length; j++){
        this.rtm.sendMessage('<@'+this.arrAllGroups[i][j]+'>', this.channel)
      }
    }

  }
}

module.exports = BotActions
