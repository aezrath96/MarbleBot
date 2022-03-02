You need to download **VoiceAttack** first from: [Here](https://voiceattack.com/)

Then import the **marbles-Profile.vap** and **database.sql** file into your database.

I recommend creating a local database using xampp: [Here](https://www.apachefriends.org/download.html)

Do not forget to edit code to match database to your info in both **mydb.php** and **index.js** files.
Import **database.sql** via PHPmyAdmin.

Create **.env** file and put this:
"export TWITCH_OAUTH_TOKEN='oauth:yourtoken'"

You can get the token from: [Here](https://twitchapps.com/tmi/)

I will be working on automatizing this process via installer soon and updates.

I also included PHP admin panel.

You will need ClientID too from Twitch Developer console.
I will be working on a tutorial.

You start it using:

`node index.js`

in command prompt you run as administrator.

Run VoiceAttack as Admin too.

To clone this repo, run:

`gh repo clone aezrath96/MarbleBot`

You need Node.js installed: [Here](https://nodejs.org/en/download/)