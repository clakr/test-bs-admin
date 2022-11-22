import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Page.module.scss';
import PageNav from './PageNav';
import PageMain from './PageMain';
import PageFooter from './PageFooter';

function Page() {
  return (
    <div className={styles.page}>
      <PageNav />
      <PageMain>
        <Outlet />
      </PageMain>
      <PageFooter />
    </div>
  );
}

export default Page;
