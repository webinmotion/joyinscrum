import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../markdown/dashboard.scss';

export default function Dashboard() {

    const [content, setContent] = useState('');

    useEffect(() => {
        import('../markdown/Dashboard.md').then((res) => {
            fetch(res.default)
                .then(response => response.text())
                .then(text => setContent(text))

        })
    }, []);

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
            <Paper sx={{ p: 3 }} elevation={0}>
                <Typography variant='h2' component={"h2"} sx={{mb: 2}} color={"secondary"}>Scrum like you mean it...</Typography>
                <video
                    autoPlay={false}
                    loop={false}
                    width="320" height="240" controls
                    poster="./img/office-meeting.jpg"
                >
                    <source
                        src='video/joy-in-scrum-how-to-intro.mp4'
                        type="video/mp4"
                    />
                </video>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown >
            </Paper>
        </Box>
    )
}