import { useState, useEffect } from "react";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getCities, findCities, City } from "../../services/cities";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../components/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

export const getServerSideProps = async () => {
  const { cities, totalCount } = await getCities(1);
  return {
    props: { cities, totalCount },
  };
};

const Cities = ({ cities, totalCount }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [citiesData, setCitiesData] = useState(cities);
  const [fetchingCities, setFetchingCities] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      if (searchTerm) {
        setFetchingCities(true);
        findCities(searchTerm).then(({ cities }) => {
          setCitiesData(cities);
          setFetchingCities(false);
        });
      } else {
        setCitiesData(cities);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, cities]);

  return (
    <Container style={{ marginTop: "72px" }}>
      <Head>
        <title>Cities</title>
      </Head>
      <Grid style={{ minHeight: "80vh" }} direction="column" container justifyContent="space-between" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <TextField onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "60%", margin: "0 auto" }} id="standard-search" variant="filled" label="Search city" type="search" />
          </Grid>
          {fetchingCities && (
            <Grid item xs={12} style={{ display: "flex" }}>
              <CircularProgress style={{ margin: "20% auto" }} />
            </Grid>
          )}
          {!fetchingCities &&
            citiesData.map((city: City, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
        {!searchTerm && (
          <Grid item xs={12} style={{ display: "flex" }}>
            <Pagination
              style={{ margin: "0 auto" }}
              count={Math.ceil(totalCount / 10)}
              onChange={async (e, page) => {
                setFetchingCities(true);
                const result = await getCities(page);
                setCitiesData(result.cities);
                setFetchingCities(false);
              }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Cities;
