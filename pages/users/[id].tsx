import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getUser, getUserCards, getUserAddresses, User } from "../../services/users";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import SimpleCard from "../../components/SimpleCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    row: { width: "33%", textAlign: "center" },
    rowCard1: { width: "80%", textAlign: "center" },
    rowCard2: { width: "20%", textAlign: "center" },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (id && typeof id === "string") {
    const user = await getUser(id);
    const userCards = await getUserCards(id);
    const userAddresses = await getUserAddresses(id);

    return {
      props: { user, userCards, userAddresses },
    };
  }
  return { props: {} };
};

type List = {
  title?: string;
  elements?: any[];
  value?: string;
};

const RenderCards = ({ cards }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2}>
      <List component="nav" className={classes.root}>
        <Divider />
        <ListItem>
          <ListItemText className={classes.rowCard1} primary="Credit Card Number" />
          <Divider orientation="vertical" flexItem />
          <ListItemText className={classes.rowCard2} primary="CVV" />
        </ListItem>
        <Divider />
        {cards.map((element, index) => (
          <ListItem button key={index}>
            <ListItemText className={classes.rowCard1} primary={element.creditCard} />
            <ListItemText className={classes.rowCard2} primary={element.CVV} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const RenderAddresses = ({ addresses }) => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2}>
      <List component="nav" className={classes.root}>
        <Divider />
        <ListItem>
          <ListItemText className={classes.row} primary="Address" />
          <Divider orientation="vertical" flexItem />
          <ListItemText className={classes.row} primary="City" />
          <Divider orientation="vertical" flexItem />
          <ListItemText className={classes.row} primary="Country" />
        </ListItem>
        <Divider />
        {addresses.map((element, index) => (
          <ListItem
            button
            onClick={() => {
              router.push(`/cities/${element.city.id}?name=${element.city.name}`);
            }}
            key={index}
          >
            <ListItemText key={1} className={classes.row} primary={element.address} />
            <ListItemText key={2} className={classes.row} primary={element.city.name} />
            <ListItemText key={3} className={classes.row} primary={element.city.country} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const UserPage = ({ user, userCards, userAddresses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div style={{ marginTop: "72px" }}>
      <Head>
        <title>{user.name}</title>
      </Head>

      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={3}>
            <SimpleCard
              title={`${user.name} ${user.lastName}`}
              body={
                <>
                  <Typography color="textSecondary">{user.email}</Typography>
                  <Typography color="textSecondary">{user.birthdate}</Typography>
                </>
              }
              media={user.avatar}
            />
          </Grid>
          <Grid xs={12} item>
            <RenderCards cards={userCards} />
          </Grid>
          <Grid xs={12} item>
            <RenderAddresses addresses={userAddresses} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserPage;
