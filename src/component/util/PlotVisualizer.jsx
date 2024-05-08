import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useAppContext } from '../../store';
import { supabase } from '../../service/auth';

/**
 * y-axis - 0 - # of voters
 * x-axis - each bar represents a voting choice
 *        - height of bar represents # of voters who picked that choice
 *        - sum(height of all bars) should equal # of voters  
 * @param {*} param0 
 * @returns 
 */
export default function PlotVisualizer() {

  const { scrum, players, setScrum, showAlert } = useAppContext()
  const canvasRef = useRef();

  useEffect(() => {
    (async function () {
      const subscribe = supabase.channel('tbl-scrummage-chan')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'tbl_scrummage' },
          (payload) => {
            console.log('Change received!', payload);

            switch (payload.eventType) {
              case "UPDATE": {
                setScrum(payload["new"])
                break;
              }
              default: {
                showAlert({ message: `ignoring ${payload.eventType} event in tbl_scrummage`, severity: 'info' })
              }
            }
          }
        )
        .subscribe()

      console.log(subscribe)
    })()
  }, [])

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
      let curr = String(player.choice);
      if (!choices.includes(curr)) {
        curr = 'NV';
      }
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, polling);

    // break down map object into array of map entries
    const data = Object.keys(updated).map(key => {
      return ({ choice: key, votes: updated[key] })
    });

    // plotting the data
    const chart = new Chart(canvasRef.current.getContext('2d'), {
      type: 'bar',  //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: data.map(col => col.choice),
        datasets: [{
          label: 'Distribution of Voting',
          data: data.map(col => col.votes),
          backgroundColor: ['lightgreen', 'orange', 'yellow', 'lightblue', 'lightbrown', 'lightgray', 'violet'],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Voting count grouped by number of votes per choice',
          fontSize: 20,
        },
        legend: {
          display: false,
          position: 'right',  //top, bottom, left, right
        },
        layout: {
          padding: {
            left: 30,
            right: 10,
            bottom: 30,
            top: 10,
          }
        },
        scales: {
          display: true,
          y: {
            beginAtZero: true,
            title: { 
              display: true,
              text: '# of Votes', 
              color: 'red',
            }
          },
          x: {
            title: { 
              display: true,
              text: 'Voting Choices', 
              color: 'red',
            }
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