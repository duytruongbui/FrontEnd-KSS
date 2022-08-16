import React from 'react';
import { useRouter } from 'next/router';
import Content18 from './views/18';

export default function () {
  const router = useRouter();
  return (
    <>
      {(
        <Content18 Mantra={router.query.Mantra} />
      )}
    </>
  );
}
