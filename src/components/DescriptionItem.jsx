import { number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Col } from 'reactstrap';

function DescriptionItem({ term, details }) {
  return (
    <>
      <Col sm={5} tag="dt">
        {`${term}: `}
      </Col>
      <Col sm={7} tag="dd" className="mb-0">
        {details}
      </Col>
    </>
  );
}

DescriptionItem.defaultProps = {
  term: '',
  details: '',
};

DescriptionItem.propTypes = {
  term: string,
  details: oneOfType([string, number]),
};

export default DescriptionItem;
