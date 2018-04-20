class BotActions {
  constructor(){
    this.botIsCount = false
    this.arrPersons = []
    this.numPersons = 0
  }

  translateMessages(e, rtm, channel) {
    const msg = e.text

    if(msg == 'bottis start') {
      this.sendMessageBot(e, rtm, 'Ey! Who is going to have lunch out today?', channel, true)
    } else if(msg == 'bottis stop') {
      this.sendMessageBot(e, rtm, 'Goodbye!', channel, false)
    } else if(msg == ':+1:') {
      this.botIsCount && this.startCountPersons(e, rtm, channel)
    }
  }

  sendMessageBot(e,rtm, msg, channel, status) {
    rtm.sendMessage(msg, channel)
    .then( res => {
      this.botIsCount = status
      !status && this.managementGroups(7)
    })
    .catch( err => { console.log('status', err.data.ok) })
  }

  startCountPersons(e, rtm, channel) {
    const userExists = this.arrPersons.includes(e.user)
    const reaction = e.text

    // if(!userExists && reaction === ':+1:') {
    if(reaction === ':+1:') {
      this.arrPersons.push(e.user)
      rtm.sendMessage('<@'+e.user+'> is in!', channel)
    }
  }

  managementGroups(maxPersons){
    this.numPersons = this.arrPersons.length
    console.log(this.numPersons);

    const groups = Math.ceil(this.numPersons/maxPersons)
    const numPerGroup = Math.ceil(this.numPersons/groups)
    const result = (numPerGroup*groups) - this.numPersons
    const bigGroup = groups-result
    const smallGroup = result

    console.log('Grupos grandes', bigGroup);
    console.log('Grupos pequeños', smallGroup);

    // for(let i = 0; i<bigGroup; i++){
    //   allGroups.push(arrPersons.splice(0,numPerGroup))
    // }
    //
    // if(numPersons > 7){
    //   console.log('grupos de '+(numPerGroup-1)+' personas:', smallGroup)
    //   for(var i = 0; i<smallGroup; i++){
    //     allGroups.push(arrPersons.splice(0,numPerGroup-1))
    //   }
    // }
    // console.log(allGroups)

  }

}

module.exports = BotActions
