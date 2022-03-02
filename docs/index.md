You need to download **VoiceAttack** first from:
[here](https://voiceattack.com/)

Then import the **marbles-Profile.vap** and **database.sql** file into your database.

I recommend creating a local database using xampp:
[here](https://www.apachefriends.org/download.html)

Do not forget to edit code to match database to your info in both **mydb.php** and **index.js** files.
Import **database.sql** via PHPmyAdmin.

Create **.env** file and put this:
"export TWITCH_OAUTH_TOKEN='oauth:yourtoken'"

You can get the token from:

[here](https://twitchapps.com/tmi/)

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

You need Node.js installed:

[here](https://nodejs.org/en/download/)