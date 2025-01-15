import { useQuery } from 'react-query';
import axios from 'axios';

const fetchScores = async () => {
    const { data } = await axios.get('http://localhost:8000/scores');
    return data;
};

export const useScores = () => {
    return useQuery('scores', fetchScores);
};