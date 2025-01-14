import axios from 'axios';
import { getDate } from '../helpers/helper_methods';

export const postScore = async (time: number) => {
    try {
        const response = await axios.post('http://localhost:8000/scores', {
            time: time,
            name: 'TST',
            date: getDate(),
        });
        console.log('Score posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting score:', error);
    }
};

export default postScore;