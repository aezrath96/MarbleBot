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

You will need ClientID too from Twitch Developer console.
I will be working on a tutorial.