import { useRouter } from 'next/router';
import Cn from 'classnames';

import { useAppDispatch } from '@/redux/hooks';
import { activeModalId, fetchMovieTrailer } from '@/redux/modalSlice';
import { imageOriginal, w500Image } from '@/ultis/constants';
import { MovieItemProps } from '@/model/movie';
import { Button, Rating } from '@/components';

interface Props {
  item: MovieItemProps;
  isActive: boolean;
}

const MainSliderItem = ({ item, isActive }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const background = imageOriginal(item.backdrop_path || item.poster_path);

  const handleWatchTrailer = () => {
    dispatch(activeModalId(item.id));
    dispatch(fetchMovieTrailer(item.id));
  };

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="
      relative py-36 bg-center bg-no-repeat bg-cover
      before:content-[''] before:absolute before:inset-0 before:bg-black/[60%]
      after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[100px] after:bg-gradient-to-t from-body to-black/[0]
      "
    >
      <div className="container relative flex-center-center">
        <div
          className={Cn(
            '[&>*~*]:mt-12 px-12 lg:w-full w-3/5 [&>*]:transition-[transform,opacity] [&>*]:duration-[500ms,500ms] [&>*]:ease-[ease,ease]',
            isActive
              ? 'scale-100 translate-y-0'
              : '[&>*]:opacity-0 [&>*]:translate-y-[-100px]'
          )}
        >
          <h2 className="leading-none font-bold text-[5rem] lg:text-[4rem] delay-[300ms,300ms]">
            {item.title}
          </h2>
          <Rating
            size={18}
            rating={item.vote_average}
            className="w-24 text-[1.5rem] delay-[300ms,300ms]"
          />

          <span className="block font-bold delay-[600ms,600ms]">
            {item.overview}
          </span>
          <div className="[&>*~*]:ml-4 delay-[900ms,900ms]">
            <Button onClick={() => router.push(`/movie/${item.id}`)}>
              Watch Now
            </Button>
            <Button outline onClick={handleWatchTrailer}>
              Watch trailer
            </Button>
          </div>
        </div>
        <div className="lg:hidden">
          <img
            className={Cn(
              'w-[400px] rounded-3xl transition-[transform] duration-700 ease-[ease] shadow-[0_7px_29px_0_rgba(0,0,0,0.3)]',
              isActive ? 'scale-100' : 'scale-0'
            )}
            src={w500Image(item.poster_path)}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MainSliderItem;
