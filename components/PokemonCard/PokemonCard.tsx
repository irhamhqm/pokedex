
import { css } from "@emotion/react";

import { Pokemon } from "../Pokedex/Pokedex";

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;

  return (
    <div>
      <div css={css`
        padding: 1rem;
      `}>
        {/* placeholder image */}
      </div>
      {pokemon.name}
    </div>
  )
}