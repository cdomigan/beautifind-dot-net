import * as React from "react";
import Layout from "~/components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button} from "grommet";
import firebase from "~/lib/firebase";
import Link from "next/link";
import { useRouter } from 'next/router';
import Router from 'next/router';
import Api from "~/lib/api";

function Business() {
  const router = useRouter();
  const businessId = router.query.businessId;
  const [data, setData] = React.useState({});
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    if (businessId) {
      load();
    }
  }, [businessId]);

  function load() {
    Api.getBusiness(businessId).then(businessData => {
      setData(businessData);
    })
    Api.getServicesForBusiness(businessId).then(servicesData => {
      setServices(servicesData);
    });
  }

  function deleteService(serviceId) {
    Api.deleteService(businessId, serviceId).then(() => {
      load();
    })
  }

  return (
    <Layout>
      <Box width="full" pad="medium" background={{color: "white"}}>
        <Heading level={2}>{data && data.name}</Heading>
        <Box>
          <Heading level={3}>Services</Heading>
          <Button label="Add Service" onClick={() => Router.push('/business/'+businessId+"/addService")}/>
          <DataTable
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
                render: (data) => (
                  data.name
                )
              },
              {
                property: "description",
                header: <Text>Description</Text>
              },
              {
                property: "durationMins",
                header: <Text>Duration</Text>
              },
              {
                property: "price",
                header: <Text>Price</Text>,
                render: (data) => (
                  <Text>${data.price && parseFloat(data.price).toFixed(2)}</Text>
                )
              },
              {
                render: (data) => (
                  <Button icon="delete" onClick={() => deleteService(data.id)} />
                )
              }
            ]}
            data={services}
          />
        </Box>
      </Box>
    </Layout>
  );
}

export default Business;
