import './App.css';
import data from './data.json'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import hardcodeData from './hardcode.json';

const formatPoints = num => (Math.round(num * 100) / 100).toFixed(2)

const { team1Name, team2Name, teamIdToNames, teamOneIds, teamTwoIds} = hardcodeData

const teamOneTotalPoints = formatPoints(data.teamOnePoints.total)
const teamTwoTotalPoints = formatPoints(data.teamTwoPoints.total)

function App() {
  return <div className='mainContainer'>
    <div className='leftContainer halfContainer'>
      <Typography variant="h2">{team1Name}</Typography>

      {/* Individual Scores */}
      {teamOneIds.sort((a,b) => data[teamIdToNames[a]].total - data[teamIdToNames[b]].total).map(id => {
        const teamName = teamIdToNames[id]
        return <Accordion className='accordianContainer' key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <div className='fullWidth'>
              <div>
                {teamName}
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
          <div className='boldFont fullWidth'><div>Total: </div><div className='rightTextAlign'>{teamOneTotalPoints}</div></div>
        </AccordionSummary>
        <AccordionDetails>
          {data.teamOnePoints.scores.map((score, week) => score ? <div key={week} className='flexRow'>
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
          <div className={`fullWidth ${teamOneTotalPoints - teamTwoTotalPoints < 1 ? 'redFont' : 'greenFont'}`}>
            <div>Diff: </div>
            <div className='rightTextAlign'>{formatPoints(teamOneTotalPoints - teamTwoTotalPoints)}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {data.teamOnePoints.scores.map((score, week) => score ? <div key={week}>
            <div className='fullWidth centerTextAlign'>Week {week + 1}</div>
            <div className='fullWidth'>
              <div className={`${score - data.teamTwoPoints.scores[week] < 1 ? 'redFont' : 'greenFont'}`}>{formatPoints(score - data.teamTwoPoints.scores[week])}</div>
              <div className={`rightTextAlign ${data.teamOnePoints.rollingDiff[week] < 1 ? 'redFont' : 'greenFont'} `}>{formatPoints(data.teamOnePoints.rollingDiff[week])}</div>
            </div>
          </div> : null)}
        </AccordionDetails>
      </Accordion>
    </div>


    {/* Right Side */}

    <div className='rightContainer halfContainer'>
      <Typography variant="h2">{team2Name}</Typography>
      {/* Individual Scores */}
      {teamTwoIds.sort((a,b) => data[teamIdToNames[a]].total - data[teamIdToNames[b]].total).map(id => {
        const teamName = teamIdToNames[id]
        return <Accordion className='accordianContainer' key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <div className='fullWidth'>
              <div>
                {teamName}
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
          <div className='fullWidth boldFont'><div>Total: </div><div className='rightTextAlign'>{teamTwoTotalPoints}</div></div>
        </AccordionSummary>
        <AccordionDetails>
          {data.teamTwoPoints.scores.map((score, week) => score ? <div key={week} className='flexRow'>
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
          <div className={`fullWidth ${teamTwoTotalPoints - teamOneTotalPoints < 1 ? 'redFont' : 'greenFont'}`}>
            <div>Diff: </div>
            <div className='rightTextAlign'>{formatPoints(teamTwoTotalPoints - teamOneTotalPoints)}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {data.teamTwoPoints.scores.map((score, week) => score ? <div key={week}>
            <div className='fullWidth centerTextAlign'>Week {week + 1}</div>
            <div className='fullWidth'>
              <div className={`${score - data.teamOnePoints.scores[week] < 1 ? 'redFont' : 'greenFont'}`}>{formatPoints(score - data.teamOnePoints.scores[week])}</div>
              <div className={`rightTextAlign ${data.teamTwoPoints.rollingDiff[week] < 1 ? 'redFont' : 'greenFont'} `}>{formatPoints(data.teamTwoPoints.rollingDiff[week])}</div>
            </div>
          </div> : null)}
        </AccordionDetails>
      </Accordion>
    </div>
  </div>
}

export default App;
