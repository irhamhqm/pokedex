
import { css } from "@emotion/react";

import config from "config";
import { useGetPaginatedData } from "hooks";
import Loading from "../Loading";
import Error from '../Error';
import PokemonCard from "../PokemonCard";

import Pagination from "../Pagination";
import { SyntheticEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

export type Pokemon = {
  name: string,
  url: string
}

export default function Pokedex() {
  const [ offset, setOffset ] = useState(0);
  const [ limit, setLimit ] = useState(9);
  const { data, loading, error, refetch, fetchMore } = useGetPaginatedData<Pokemon>(`${config.baseUrl}/pokemon`, 0, 9);

  useEffect(() => {
    fetchMore(`${config.baseUrl}/pokemon`, offset, limit);
  }, [ offset, limit ])

  const handleLimitChange = (e: SelectChangeEvent) => {
    setLimit(parseInt(e.target.value, 10));
  }

  const handlePageChange = (e: React.ChangeEvent<any>, page: number) => {
    setOffset((page - 1) * limit);
  }

  return (
    <>
      <div 
        css={css`
          background-color: #FFB300;
          display: flex;
          flex-direction: column;
        `
      }
      >
      <div
        css={css`
          display: inline-grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          justify-items: center;
          justify-content: center;
          column-gap: 1.5rem;
          row-gap: 2rem;
          margin: 0 auto;
        `}
      >
        {loading && (<Loading />)}
        {!loading && error && (<Error refetch={refetch} error={error} />)}
        {(!loading && !error) && data.results.map((value) => (
          <PokemonCard key={value.name} pokemon={value} />
        ))}
      </div>
          <Pagination
            count={data.count}
            limit={limit}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 2rem;
            `}
          />
      </div>
    </>
  )
}