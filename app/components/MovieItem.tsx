import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Gener from './Gener';
import { DefaultSession } from 'next-auth';
import '../css/Movies.css'; // Import your custom CSS file
import { useRouter } from 'next/navigation';
import addSubscription from '@/lib/addSubscription';
import { useState } from 'react';

type movieProps = {
  movie: Movie;
  user: ({ id: string; role: string } & DefaultSession) | undefined;
  isSubscribed: boolean;
};

function Movie({ movie, user, isSubscribed }: movieProps) {
  const [add, setAdd] = useState(isSubscribed);
  const router = useRouter();
  function addMovieHandle() {
    if (!user) {
      router.push('/login');
    } else {
      addSubscription(user.id, movie._id + '', isSubscribed);
      setAdd((prev) => !prev);
    }
  }
  return (
    <Card className="flex justify-center flex-wrap" style={{ width: '14rem' }}>
      <div className="aspect-w-16 aspect-h-9">
        <Card.Img variant="top" src={movie.image?.medium} className="object-cover" />
      </div>
      <Card.Body>
        <div className="flex flex-col mt-3 items-baseline">
          <span className="text-sm underline">Movie Name:</span>
          <span className="text-slate-800 font-bold text-xl">{movie.name}</span>
        </div>

        <div className="flex flex-col items-baseline underline text-sm gap-2">
          Genres:
          <div className="flex flex-wrap gap-2">
            {movie?.genres?.map((gener, index) => (
              <Gener gener={gener} key={index} />
            ))}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button onClick={addMovieHandle} className={'w-[5rem] text-xl defaultButton hover:hoveredButton'} variant="primary">
          {add ? '-' : '+'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Movie;
