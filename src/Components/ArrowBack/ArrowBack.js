import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArrowBack = () => {
    const navigate = useNavigate();
    return (
        <ArrowBackIcon onClick={() => navigate(-1)} />
    );
};

export default ArrowBack;
