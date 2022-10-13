import { Pokemon } from "../Pokedex/Pokedex";

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;

  return (
    <div>
      {pokemon.name}
    </div>
  )
}