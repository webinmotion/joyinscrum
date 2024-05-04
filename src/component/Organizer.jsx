import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FilledInput from '@mui/material/FilledInput';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { useAppContext } from '../store';
import { supabase } from '../service/auth';
import { Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlotVisualizer from './PlotVisualizer';
import ClipboardCopy from './ClipboardCopy';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "150px",
    color: theme.palette.text.secondary,
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function createPlayerRecord({ player_handle, player_joined, player_choice }) {
    return ({
        email: player_handle,
        joined: player_joined,
        choice: player_choice
    });
}

export default function Organizer() {

    const [value, setValue] = React.useState(0);
    const [topic, setTopic] = React.useState('');
    const { auth: { session }, scrum, players, showAlert, setScrum, addPlayer, updatePlayer, removePlayer, setPlayers, clearAllVotes } = useAppContext();

    React.useEffect(() => {
        (async function () {
            if (!scrum) {
                let { data: scrummage, error } = await supabase
                    .from('tbl_scrummage')
                    .select("*")
                    .eq('organizer_email', session.user.email)

                if (error) {
                    showAlert({ message: error.message, severity: 'error' })
                }
                else if (scrummage?.length > 0) {
                    setScrum(scrummage[0])
                }
                else {
                    const defaultChoices = "1,2,3,5,8,13"
                    const { data: scrummage2, error } = await supabase
                        .from('tbl_scrummage')
                        .insert([
                            { organizer_email: session.user.email, scrum_title: session.user.id, scrum_choices: defaultChoices },
                        ])
                        .select()

                    if (error) {
                        showAlert({ message: error.message, severity: 'error' })
                    }
                    else if (scrummage2?.length > 0) {
                        setScrum(scrummage2[0])
                    }
                }
            }
        })()
    }, [])

    React.useEffect(() => {
        (async function () {

            if (scrum?.scrum_id) {
                let { data: rows, error } = await supabase
                    .from('tbl_scrum_player')
                    .select('*')
                    .eq('scrum_id', scrum?.scrum_id)

                if (!error) {
                    const players = rows.map(createPlayerRecord);
                    setPlayers(players);
                }
                else {
                    showAlert({ message: error.message, severity: 'error' })
                }
            }
        })();
    }, [scrum]);

    React.useEffect(() => {
        (async function () {
            const subscribe = supabase.channel('tbl-scrum-player-chan')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'tbl_scrum_player' },
                    (payload) => {
                        console.log('Change received!', payload);

                        switch (payload.eventType) {
                            case "INSERT": {
                                const player = payload["new"];
                                addPlayer(createPlayerRecord(player));
                                break;
                            }
                            case "UPDATE": {
                                const player = payload["new"];
                                updatePlayer(createPlayerRecord(player));
                                break;
                            }
                            case "DELETE": {
                                const player = payload["old"];
                                removePlayer(player);
                                break;
                            }
                            default: {
                                showAlert({ message: `ignoring ${payload.eventType} event in tbl_scrum_player`, severity: 'info' })
                            }
                        }
                    }
                )
                .subscribe()

            console.log(subscribe)
        })()
    }, [])

    React.useEffect(() => {
        (async function () {
            const subscribe = supabase.channel('tbl-scrummage-chan')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'tbl_scrummage' },
                    (payload) => {
                        console.log('Change received!', payload);

                        switch (payload.eventType) {
                            case "UPDATE": {
                                clearAllVotes();
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

    const cancelInvitation = async (playerId) => {
        const scrumId = scrum?.scrum_id;
        const { error } = await supabase
            .from('tbl_scrum_player')
            .delete()
            .eq('player_handle', playerId)
            .eq('scrum_id', scrumId)

        if (error) {
            showAlert({ message: error.message, severity: 'error' })
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateScrumTopic = async () => {
        if (topic && topic.trim().length > 0) {
            const scrumId = scrum?.scrum_id;
            const { data, error } = await supabase
                .from('tbl_scrummage')
                .update({ current_item: topic })
                .eq('scrum_id', scrumId)
                .select()

            if (error) {
                showAlert({ message: error.message, severity: 'error' })
            }
            else {
                console.log(data)
                setPlayers([...players.map(pl => ({ ...pl, choice: '' }))])
            }
        }
        else {
            showAlert({ message: 'You need to add the current topic before you can submit', severity: 'warning', autoClose: true })
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab label="QR Code" {...a11yProps(0)} />
                    <Tab label="Manage" {...a11yProps(1)} />
                    <Tab label="Voting" {...a11yProps(2)} />
                    <Tab label="Visualize" {...a11yProps(3)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <QRCode value={`${document.location.origin}/scrum/${scrum?.scrum_id}`} />
                <ClipboardCopy copyText={`${document.location.origin}/scrum/${scrum?.scrum_id}`} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="current-topic">Submit current topic</InputLabel>
                    <FilledInput
                        id="current-topic"
                        multiline={true}
                        rows={4}
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="generate invitation link"
                                    onClick={updateScrumTopic}
                                disabled={!topic}
                                >
                                    <ArrowCircleRight fontSize='large' color='primary' sx={{ mb: 3 }} />
                                </IconButton>
                            </InputAdornment>}
                    />
                </FormControl>

                <Grid container spacing={2} sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {players.map(({ email, choice }) => (
                        <Grid key={email} item xs={4}>
                            <Item>invitation for {email}
                                <IconButton aria-label="delete" size="small" color="danger" onClick={() => cancelInvitation(email)}>
                                    <CancelIcon fontSize="inherit" />
                                </IconButton>
                                <div>{choice ? <CheckCircleIcon sx={{ mt: 2, fontSize: 80 }} /> : <HourglassTopIcon sx={{ mt: 2, fontSize: 80 }} />}</div>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <Grid container spacing={2} sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {players.map(({ email, choice }) => (
                        <Grid key={email} item xs={4}>
                            <Item>invitation for {email}
                                <IconButton aria-label="delete" size="small" color="danger" onClick={() => cancelInvitation(email)}>
                                    <CancelIcon fontSize="inherit" />
                                </IconButton>
                                <Typography variant='h2' fontSize={90}>{choice}</Typography>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
                <PlotVisualizer />
            </CustomTabPanel>
        </Container>
    )
}