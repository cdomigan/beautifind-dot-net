import * as React from "react";
import Layout from "../components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button, FormField, Form} from "grommet";
import firebase from "../lib/firebase";
import Link from "next/link";
import Router from "next/router";

function SearchResults() {
  function handleSubmit({name, address}) {
    firebase.firestore().collection("businesses").add({
      name: name,
      address: address
    })
      .then(function() {
        Router.back();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <Layout>
        <Box width="full" pad="medium" background={{color: "white"}}>
          <Heading level={3}>Add Business</Heading>
          <Box>
            <Form onSubmit={(event) => handleSubmit(event.value)}>
              <FormField name="name" label="Name" required>
                <TextInput name="name" />
              </FormField>
              <FormField name="address" label="Address" required>
                <TextInput name="address" />
              </FormField>
              <Box direction="row" gap="medium">
                <Button type="submit" primary label="Submit" />
                <Button type="reset" label="Reset" />
              </Box>
            </Form>
          </Box>
        </Box>
    </Layout>
  );
}

export default SearchResults;
