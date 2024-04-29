import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../store';
import { supabase } from '../service/auth';
import { useParams } from "react-router-dom";

export default function Joyinscrum() {

    const { scrumId, playerId } = useParams();
    const [choices, setChoices] = React.useState("");
    const [current, setCurrent] = React.useState("");
    const { showAlert, setPlayers } = useAppContext();

    React.useEffect(() => {
        (async function () {
            let { data: players, error } = await supabase
                .from('tbl_scrum_player')
                .select("*")
                // Filters
                .eq('player_handle', playerId)
                .eq('scrum_id', scrumId)

            if (error) {
                showAlert({ message: error.message, severity: 'error' })
            }
            else if (players?.length > 0) {
                setPlayers(players)
            }
            else {

                const { data: players2, error } = await supabase
                    .from('tbl_scrum_player')
                    .insert([
                        { player_handle: playerId, scrum_id: scrumId, player_joined: true, },
                    ])
                    .select()

                if (error) {
                    showAlert({ message: error.message, severity: 'error' })
                }
                else if (players2?.length > 0) {
                    setPlayers(players2)
                }
            }
        })()
    }, []);

    React.useEffect(() => {
        (async function () {
            const subscribe = supabase.channel('tbl-scrummage-chan')
                .on(
                    'postgres_changes',
                    { event: 'UPDATE', schema: 'public', table: 'tbl_scrummage' },
                    (payload) => {
                        console.log('Change received!', payload);
                        const { current_item, scrum_choices } = payload["new"];
                        setChoices(scrum_choices)
                        setCurrent(current_item);
                    }
                )
                .subscribe()

            console.log(subscribe)
        })()
    }, [])

    async function updateChoice(event) {
        const choice = event.target.value;
        const { data, error } = await supabase
            .from('tbl_scrum_player')
            .update({ player_choice: choice })
            .eq('player_handle', playerId)
            .eq('scrum_id', scrumId)
            .select()

            if(error){
                showAlert({message: error.message, severity: 'error'})
            }
            else{
                console.log(data)
                showAlert({message: 'vote updated', severity: 'info', autoClose: true})
            }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant='h2'>{current}</Typography>
                <div style={{ mt: 10 }}>
                    <TextField
                        id="select-option"
                        select
                        label="Select Best Option"
                        onChange={updateChoice}
                        helperText="Please select your best estimation"
                    >
                        {choices?.split(",").map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Box>
        </Container>
    )
}