import Content112 from './views/11_2';
import React from 'react';
import { useRouter } from 'next/router';

export default function () {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <Content112 Mantra={router.query.Mantra} />
    </>
  );
}
