import { useNavigate, useParams } from 'react-router-dom';

export default function FromMagicLink() {

    const { scrumId } = useParams();

    const navigate = useNavigate();
    navigate('/joinscrum', { state: { scrumId } });

    return null
}