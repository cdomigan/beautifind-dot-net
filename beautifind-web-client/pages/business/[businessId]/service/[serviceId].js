import * as React from "react";
import Layout from "~/components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button, Image} from "grommet";
import firebase from "~/lib/firebase";
import Link from "next/link";
import { useRouter } from 'next/router';
import Router from 'next/router';
import api from "~/lib/api";

function Service() {
  const router = useRouter();
  const businessId = router.query.businessId;
  const serviceId = router.query.serviceId;
  const [service, setService] = React.useState({});
  const [business, setBusiness] = React.useState({});

  React.useEffect(() => {
    if (serviceId && businessId) {
      api.getService(businessId, serviceId).then((serviceData) => {
        setService(serviceData);
      });
      api.getBusiness(businessId).then((businessData) => {
        setBusiness(businessData);
      });
    }
  }, [businessId, serviceId]);

  return (
    <Layout>
      {(service && business) && (
        <Box width="full" pad="medium" background={{color: "white"}} round="small" direction="row" gap="medium">
          <Box width="small" fit="contain">
            <Image src={business.imageUrl} />
            <Text>{business.name}</Text>
          </Box>
          <Box>
            <Heading level={2}>{service.name}</Heading>
            <Text>{service.description}</Text>
            <Text>{service.price}</Text>
            <Text>{service.durationMins}</Text>
            <Button label="Book this service" />
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export default Service;
