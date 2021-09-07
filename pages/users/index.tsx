import { useState } from "react";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getUsers, User } from "../../services/users";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../components/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export const getServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);
  return {
    props: { users, totalCount },
  };
};

const Users = ({ users, totalCount }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [usersData, setUsersData] = useState(users);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const router = useRouter();

  return (
    <Container style={{ marginTop: "72px" }}>
      <Head>
        <title>Cities</title>
      </Head>
      <Grid style={{ minHeight: "80vh" }} direction="column" container justifyContent="space-between" spacing={3}>
        {fetchingUsers ? (
          <Grid item style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "20% auto" }} />
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {usersData.map((user: User, index: number) => (
              <Grid item xs={3} key={index}>
                <SimpleCard
                  title={`${user.name} ${user.lastName}`}
                  body={<Typography color="textSecondary">{user.email}</Typography>}
                  media={user.avatar}
                  cb={() => {
                    router.push(`/users/${user.id}`);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Grid item xs={12} style={{ display: "flex" }}>
          <Pagination
            style={{ margin: "0 auto" }}
            count={Math.ceil(totalCount / 10)}
            onChange={async (e, page) => {
              setFetchingUsers(true);
              const result = await getUsers(page);
              setUsersData(result.users);
              setFetchingUsers(false);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
