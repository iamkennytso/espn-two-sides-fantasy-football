import './App.css';
import data from './data.json'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import hardcodeData from './hardcode.json';

const formatPoints = num => (Math.round(num * 100) / 100).toFixed(2)

const { team1Name, team2Name, teamIdToNames, teamOneIds, teamTwoIds } = hardcodeData;

const teamOneTotalPoints = formatPoints(data.teamOnePoints.total)
const teamTwoTotalPoints = formatPoints(data.teamTwoPoints.total)

const TeamPane = ({sideOneOrTwo}) => {
  const isSideOne =  sideOneOrTwo === 'one'
  const sideName = isSideOne ? team1Name : team2Name
  const sideTeamIds = isSideOne ? teamOneIds : teamTwoIds
  const sideTotalPoints = isSideOne ? teamOneTotalPoints : teamTwoTotalPoints
  const opposingTotalPoints = isSideOne ? teamTwoTotalPoints : teamOneTotalPoints
  const sidePoints = isSideOne ? 'teamOnePoints' : 'teamTwoPoints'
  const opposingSidePoints = isSideOne ? 'teamTwoPoints' : 'teamOnePoints'

  return <>
    <Typography variant="h2">{sideName}</Typography>

    {/* Individual Scores */}
    {sideTeamIds.sort((a, b) => data[teamIdToNames[a]].total - data[teamIdToNames[b]].total).map(id => {
      const teamName = teamIdToNames[id]
      return <Accordion className='accordianContainer' key={id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <div className='fullWidth'>
            <div className='flexApart'>
              {teamName}
              <div className='boldFont'>{data[teamName].wins}-{data[teamName].losses}</div>
            </div>
            <div className='rightTextAlign'>
              {formatPoints(data[teamName].total)}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {data[teamName].scores.map((score, week) => score ? <div key={week} className='flexRow'>
            <div className='oneOfTwoSections'>
              Wk {week + 1}:
            </div>
            <div className='oneOfTwoSections rightTextAlign'>
              {formatPoints(score)}
            </div>
          </div> : null)}
        </AccordionDetails>
      </Accordion>
    })}

    {/* Combined Totals */}
    <Accordion className='accordianContainer boldFont'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div className='boldFont fullWidth'><div>Total: </div><div className='rightTextAlign'>{sideTotalPoints}</div></div>
      </AccordionSummary>
      <AccordionDetails>
        {data[sidePoints].scores.map((score, week) => score ? <div key={week} className='flexRow'>
          <div className='oneOfTwoSections'>
            Wk {week + 1}:
          </div>
          <div className='oneOfTwoSections rightTextAlign'>
            {formatPoints(score)}
          </div>
        </div> : null)}
      </AccordionDetails>
    </Accordion>

    {/* Team Diffs */}
    <Accordion className='accordianContainer boldFont'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div className={`fullWidth ${sideTotalPoints - opposingTotalPoints < 1 ? 'redFont' : 'greenFont'}`}>
          <div>Diff: </div>
          <div className='rightTextAlign'>{formatPoints(sideTotalPoints - opposingTotalPoints)}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {data[sidePoints].scores.map((score, week) => score ? <div key={week}>
          <div className='fullWidth centerTextAlign'>Week {week + 1}</div>
          <div className='fullWidth'>
            <div className={`${score - data[opposingSidePoints].scores[week] < 1 ? 'redFont' : 'greenFont'}`}>{formatPoints(score - data[opposingSidePoints].scores[week])}</div>
            <div className={`rightTextAlign ${data[sidePoints].rollingDiff[week] < 1 ? 'redFont' : 'greenFont'} `}>{formatPoints(data[sidePoints].rollingDiff[week])}</div>
          </div>
        </div> : null)}
      </AccordionDetails>
    </Accordion>
  </>
}

function App() {
  return <div className='mainContainer'>
    <div className='leftContainer halfContainer'>
      <TeamPane sideOneOrTwo='one' />
    </div>
    <div className='rightContainer halfContainer'>
      <TeamPane sideOneOrTwo='two' />
    </div>
  </div>
}

export default App;
