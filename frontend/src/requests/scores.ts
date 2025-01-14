import axios from 'axios';

export const postScore = async (time: number) => {
    try {
        const response = await axios.post('http://localhost:8000/scores', {
            time: time,
            name: 'TST',
            date: "14/01/2025"
        });
        console.log('Score posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting score:', error);
    }
};

export default postScore;