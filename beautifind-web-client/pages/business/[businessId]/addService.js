import * as React from "react";
import Layout from "~/components/Layout.tsx";
import {Heading, TextInput, Box, Text, DataTable, Button, FormField, Form} from "grommet";
import firebase from "~/lib/firebase";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from 'next/router';
import TagInput from "~/components/TagInput";

const keywordSuggestions = [
  "manicure",
  "pedicure",
  "facial",
  "waxing",
  "massage",
  "gel",
  "removal",
  "acrylic",
  "backfill",
  "nails",
  "back",
  "neck",
  "shoulders",
  "lip",
  "eyebrow",
  "tint"
]

function SearchResults() {
  const router = useRouter();
  const businessId = router.query.businessId;
  const [selectedKeywords, setSelectedKeywords] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState(keywordSuggestions);

  const onRemoveTag = tag => {
    const removeIndex = selectedKeywords.indexOf(tag);
    const newTags = [...selectedKeywords];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedKeywords(newTags);
  };

  const onAddTag = tag => setSelectedKeywords([...selectedKeywords, tag]);

  const onFilterSuggestion = value =>
    setSuggestions(
      keywordSuggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );

  function handleSubmit({name, description, durationMins, price}) {
    firebase.firestore().collection("businesses/"+businessId+"/services").add({
      name: name,
      description: description || "",
      durationMins: durationMins || null,
      price: price,
      keywords: selectedKeywords
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
          <Heading level={3}>Add Service</Heading>
          <Box>
            <Form onSubmit={(event) => handleSubmit(event.value)}>
              <FormField name="name" label="Name" required>
                <TextInput name="name" />
              </FormField>
              <FormField name="description" label="Description">
                <TextInput name="description" />
              </FormField>
              <FormField name="durationMins" label="Duration (mins)">
                <TextInput name="durationMins" />
              </FormField>
              <FormField name="price" label="Price">
                <TextInput name="price" />
              </FormField>
              <FormField name="keywords" label="Keywords">
                <TagInput
                  placeholder="Enter keywords..."
                  suggestions={suggestions}
                  value={selectedKeywords}
                  onRemove={onRemoveTag}
                  onAdd={onAddTag}
                  onChange={({ target: { value } }) => onFilterSuggestion(value)}
                />
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
