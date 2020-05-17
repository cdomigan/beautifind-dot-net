import * as React from "react";
import Layout from "../components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button} from "grommet";
import firebase from "../lib/firebase";
import Link from "next/link";

function SearchResults() {
  const [results, setResults] = React.useState([]);
  React.useEffect(() => {
    firebase.firestore().collection('businesses').get().then((querySnapshot)  => {
      const results = [];
      querySnapshot.forEach(function (doc) {
        const result = {};
        result.id = doc.id;
        result.name = doc.get("name");
        results.push(result);
      });
      setResults(results);
    });
  }, []);
  return (
    <Layout>
        <Box width="full" pad="medium" background={{color: "white"}}>
          <Heading level={3}>Businesses</Heading>
          <Link href="/addBusiness" passHref>
            <Button label="Add Business" />
          </Link>
          <Box>
            <DataTable
              columns={[
                {
                  property: 'name',
                  header: <Text>Name</Text>,
                  primary: true,
                  render: (data) => (
                    <Link href={"/business/"+data.id} passHref><a>{data.name}</a></Link>
                  )
                }
              ]}
              data={results}
            />
          </Box>
        </Box>
    </Layout>
  );
}

export default SearchResults;
