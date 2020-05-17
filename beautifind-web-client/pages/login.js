import * as React from "react";
import {Form, Box, Button, TextInput, FormField} from "grommet";
import Layout from "../components/Layout";
import firebase from "../lib/firebase";
import Router from 'next/router'

function Login() {

  function handleSubmit({email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(() => {
      Router.push('/admin')
    });
  }

  return (
    <Layout>
        <Form onSubmit={(event) => handleSubmit(event.value)}>
          <FormField name="email" label="Email" required>
            <TextInput name="email" />
          </FormField>
          <FormField name="password" label="Password" required>
            <TextInput name="password" type="password" />
          </FormField>

          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
    </Layout>
  )

}

export default Login;