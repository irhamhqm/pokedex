
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
        border-radius: 12px;
        padding: 0.75rem;
        width: 15rem;
        height: 22.5rem;
    `}>
      <div >
        {/* placeholder image */}
      </div>
      {pokemon.name}
    </div>
  )
}