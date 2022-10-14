
import { css } from "@emotion/react";

import config from "config";
import { useGetPaginatedData } from "hooks";
import { Loading } from "../Loading";
import Error from '../Error';
import PokemonCard from "../PokemonCard";

import Pagination from "../Pagination";
import { SyntheticEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import PokemonModal from "../PokemonModal";

export type Pokemon = {
  name: string,
  url: string
}

export default function Pokedex() {
  const [ page, setPage] = useState(1);
  const [ offset, setOffset ] = useState(0);
  const [ limit, setLimit ] = useState(9);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedPokemonUrl, setSelectedPokemonUrl ] = useState('');
  const { data, loading, error, refetch, fetchMore } = useGetPaginatedData<Pokemon>(`${config.baseUrl}/pokemon`, 0, 9);

  useEffect(() => {
    fetchMore(`${config.baseUrl}/pokemon`, offset, limit);
  }, [ offset, limit ])

  const handleLimitChange = (e: SelectChangeEvent) => {
    const limitInt = parseInt(e.target.value);
    setPage(Math.floor((offset) / limitInt) + 1);
    // setOffset((Math.round((offset) / limitInt) - 1) * limitInt);
    setLimit(limitInt);
  }

  const handlePageChange = (e: React.ChangeEvent<any>, page: number) => {
    setPage(page);
    setOffset((page - 1) * limit);
  }

  const handleClick = (url: string) => {
    setSelectedPokemonUrl(url);
    setIsModalOpen(true);
  }

  return (
    <>
      <PokemonModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        url={selectedPokemonUrl} />
      <div 
        css={css`
          background-color: #FFB300;
          display: flex;
          flex-direction: column;
          padding-top: 2.5rem;
        `
      }
      >
        <header
          css={css`
            margin-bottom: 3rem;
            text-align: center;
          `}
        >
          <div
            css={css`
              font-weight: 700;
              font-size: 3rem;
              line-height: 1.5;
          `}>
            Pokedex
          </div>
          <div
            css={css`
              font-weight: 500;
              font-size: 1.75rem;
              line-height: 1.5;
            `}
          >
            All generations
          </div>
          <div
            css={css`
              font-weight: 500;
              font-size: 1.75rem;
              line-height: 1.5;
            `}
          >
            Totalling {data.count}
          </div>
        </header>
        <div
          css={css`
            display: inline-grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            justify-items: center;
            justify-content: center;
            column-gap: 1.5rem;
            row-gap: 2rem;
            margin: 0 auto;
            min-height: 1144px;
            @media (min-width: 768px) {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            @media (min-width: 1024px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          `}
        >
          {loading && (<Loading />)}
          {!loading && error && (<Error refetch={refetch} error={error} />)}
          {(!loading && !error) && data.results.map((value) => (
            <PokemonCard key={value.name} pokemon={value} handleClick={handleClick}/>
          ))}
        </div>
        <Pagination
          count={data.count}
          page={page}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  )
}