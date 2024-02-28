import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMovies, IMG_URL, searchURL } from "@/pages/api/api";

const Search: React.FC = () => {
  const router = useRouter();
  const { query }: any = router;
  const [currentPage, setCurrentPage] = useState<number>(
    query.page ? parseInt(query.page) : 1
  );
  const id = query.id;
  const [movies, setMovies] = useState<any>("");

  // Pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/search/${id}?&page=${page}`);
  };

  // Get All The Genres Method
  const handleSearch = async (page: number) => {
    const data = await getMovies(`${searchURL}&query=${id}&page=${page || 1}`);
    setMovies(data);
  };

  // Get Pages From URL
  useEffect(() => {
    if (query.page) {
      setCurrentPage(parseInt(query.page));
    } else {
      setCurrentPage(1);
    }
    handleSearch(parseInt(query.page));
  }, [query.page, id]);

  return (
    <>
      <div className="flex justify-center text-sm ">
        <div
          id="main"
          className="grid grid-cols-5 justify-center  w-[1000px] gap-3 m-4"
        >
          {movies?.results?.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="movie ">
              <div className=" relative flex text-center justify-center cursor-pointer border rounded-sm border-gray-400  hover:border-green-400 ">
                <img
                  src={`${IMG_URL + movie.poster_path}`}
                  alt={movie.title}
                  className=" "
                />
                <div className="absolute w-full h-full flex font-bold items-center justify-center opacity-0 bg-slate-950/[.0] transition hover:bg-slate-950/70 hover:opacity-100  ">
                  <h3 className="">{movie.title}</h3>
                </div>
              </div>

              <div className="movie-info ">
                {/* {<span className="vote">{movie.vote_average.toFixed(1)}</span>} */}
              </div>

              {/*  <div className="overview h-6 overflow-hidden">
                {movie.overview}
              </div> */}
            </Link>
          ))}
        </div>
      </div>
      {movies && movies.total_pages > 1 && (
        <div className="flex justify-center gap-3 mb-3">
          {currentPage == 1 ? (
            <div
              className={`flex justify-center items-center  w-11 text-gray-600 mr-5 `}
            >
              <button disabled>Previous</button>
            </div>
          ) : (
            <div
              className={`flex justify-center items-center  w-11 mr-5 hover:text-green-400 `}
            >
              <button onClick={() => goToPage(currentPage - 1)}>
                Previous
              </button>
            </div>
          )}
          {currentPage > 2 && (
            <div className="flex justify-center items-center hover:text-green-400 ">
              <button onClick={() => goToPage(1)}>1</button>
            </div>
          )}
          {currentPage > 3 && (
            <div className="flex justify-center items-center  ">
              <span>...</span>
            </div>
          )}
          {currentPage - 1 != 0 && (
            <div className="flex justify-center items-center hover:text-green-400 ">
              <button onClick={() => goToPage(currentPage - 1)}>
                {" "}
                {currentPage - 1}{" "}
              </button>
            </div>
          )}

          <div className="flex justify-center items-center  ">
            <span className="text-green-400"> {currentPage} </span>
          </div>
          {currentPage + 1 < movies.total_pages && currentPage + 1 < 500 && (
            <div className="flex justify-center items-center hover:text-green-400 ">
              <button onClick={() => goToPage(currentPage + 1)}>
                {currentPage + 1}
              </button>
            </div>
          )}
          {movies.total_pages >= 2 &&
            currentPage + 1 < movies.total_pages &&
            currentPage + 1 < 500 &&
            movies.total_pages > 4 && (
              <div className="flex justify-center items-center  ">
                <span>...</span>
              </div>
            )}
          {movies.total_pages > 2 &&
            currentPage < 500 &&
            movies.total_pages != currentPage && (
              <div className="flex justify-center items-center min-w-4 hover:text-green-400 ">
                <button
                  onClick={() =>
                    goToPage(
                      movies.total_pages > 500 ? 500 : movies.total_pages
                    )
                  }
                >
                  {" "}
                  {movies.total_pages > 500 ? 500 : movies.total_pages}{" "}
                </button>
              </div>
            )}
          {currentPage == movies.total_pages || currentPage == 500 ? (
            <div
              className={`flex justify-center items-center  w-11 text-gray-600 `}
            >
              <button disabled>Next</button>
            </div>
          ) : (
            <div
              className={`flex justify-center items-center hover:text-green-400 w-11 `}
            >
              <button onClick={() => goToPage(currentPage + 1)}>Next</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;

// Might wanna try Splide to make carousels