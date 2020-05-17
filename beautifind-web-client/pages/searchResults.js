import * as React from "react";
import Layout from "../components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button, Image} from "grommet";
import firebase from "../lib/firebase";
import Link from "next/link";
import {useRouter} from "next/router";
import {Clock} from "grommet-icons";

function SearchResults() {
  const router = useRouter();
  const {query} = router.query;
  const [searchValue, setSearchValue] = React.useState(query);
  const [results, setResults] = React.useState([]);
  const [businesses, setBusinesses] = React.useState({});

  function loadResults() {
    firebase.firestore().collectionGroup('services').where("keywords", "array-contains", query).get().then((querySnapshot)  => {
      const results = [];
      const businessIds = [];
      querySnapshot.forEach(function (doc) {
        const result = {};
        result.id = doc.id;
        result.businessId = doc.ref.parent.parent.id;
        result.name = doc.get("name");
        result.description = doc.get("description");
        result.price = doc.get("price");
        result.durationMins = doc.get("durationMins");
        results.push(result);
        businessIds.push(result.businessId);
      });
      setResults(results);
      loadBusinesses(businessIds);
    });
  }

  function loadBusinesses(businessIds) {
    firebase.firestore().collection("businesses").where(firebase.firestore.FieldPath.documentId(), "in", businessIds).get().then((querySnapshot) => {
      const businesses = {};
      querySnapshot.forEach(function (doc) {
        businesses[doc.id] = {
          name: doc.get("name"),
          imageUrl: doc.get("imageUrl")
        };
      });
      console.log(businesses);
      setBusinesses(businesses);
    });
  }

  React.useEffect(() => {
    if (query) {
      setSearchValue(query);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos);
        });
      } else {
        console.log("Geolocation not supported");
      }
      loadResults();
    }
  }, [query]);

  return (
    <Layout>
      <Box gap="small">
        <Box
          width="full"
          pad="small"
          round="small"
          elevation="small"
          background={{color: "white", opacity: "strong"}}
        >
          <Box direction="row" wrap="true">
            <Text
              alignSelf="center"
              weight="bold"
              margin="small"
            >
              find me a
            </Text>
            <Box
              background={{color: "white", opacity: "strong"}}
              round="small"
              flex="grow"
              width={{min: "medium"}}
            >
              <TextInput
                placeholder="manicure, pedicure, facial..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                //style={{border: "none"}}esr eses es333322gk≈®2
              />
            </Box>
          </Box>
        </Box>
        <Box width="full" pad="medium" background={{color: "white", opacity: "strong"}} round="small">
          <Heading level={3}>Results for <b>"{query}"</b> near you</Heading>
          <Box gap="small">
            {results.map((result) => {
              const business = businesses[result.businessId];
              if (business) {
                return (
                  <Link key={result.businessId} href={`/business/${result.businessId}/service/${result.id}`}>
                    <Box direction="row" pad="small" gap="small" background="white" round="small" elevation="small">
                      <Box width="xsmall" height="xsmall">
                        <Image src={business.imageUrl} fit="contain" />
                      </Box>
                      <Box pad={{ vertical: 'xsmall' }} width="medium">
                        <Text size="small">{business.name}</Text>
                        <Text weight="bold">{result.name}</Text>
                        <Text size="small"><i>{result.description}</i></Text>
                      </Box>
                      <Box width="xsmall">
                        <Box wrap={false} direction="row" align="center"><Clock size="small" />&nbsp;<Text size="small">{result.durationMins}min</Text></Box>
                        <Text weight="bold">${result.price}</Text>
                      </Box>
                    </Box>
                  </Link>
                )
              }
            })}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default SearchResults;
