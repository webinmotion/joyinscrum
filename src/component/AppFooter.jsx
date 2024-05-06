import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" target={"_blank"} href={"https://www.linkedin.com/in/stephen-maina-linked-in"}>
                joyinscrum
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function AppFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex' }}>
                    <Avatar alt="joyinscrum" src="favicon-32x32.png" sx={{ mr: 2 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1">
                            Putting joy back in scrum
                        </Typography>
                        <Copyright />
                    </div>
                </Box>

                <Box sx={{ mt: 2, "& a": { mr: 5 } }}>
                    <Link aria-label={"contribute in github"} title={"contribute in github"} sx={{ fontSize: 14, textDecoration: 'none' }} target="_blank" href={"https://github.com/webinmotion/mind-flip/issues"}><GitHubIcon /></Link>
                    <Link aria-label={"follow in twitter"} title={"follow in twitter"} sx={{ fontSize: 14, textDecoration: 'none' }} target="_blank" href={"https://twitter.com/intent/tweet"} className="twitter-share-button"><TwitterIcon /></Link>
                    <Link aria-label={"join discord community"} title={"join discord community"} sx={{ fontSize: 14, textDecoration: 'none' }} target="_blank" href="https://discord.gg/wYCHkppk"><img src="img/icons-discord.png" alt='discord' /></Link>
                    <Link aria-label={"about the developer"} title={"about the developer"} sx={{ fontSize: 14, textDecoration: 'none' }} target="_blank" href={"https://www.linkedin.com/in/stephen-maina-linked-in"}><LinkedInIcon /></Link>
                    <a href="http://localhost:5173/privacypolicy.html" target="_blank" style={{ fontSize: '10px', textDecoration: 'none', opacity: 0.5, cursor: 'help' }}>privacy policy</a>
                    <a href="http://localhost:5173/termsofservice.html" target="_blank" style={{ fontSize: '10px', textDecoration: 'none', opacity: 0.5, cursor: 'help' }}>terms of service</a>
                </Box>
            </Container>
        </Box>
    )
}