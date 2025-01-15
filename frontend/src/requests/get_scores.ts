import { useQuery } from 'react-query';
import axios from 'axios';

type Score = {
	id: string;
	name: string;
	time: number;
	date: string;
};

const fetchScores = async () => {
    const { data } = await axios.get('http://localhost:8000/scores');

    return data as Score[];
};

export const useScores = () => {
    return useQuery(['scores'], fetchScores);
};