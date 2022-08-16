import Content11 from './views/11';
import { useRouter } from 'next/router';
export default function() {
    const router = useRouter();
    return (
        <Content11 Mantra={router.query.Mantra} />
    )
}