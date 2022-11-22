import React from 'react';
import PropTypes from 'prop-types';
import './PageMain.module.scss';

function PageMain(props) {
  const { children } = props;

  return <main role="main">{children}</main>;
}

PageMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageMain;
