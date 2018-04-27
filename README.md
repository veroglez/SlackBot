# Slackbot Bottis

This application is a Slackbot, which lists all people who are going to go out for lunch and then it makes different groups to do a reservation. The bot requirements are the following:

- The bot will listen to an specific command and will start the process with a comment like: "Ey! who is going to have lunch out today?".

- The bot should count the number of people that want to go out with the reaction ":+1:".

- With another command the bot will stop accepting more people for the groups and willl start making groups.

- The bot should make groups of maximum 7 people and each group should have more or less the same amount of people. (+/- 1 person).

- Each group will have a leader that will make the reservation.

- We want to avoid having the same groups/leaders each week.

- The bot will inform each group who are the members and who is the leader.

Moreover, the Slackbot can start/stop the process in certain hour/days of the week. Several tests have been done to complete the applications.


## Getting Started

The code application has been developed with node.js.

### Installing

First, you have to install npm packages used in the project. So, you have to run the next command in the root of directory

```
npm install
```

Now, you have to create a file called .env which contains the environment variables used in this project. In this case, the variable SLACK_TOKEN is the token associated to the bot, so copy it from your bot.

```
# Environment config
SLACK_TOKEN=xoxb-xxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx
```

Now the app is ready to run with the command

```
npm start
```

## Description how to run the count

In the index.js file there is a variable called 'autoBot'.

If autobot = false, the bot is initialized in the Slack chat with the message 'bottis start'. In this moment the bot starts to count the persons who their reaction will be ':+1:'. The bot stops to count with the message 'bottis stop' and it will create the group to do the reservation. Each group has a leader, so finally the users subscribed to the list and its leader are shown in the chat.

On the other hand, the bot can be initialized automatically in a certain time/date with autobot = true. In index.js there are two variables, timeToStart and timeToStart. Both of them are objects whose keys are the hour, minutes and day of week to init the count.


## Running the tests

Several test have been done for this project. The tests are running under [Jasmine](https://jasmine.github.io/index.html) and you have to run the next command to execute them

```
npm test
```

## Highlights

### Tests

In this case, only simple functions have been tested since for the big functions it was necessary to mock the object rtm. So here, I have demonstrated that I know how to test but I never had the opportunity to test at a hight level.


### Avoiding the same groups/leaders each week

This problem has been handled in the following way:

- The array that contains all users subscribed to the list is mixed by a function shuffleArray() before to split it into groups.

- The first user of each group (first element of each array) is the leader of each group and they are stored in a database. The next week, this leaders are checked with the new leaders. If some leader exits in the database, this leader is updated by the next one of the array. When the new leaders are choosen, the database is deleted and the new leaders are stored again.
The case when all users subscribed in the list of current week has been leaders in the previous week had not been considered.

I have consider with these two points that the likelihood of choose the same groups and leaders is very low.

## Authors

* **Veróinica González**
