export interface SearchbarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
}

export interface MoviesListProps {
  searchQuery: string;
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PaginationProps {
  handlePageClick: (currentPage: number) => void;
  totalPages: number;
  currentPage: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: { name: string; id: number }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FavoritesListProps {
  savedFavorites: MovieProps[] | null;
}
