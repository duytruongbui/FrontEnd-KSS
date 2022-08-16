import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EmailView from './views/12';

export default function({ Mantra }) {
    const router = useRouter();
    return (
        <EmailView Mantra={router.query.Mantra} />
    )
    
}