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
