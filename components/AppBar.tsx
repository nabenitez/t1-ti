import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, alpha, Theme, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
      cursor: "pointer",
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <NextLink href="/" passHref>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Tarea1 IIC3103
          </Typography>
        </NextLink>
        <nav>
          <NextLink href="/users" passHref>
            <Link variant="button" color="textPrimary" className={classes.link}>
              Users
            </Link>
          </NextLink>
          <NextLink href="/cities" passHref>
            <Link variant="button" color="textPrimary" href="/Cities" className={classes.link}>
              Cities
            </Link>
          </NextLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
