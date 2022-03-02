const fetch = require('fetch');
const tmi = require('tmi.js');
require('dotenv').config();
var exec = require('child_process').exec;
var say = require("say");
var mysql = require('mysql');
var axios = require('axios');
const request = require('request');

const clientId = 'YOURCLIENTID';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mysqluser',
  password : 'mysqlpass',
  database : 'mysqldbname'
});

connection.connect(function(err) {
    if (err) throw err

});

// cooldown

var sayTime;
var sayCooldown = COOLDOWNINSECONDS * 1000; // in millseconds

// connect to twitch

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'twitchbotaccount',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: ['yourstreamingtwitchchannel']
});

client.connect();

// commands

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if(self) return;
  const command = message.toLowerCase();
  let trimmedMessage = message.trim();
  let splitMessage = trimmedMessage.split(" "); // command arguments
  let targetUser = "";
  // check if mod
  const badges = tags.badges || {};
  const isBroadcaster = badges.broadcaster;
  const isMod = badges.moderator;
  const isModUp = isBroadcaster || isMod;
  // more arguments
  var input = message.split(' ')[1];
    if(splitMessage.length > 1){
        targetUser = splitMessage[1];
    }

    // camera validation

  if(command.startsWith('!camera') && splitMessage[1] < '1' || command.startsWith('!camera') && splitMessage[1] > '9')
  {
    client.say(channel, `@${tags.username}, camera cannot be lower than 1 and higher than 9.`);
  }

  // functions

  function playeramount() {
    connection.query("SELECT amount FROM playeramount WHERE Id = '1'", function (err, result, fields) {
      if (err) throw err;
      const state = result[0].amount;
      if(state < '1') {
      client.say(channel, `@${tags.username}, check how many users are in the game. To make the in-game camera follow a particular marble, type '!camera [1,1]' correlating to the leaderboard position of the marble you want to follow. Those commands are on global cooldown of 30 seconds.`);
      }
      else
      {
      client.say(channel, `@${tags.username}, check how many users are in the game. To make the in-game camera follow a particular marble, type '!camera [1,` + state + `]' correlating to the leaderboard position of the marble you want to follow. Those commands are on global cooldown of 30 seconds.`);     
      }
    });
}

  function selectstateend() {
    connection.query("SELECT RaceState FROM racestate WHERE Id = '1'", function (err, result, fields) {
      if (err) throw err;
      const state = result[0].RaceState;
      if(state > '0') {
        client.say(channel, `@${tags.username}, the race has ended. Resetting the amount of people joined in the race.`);
            var sql = "UPDATE racestate, playeramount SET racestate.RaceState = '0', playeramount.amount = '0' WHERE racestate.Id = '1' AND playeramount.Id = '1'";
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
        }
        else
        {
        client.say(channel, `@${tags.username}, there is no race to end.`);
        }
    });
}

function fixamount() {
  connection.query("SELECT RaceState FROM racestate WHERE Id = '1'", function (err, result, fields) {
    if (err) throw err;
    const state = result[0].RaceState;
    if(state > '0') {
      client.say(channel, `@${tags.username}, changing the amount of players in the race to ` + splitMessage[1] + `.`);
          var sql = "UPDATE playeramount SET amount = '" + splitMessage[1] + "' WHERE Id = '1'";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
          });
      }
      else
      {
      client.say(channel, `@${tags.username}, there is no race to adjust.`);
      }
  });
}

