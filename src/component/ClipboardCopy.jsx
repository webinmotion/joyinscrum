import { useState } from 'react';
import PropTypes from 'prop-types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function ClipboardCopy({ copyText }) {

    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <Typography sx={{ mt: 3 }} variant='h4'>{copyText}</Typography>
            <IconButton aria-label="click to copy text" onClick={handleCopyClick} title='click to copy url'>
                <ContentCopyIcon />
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </IconButton>
        </>

    );
}

ClipboardCopy.propTypes = {
    copyText: PropTypes.string.isRequired
}