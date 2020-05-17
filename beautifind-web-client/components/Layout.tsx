import * as React from "react";
import {Grommet, Main, grommet, Box, Heading} from 'grommet';
import Head from "next/head";
import Link from "next/link";

Layout.defaultProps = {
  showHeader: true
};

function Layout(props) {
  return (
    <>
      <Head>
        <title>beautifind</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Pacifico" />
      </Head>
      <Grommet theme={grommet}>
        <Main height="full" width="full" align="center" background={{image: "url(/damask.jpg)", repeat: "repeat", size: "contain"}}>
          <Box width="large">
            {props.showHeader && (
              <Box margin="small">
                <Link href="/">
                  <Heading
                    level={1}
                    size="medium"
                    style={{
                      fontFamily: "Pacifico",
                      textShadow: "-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff",
                      cursor: "pointer"
                    }}
                  >
                    beautifind
                  </Heading>
                </Link>
              </Box>
            )}
            {props.children}
          </Box>
        </Main>
      </Grommet>
      <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div,
      div#__next > div > div {
        height: 100%;
      }
      body {
        margin: 0px;
      }
    `}</style>
    </>
  );
}

export default Layout;