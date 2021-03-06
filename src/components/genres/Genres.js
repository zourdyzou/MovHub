import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

export const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  // warn => filtering functionalities
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]); //* selectedGenres: takes everything inside it => default: empty, genre: target value of genre
    setGenres(genres.filter((g) => g.id !== genre.id)); //* every genre id !== to genres id inside genres array => return
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id) //* filtering selectedGenres array
    );
    setGenres([...genres, genre]); //* set back genres where the ID does not equal to selectedGenres Array ID
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=87f8919a00a8373494ab40b5ff6f64ca&language=en-US&include-adult=true`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};
