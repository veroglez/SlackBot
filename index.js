const {RTMClient, WebClient} = require('@slack/client')
const env = require('node-env-file')
const BotActions = require('./controllers/controller')
const schedule = require('node-schedule')

env(__dirname + '/.env')

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)
const rtm = new RTMClient(token)
const controller = new BotActions()

let channelID = ''
let autoBot = false
let timeToStart = {hour: 1, minute: 55, dayOfWeek: 5}
let timeToStop = {hour: 1, minute: 55, dayOfWeek: 5}

rtm.start()

web.channels.list().then(res => {
  channelID = res.channels.find(c => c.is_member).id
})

if (autoBot) {
  schedule.scheduleJob(timeToStart, () => {
    rtm.sendMessage('How many people wants to go out for lunch?', channelID)
    rtm.on('message', (event) => {
      controller.translateMessages(event, rtm, channelID, true)
    })
  })
  schedule.scheduleJob(timeToStop, () => {
    controller.managementGroups(7)
  })
} else {
  rtm.on('message', (event) => {
    controller.translateMessages(event, rtm, channelID)
  })
}
