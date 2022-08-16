import React from 'react';
import { useRouter } from 'next/router';
import ResetPass from './views/12_2';
export default function () {
  const router = useRouter();
  return <ResetPass Mantra={router.query.Mantra} />;
}
