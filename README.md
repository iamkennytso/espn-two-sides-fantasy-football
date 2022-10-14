This app is for those who play Fantasy Football on ESPN and want to have two sides compete against each other.

Be sure to have a .env file with at least 1 variables:
`LEAGUE_ID` is your league ID. You can get this from the ESPN URL when visiting most pages in your league.
`SWID` and `ESPN_S2` are necessary if your league is private. You can get these via your cookies in an active session with ESPN.

In addition, you'll need to set up some of the `hardcode.json` to your league specifically for this to work properly.
You'll be able to get your team ID's from running the commented out code in the `backend.js`, and then it's a matter of hardcoding it in.

The original personal use project is hosted on firebase, which is why the `npm run update` will
1) run `backend.js` to get the latest data and save it as `data.json`
2) build the react app 
3) deploy to firebase
