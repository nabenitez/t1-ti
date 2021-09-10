import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getCityById } from "../../services/cities";
import { getUsersByIds, User } from "../../services/users";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import SimpleCard from "../../components/SimpleCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (id && typeof id === "string") {
    const city = await getCityById(id);
    const users = await getUsersByIds(city.users);
    return {
      props: { city, users },
    };
  }
  return { props: {} };
};

const renderUsers = (users: User[]) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Typography variant="h6" component="h2">
        Users
      </Typography>
      {users.map((user: User, index: number) => (
        <Grid item xs={3} key={index}>
          <Link href={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

const City = ({ city, users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div style={{ marginTop: "72px" }}>
      <Head>
        <title>UsersCards</title>
      </Head>

      <Container>
        <SimpleCard title={city.name} subTitle={city.country} body={renderUsers(users)} />
      </Container>
    </div>
  );
};

export default City;
