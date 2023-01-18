import s from "./style.module.css";
import { SMALL_IMG_COVER_BASE_URL } from "../../config";
const MAX_TITLE_CHAR = 30;
export function TVShowListItem({ tvShow, onClick }) {
    const onClick_ = () => {
        onClick(tvShow);
    }

  return (
    <div onClick={onClick_} className={s.container}>
      <img
        className={s.image}
        src={SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}
        alt={tvShow.name}
      />
      <div className={s.title}>
        {tvShow.name.length > MAX_TITLE_CHAR
          ? tvShow.name.slice(0, MAX_TITLE_CHAR) + "..."
          : tvShow.name}
      </div>
    </div>
  );
}
