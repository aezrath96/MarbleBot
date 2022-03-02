You need to download VoiceAttack first from:
https://voiceattack.com/

Then import the profile and SQL file into your database.

I recommend creating a local database using xampp:
https://www.apachefriends.org/download.html

Do not forget to edit code to match database to your info in both "mydb.php" and "index.js" files.
Import "database.sql" via PHPmyAdmin.

Create .env file and put this:
"export TWITCH_OAUTH_TOKEN='oauth:yourtoken'"

You can get the token from:

https://twitchapps.com/tmi/

I will be working on automatizing this process via installer soon and updates.

I also included PHP admin panel.

You will need ClientID too from Twitch Developer console:

https://dev.twitch.tv/console


I will be working on a tutorial.

You start it using:

`node index.js`

in command prompt you run as administrator.

Run VoiceAttack as Admin too.

To clone this repo, run:

`gh repo clone aezrath96/MarbleBot`

You need Node.js installed:

https://nodejs.org/en/download/

Download from releases:

https://github.com/aezrath96/MarbleBot/releases/