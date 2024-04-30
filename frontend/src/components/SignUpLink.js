import { Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    // color: theme.palette.primary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const SignUpLink = () => {
  const classes = useStyles();

  return (
    <Typography variant="body2" sx={{margin:2}}>
      Do you want to registrate?&nbsp;
      <Link href="/signup" className={classes.link}>
        Sign Up
      </Link>
    </Typography>
  );
};

export default SignUpLink;
