import * as React from "react";
import Layout from "../components/Layout.tsx";
import {Heading, TextInput, Box, Text, Form, FormField} from "grommet";
import firebase from "../lib/firebase";
import Router from "next/router";

function Home() {
  const [search, setSearch] = React.useState("");

  function handleSubmit() {
    const formattedSearch = search.trim().toLowerCase();
    if (search) {
      Router.push('/searchResults?query='+formattedSearch);
    }
  }

  return (
    <Layout showHeader={false}>
        <Heading
          level={1}
          size="xlarge"
          style={{
            fontFamily: "Pacifico",
            textShadow: "-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff"
          }}
          alignSelf="center"
        >
          beautifind
        </Heading>
        <Box
          width="large"
          pad="small"
          round="small"
          elevation="small"
          background={{color: "white", opacity: "strong"}}
        >
          <Box direction="row" wrap={true}>
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
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        handleSubmit();
                      }
                    }}
                  />
              </Box>
          </Box>
        </Box>
    </Layout>
  );
}

export default Home
