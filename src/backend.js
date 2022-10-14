var axios = require('axios');
const fs = require('fs');
const { teamIds, teamOneIds, teamIdToNames } = require('./hardcode');
require('dotenv').config()

const currentYear = 2022

// run this once to get your team IDs
// var getLeagueIdsConfig = {
//   method: 'get',
//   // url: `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${currentYear}/segments/0/leagues/${process.env.LEAGUE_ID}?view=mMatchup`,
//   url: `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${currentYear}/segments/0/leagues/${process.env.LEAGUE_ID}`,

//   // cookie needed if private league
//   headers: {
//     'Cookie': `SWID={${process.env.SWID}}; _dcf=1; espn_s2=${process.env.ESPN_S2}; region=ccpa`
//   }
// };
// axios(getLeagueIdsConfig).then(response => console.log(response.data.teams))

var config = {
  method: 'get',
  url: `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${currentYear}/segments/0/leagues/${process.env.LEAGUE_ID}?view=mMatchup`,
  // cookie needed if private league
  headers: {
    'Cookie': `SWID={${process.env.SWID}}; _dcf=1; espn_s2=${process.env.ESPN_S2}; region=ccpa`
  }
};

const teamsData = teamIds.reduce((accu, team) => {
  accu[teamIdToNames[team]] = { scores: [], teamOne: teamOneIds.includes(team), total: 0 }
  return accu
}, {})
const teamOnePoints = { scores: [], total: 0 }
const teamTwoPoints = { scores: [], total: 0 }

axios(config)
  .then(function (response) {
    for (let game of response.data.schedule) {
      const { away, home, matchupPeriodId } = game;
      const { teamId: awayId, totalPoints: awayPoints } = away
      const { teamId: homeId, totalPoints: homePoints } = home
      if (awayPoints) {
        teamsData[teamIdToNames[awayId]].scores[matchupPeriodId - 1] = awayPoints
        teamsData[teamIdToNames[awayId]].total += awayPoints
      }
      if (homePoints) {
        teamsData[teamIdToNames[homeId]].scores[matchupPeriodId - 1] = homePoints
        teamsData[teamIdToNames[homeId]].total += homePoints
      }

      if (teamsData[teamIdToNames[awayId]].teamOne) {
        teamOnePoints.scores[matchupPeriodId - 1]
          ? teamOnePoints.scores[matchupPeriodId - 1] += awayPoints
          : teamOnePoints.scores[matchupPeriodId - 1] = awayPoints
          teamOnePoints.total += awayPoints
      } else {
        teamTwoPoints.scores[matchupPeriodId - 1]
          ? teamTwoPoints.scores[matchupPeriodId - 1] += awayPoints
          : teamTwoPoints.scores[matchupPeriodId - 1] = awayPoints
        teamTwoPoints.total += awayPoints
      }

      if (teamsData[teamIdToNames[homeId]].teamOne) {
        teamOnePoints.scores[matchupPeriodId - 1]
          ? teamOnePoints.scores[matchupPeriodId - 1] += homePoints
          : teamOnePoints.scores[matchupPeriodId - 1] = homePoints
        teamOnePoints.total += homePoints
      } else {
        teamTwoPoints.scores[matchupPeriodId - 1]
          ? teamTwoPoints.scores[matchupPeriodId - 1] += homePoints
          : teamTwoPoints.scores[matchupPeriodId - 1] = homePoints
        teamTwoPoints.total += homePoints
      }
    }

    let hold = 0
    teamOnePoints.rollingDiff = teamOnePoints.scores.map((week, idx) => {
      const prevScore = hold
      const rollingDiff = prevScore + week - teamTwoPoints.scores[idx]
      hold = rollingDiff
      return rollingDiff
    })
    
    teamTwoPoints.rollingDiff = teamOnePoints.rollingDiff.map(score => score * -1)

    fs.writeFileSync('src/data.json', JSON.stringify({ ...teamsData, teamOnePoints, teamTwoPoints }));
  })
  .catch(function (error) {
    console.log(error);
  });
