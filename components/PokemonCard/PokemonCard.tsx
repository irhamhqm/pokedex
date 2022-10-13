
import { css } from "@emotion/react";

import { Pokemon } from "../Pokedex/Pokedex";

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;

  return (
    <div 
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
        `}
      >
        {pokemon.name}
      </div>
    </div>
  )
}