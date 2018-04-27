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
let timeToStart = {hour: 0, minute: 26, dayOfWeek: 6}
let timeToStop = {hour: 0, minute: 27, dayOfWeek: 6}

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
