import { Pagination } from "@mui/material";

import config from "config";
import { useGetPaginatedResources } from "hooks";
import Loading from "../Loading";
import Error from '../Error';
import PokemonCard from "../PokemonCard";

export type Pokemon = {
  name: string,
  url: string
}

export default function Pokedex() {
  const { data, loading, error, refetch, fetchMore } = useGetPaginatedResources<Pokemon>(`${config.baseUrl}/pokemon`, 9, 9);

  const handlePageChange = (e: React.ChangeEvent<any>, page: number) => {
    fetchMore(`${config.baseUrl}/pokemon`, page * 9, 9);
  }

  return (
    <>
      {loading && (<Loading />)}
      {!loading && error && (<Error refetch={refetch} error={error} />)}
      {(!loading && !error) && data.results.map((value) => (
        <PokemonCard key={value.name} pokemon={value} />
      ))}
      <Pagination
        count={Math.floor(data.count / 9)}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </>
  )
}