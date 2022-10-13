import config from "config";
import { useGetData } from "hooks"
import { useRouter } from "next/router";

interface PokemonDetails {
  name: string
}

export default function PokemonDetails() {
  const router = useRouter();
  const { id = '' } = router.query;
  const { data, loading, error, refetch } = useGetData<PokemonDetails>(`${config.baseUrl}/pokemon/${id}`, {});

  return (
    <div>
      {data.name}
    </div>
  )
};