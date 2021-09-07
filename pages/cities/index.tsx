import { useState } from "react";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getCities, City } from "../../services/cities";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../components/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";

export const getServerSideProps = async () => {
  const { cities, totalCount } = await getCities(1);
  return {
    props: { cities, totalCount },
  };
};

const Cities = ({ cities, totalCount }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [citiesData, setCitiesData] = useState(cities);
  const [fetchingCities, setFetchingCities] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  return (
    <Container style={{ marginTop: "72px" }}>
      <Head>
        <title>Cities</title>
      </Head>
      <Grid style={{ minHeight: "80vh" }} direction="column" container justifyContent="space-between" spacing={3}>
        {fetchingCities ? (
          <Grid item style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "20% auto" }} />
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {citiesData.map((city: City, index: number) => (
              <Grid item xs={4} key={index}>
                <SimpleCard
                  title={city.name}
                  subTitle={city.country}
                  cb={() => {
                    router.push(`/cities/${city.id}?name=${city.name}`);
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
              setFetchingCities(true);
              setCurrentPage(page);
              const result = await getCities(page);
              setCitiesData(result.cities);
              setFetchingCities(false);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cities;
