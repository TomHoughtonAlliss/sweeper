import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getDate } from '../helpers/helper_methods';

interface PostScoreData {
  time: number;
  name: string;
}

const postScore = async (scoreData: PostScoreData) => {
  const response = await axios.post('http://localhost:8000/scores', {
    ...scoreData,
    date: getDate()
  });
  return response.data;
};

export default function usePostScoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
  });
}