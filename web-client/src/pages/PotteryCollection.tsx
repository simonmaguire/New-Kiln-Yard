import {useQuery} from '@tanstack/react-query';
import { Link } from 'react-router';

interface IPot {
  id: number;
  clay: string;
  stage: string;
  category: string;
  throw_date: Date;
  clay_weight: number;
  thrown_height: number;
  thrown_width: number;
  thrown_notes: string;
  trim_date: Date;
  trim_notes: string;
  glazes: string[];
  glaze_notes: string;
  finished_width: number;
  finished_height: number;
  finished_notes: string;
}

export const PotteryCollectionPage = () => {
  const {isPending, isError, error, data, isLoading} = useQuery({
    queryKey: ['pots'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pots`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isPending || isLoading) return <span>Loading...</span>;

  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      {data.map((pot: IPot) => (
        <Link key={pot.id} to={`/pot/${pot.id}`}>
          {pot.id} {pot.category}
        </Link>
      ))}
    </div>
  );
};