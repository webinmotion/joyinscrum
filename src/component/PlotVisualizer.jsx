import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useAppContext } from '../store';

/**
 * y-axis - 0 - # of voters
 * x-axis - each bar represents a voting choice
 *        - height of bar represents # of voters who picked that choice
 *        - sum(height of all bars) should equal # of voters  
 * @param {*} param0 
 * @returns 
 */
export default function PlotVisualizer() {

  const { scrum, players } = useAppContext()
  const canvasRef = useRef();

  useEffect(() => {
    // extract bar chart data
    const choices = scrum.scrum_choices.split(",");

    // initialize a map having choices as the keys
    const polling = choices.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});

    // update each choice (map key) in the map with votes matching that choice
    const updated = players.reduce((acc, player) => {
      const curr = parseInt(player.choice) || 0;
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, polling);

    // break down map object into array of map entries
    const data = Object.keys(updated).map(key => {
      return ({ choice: key, votes: updated[key] })
    });

    // plotting the data
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map(col => col.choice),
        datasets: [{
          label: 'Distribution of Voting',
          data: data.map(col => col.votes),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { text: '# of Votes' }
          },
          x: {
            title: { text: 'Voting Choices' }
          }
        },
      }
    });

    return () => {
      chart.destroy()
    }

  }, [scrum, players])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,

        },
      }}
    >
      <Paper elevation={3}>
        <canvas ref={canvasRef} width="600" height="400"></canvas>
      </Paper >
    </Box>
  );
}