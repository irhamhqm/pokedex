
import { css } from "@emotion/react";

import { Pokemon } from "../Pokedex/Pokedex";

type PokemonCardProps = {
  pokemon: Pokemon,
  handleClick: (url: string) => void,
}


export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon, handleClick } = props;

  return (
    <div 
      onClick={() => handleClick(pokemon.url)}
      css={css`
        background-color: white;
        border-radius: 25px;
        padding: 1.75rem 1.25rem 1.25rem 1.25rem;
        width: 15rem;
        height: 22.5rem;
        justify-self: center;
    `}>
      <div
        css={css`
          background-color: #717070;
          height: 15rem;
        `}
      >
        {/* placeholder image */}
      </div>
      <div
        css={css`
          color: #646464;
          font-weight: 700;
          font-size: 1.5rem;
          text-transform: uppercase;
          line-height: 1.5;
          margin-top: .5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          height: 4.5rem;
          overflow: hidden;
        `}
      >
        {pokemon.name}
      </div>
    </div>
  )
}