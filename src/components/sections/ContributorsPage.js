import React from "react";
import { Grid, Typography, Avatar, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  avatatContainer: {
    width: "50%",
  },
  divider: {
    width: "100%",
    margin: 10,
  },
  miniContainer: {
    margin: 10,
    "& div": {
      margin: "2px",
    },
    "& .MuiAvatar-root": {
      // width: 50,
      // height: 50,
      marginRight: 20,
      marginLeft: 10,
      background: pink[500],
      color: "#fff",
    },
  },
});

const ContributorsPage = () => {
  const classes = useStyles();

  return (
    <>
      <br />
      <Grid container justify="center">
        <Grid
          component={Link}
          href="https://github.com/spyder1906"
          target="blank"
          container
          direction="column"
          alignItems="center"
          color="inherit"
          className={classes.avatatContainer}
        >
          <Avatar
            className={classes.avatar}
            src="https://avatars.githubusercontent.com/u/67554647?s=400&u=9a2deb52731cadbfad273a2b2ea234c40b1b1bc9&v=4"
          />
          <Typography variant="h5">Spyder</Typography>
          <Typography>Creator of Beats Music</Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="h5">Other Contributors</Typography>

        <Grid container className={classes.miniContainer}>
          <Grid container alignItems="center">
            <Avatar>Z</Avatar>
            <Typography variant="h6">Zaid</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContributorsPage;
