import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

//message is optional, and can be passed in depending on what is loading
interface Props {
  message?: string;
}

export default function LoadingComponent({ message = 'Loading...' }: Props) {
  return (
    // backdrop takes over full screen of app
    // prevents user from clicking on anything while api is being called
    <Backdrop open={true} invisible={true}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress size={100} color='secondary' />
        <Typography
          variant='h4'
          sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
