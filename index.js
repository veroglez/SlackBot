const env = require('node-env-file')
env(__dirname + '/.env')

const { RTMClient, WebClient } = require('@slack/client')

const token = process.env.SLACK_TOKEN
const conversationId = process.env.CONVERSATION_ID

const rtm = new RTMClient(token)
rtm.start()

rtm.on('message', (event) => {

  if (event.text === 'bottis start'){
    rtm.sendMessage('Ey! Who is going to have lunch out today?', conversationId)
      .then((res) => {
        console.log('Message sent: ', res.text)
      })

  }
})
