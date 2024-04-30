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

const SignInLink = () => {
  const classes = useStyles();

  return (
    <Typography variant="body2" sx={{margin:2}}>
      Already have an account?&nbsp;
      <Link href="/signin" className={classes.link}>
        Sign In
      </Link>
    </Typography>
  );
};

export default SignInLink;
