const { RTMClient, WebClient } = require('@slack/client')
const env = require('node-env-file')
const BotActions = require('./controllers/controller')

env(__dirname + '/.env')

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)
const rtm = new RTMClient(token)
const controller = new BotActions()

var channelID = ''

rtm.start()

web.channels.list().then( res => {
  channelID = res.channels.find(c => c.is_member).id
})

rtm.on('message', (event) => { controller.translateMessages(event, rtm, channelID) })