function selectstatestart() {
      connection.query("SELECT RaceState FROM racestate WHERE Id = '1'", function (err, result, fields) {
        if (err) throw err;
        const state = result[0].RaceState;
        if(state < '1') {
            if(splitMessage[1] < 1 || splitMessage[1] > 9 || !splitMessage[1]) {
            client.say(channel, `@${tags.username}, the race can't have less than one or more than ten people.`);                
            }
            else {
            client.say(channel, `@${tags.username}, the race has started. Adding ` + splitMessage[1] + ` people to the race.`);
            var sql = "UPDATE racestate, playeramount SET racestate.RaceState = '1', playeramount.amount = '" + splitMessage[1] + "' WHERE racestate.Id = '1' AND playeramount.Id = '1'";
                connection.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log(result.affectedRows + " record(s) updated");2
              });
            }
        }
            else
            {
            client.say(channel, `@${tags.username}, end the previous race before starting a new one.`);   
            }
      });
  }

  function settitle() {
    let arguments= message.replace("!title", "");
      headers = {
        'Authorization':'Bearer twitchoauthtoken',
        'Client-Id':clientId,
        'Content-Type':'application/json'
    }
    
    data = {
        'title':arguments
    }
    
    axios.patch('https://api.twitch.tv/helix/channels?broadcaster_id=STREAMERID', data, {'headers':headers}).then(resp => {
        console.log(resp.data);
    }).catch(err => console.error(err))
  }

  function gettitle() {
    let arguments= message.replace("!title", "");
      headers = {
        'Authorization':'Bearer twitchoauthtoken',
        'Client-Id':clientId,
        'Content-Type':'application/json'
    }
    
    axios.get('https://api.twitch.tv/helix/channels?broadcaster_id=STREAMERID', {'headers':headers}).then(resp => {
      let title = resp.data.data[0].title;
      client.say(channel, "Current title is: " + title);
    }).catch(err => console.error(err))
  }
  
  function setgame() {
    let arguments = message.replace("!game", "");
      let gamename = arguments.replace( /\s+/, '').trim();
      headers = {
        'Authorization':'Bearer twitchoauthtoken',
        'Client-Id':clientId,
        'Content-Type':'application/json'
    }
  
    axios.get('https://api.twitch.tv/helix/games?name=' + gamename + '', {'headers':headers}).then(resp => {
      let gameid = resp.data.data[0].id;
      data = {
        'game_id':gameid
      }
      
      axios.patch('https://api.twitch.tv/helix/channels?broadcaster_id=STREAMERID', data, {'headers':headers}).then(resp => {
      }).catch(err => console.error(err))
  }).catch(err => console.error(err))  
  }

  function getgame() {
    let arguments = message.replace("!game", "");
      let gamename = arguments.replace( /\s+/, '').trim();
      headers = {
        'Authorization':'Bearer twitchoauthtoken',
        'Client-Id':clientId,
        'Content-Type':'application/json'
    }
  
    axios.get('https://api.twitch.tv/helix/channels?broadcaster_id=STREAMERID', {'headers':headers}).then(resp => {
      let gameid = resp.data.data[0].game_name;
      client.say(channel, "Current game is: " + gameid);
  }).catch(err => console.error(err))  
  }

  function commands() {
    connection.query("SELECT amount FROM playeramount WHERE Id = '1'", function (err, result, fields) {
      if (err) throw err;
      const amount = result[0].amount;
      const newamount = amount+1;
      connection.query("SELECT RaceState FROM racestate WHERE Id = '1'", function (err, result, fields) {
        if (err) throw err;
      const state = result[0].RaceState;
      if(state < '1') {
          client.say(channel, `@${tags.username}, there is no race ongoing. You can't use this command.`);
          }
          else
          {
            connection.query("SELECT * FROM commands WHERE Id < '" + newamount + "'", function(err, rows, fields) {
                rows.forEach(function(row) {
                  let commandname = row.Name;
                  let commandparam = row.Parameter;
                  let commandid = row.Id;
                  if(command === commandname) {
                    if(!sayTime || Date.now() - sayTime >= sayCooldown){
                      // Change location to your VoiceAttack.exe file
                        exec('start D:\\VoiceAttack\\VoiceAttack.exe -command ' + commandparam, function (err, stdout, stderr) {
                            if (err) {
                                throw err;
                            }
                        })
                    client.say(channel, `@${tags.username} has started following the marble in a position #` + commandid + `!`)
                    sayTime = Date.now();
                  }
                else {
                    timeleft = (sayCooldown - (Date.now() - sayTime))/1000;
                    timerounded = Math.round(timeleft);
                    client.say(channel, `@${tags.username}, this command is on cooldown for the next ` + timerounded + ` seconds!`)
                }
                  }
                });
              });
          }
        });
    });
}

// commands

if(command === '!help') {
  playeramount();
  }

if(command === '!camera 1' || command === '!camera 2' || command === '!camera 3' || command === '!camera 4' || command === '!camera 5' || command === '!camera 6' || command === '!camera 7' || command === '!camera 8' || command === '!camera 9') {
    commands();
}
  
  if(isModUp) {
  if(command === '!endrace') {
    selectstateend();
  }
}

  if(isModUp) {
  if(command.startsWith('!startrace')) {
    selectstatestart();
  }
}

if(isModUp) {
  if(command.startsWith('!fixamount ')) {
    fixamount();
  }
}

if(isModUp) {
  if(command.includes('!title')) {
    let arguments= message.replace("!title", "");
    if(!arguments) {
      gettitle();
    }
    else
    {
      settitle();
      let arg = arguments.replace( /\s+/, '').trim();
  client.say(channel, 'Title updated to "' + arg + '"!');
    }
  }
}

if(isModUp) {
  if(command.includes('!game')) {
    let arguments= message.replace("!game", "");
    if(!arguments) {
      getgame();
    }
    else
    {
      setgame();
      let arg = arguments.replace( /\s+/, '').trim();
  client.say(channel, 'Game updated to "' + arg + '"!');
    }
  }
}

});