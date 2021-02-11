import React from 'react';
import PriceForm from '../components/PriceForm';
import { testItems } from '../testData';

const handleFormSubmit = () => { };
const handleCancelSubmit = () => { };

const Create = ({ match }) => {
  const props = {
    item: testItems[0],
    onFormSubmit: handleFormSubmit,
    onCancelSubmit: handleCancelSubmit,
  };

  return (
    <div>
      <h1>This is the create page. {match.params.id} </h1>
      <PriceForm {...props} />
    </div>
  );
};

export default Create;
