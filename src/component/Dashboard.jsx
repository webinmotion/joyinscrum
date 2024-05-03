import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import '../markdown/dashboard.scss'

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
            <Paper elevation={0}>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown >
            </Paper>
        </Box>
    )
}