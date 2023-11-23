import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex flex-col">
      <img className="w-160" src="assets/images/logo/logo.png" alt="logo" />

      {/* <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        style={{ backgroundColor: '#121212', color: '#61DAFB' }}
      >
         <img
          className="react-badge"
          src=""
          alt="react"
          width="16"
        />
        <span className="react-text text-16 mx-4">Bag N Dash</span>
      </div> */}
    </Root>
  );
}

export default Logo;
