const { RTMClient, WebClient } = require('@slack/client')
const env = require('node-env-file')

env(__dirname + '/.env')

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

var botIsActive = false
var numPersons = 0
var channelID = 0
var numPersons = 0
var arrPersons = []
var allGroups =[]

const rtm = new RTMClient(token)
rtm.start()

//Detecting the channel of the bot
web.channels.list().then( res => {
  channelID = res.channels.find(c => c.is_member).id
})

//Detecting messages
rtm.on('message', (event) => {

  if (event.text === 'bottis start'){
    rtm.sendMessage('Ey! Who is going to have lunch out today?', channelID).then((res) => {
      botIsActive = true
    })
  }else if(event.text === 'bottis stop'){
    botIsActive = false
  }

  if(botIsActive){
    console.log('Bot is actived')

    if(event.text === ':+1:'){
      numPersons = countPersons(event, numPersons)
    }

  }else{
    console.log('Bot is desactived')
  }
})


function countPersons(event, numPersons){
  // var userExists = arrPersons.includes(event.user)

  // if( !userExists ){
    numPersons += 1
    arrPersons.push(event.user)
    rtm.sendMessage('<@'+event.user+'> is in', channelID)
  // }

  return numPersons
}
