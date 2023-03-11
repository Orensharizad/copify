import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { styled, useTheme } from '@mui/material/styles';

export default function VolumeSlider({ onHandleChange, volumn }) {
    const theme = useTheme();



    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown />
                {/* <Slider aria-label="Volume" step={0.1} min={0} max={1} value={volumn} onChange={onHandleChange}  /> */}
                <Slider
                    aria-label="Volume"
                    step={0.1} min={0} max={1} value={volumn} onChange={onHandleChange}
                    sx={{
                        color: theme.palette.mode !== 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            backgroundColor: '#fff',
                            '&:before': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                />
                <VolumeUp />
            </Stack>
        </Box>
    );
}