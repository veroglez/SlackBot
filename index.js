const { RTMClient, WebClient } = require('@slack/client')
const env = require('node-env-file')
const BotActions = require('./controllers/controller')

env(__dirname + '/.env')

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

const controller = new BotActions()

var botStartCount = false
var numPersons = 0
var channelID = ''
var arrPersons = []
var allGroups =[]

const rtm = new RTMClient(token)
rtm.start()

//Detecting the channel of the bot
web.channels.list().then( res => {
  channelID = res.channels.find(c => c.is_member).id
})

//Detecting messages
rtm.on('message', (event) => { controller.translateMessages(event, rtm, channelID) })
