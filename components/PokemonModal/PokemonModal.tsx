import { css } from '@emotion/react'
import { Box, Button, Modal, Typography } from "@mui/material";
import { useGetData } from 'hooks';
import Image from 'next/image';
import Error from '../Error';
import { Shimmer } from '../Loading';

type PokemonModalProps = {
  open: boolean,
  url: string,
  handleClose: () => void,
}

interface Type {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

interface PokemonDetail {
  name: string,
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  },
  types: Array<Type>
}

export default function PokemonModal(props: PokemonModalProps) {
  const { open, url, handleClose } = props;
  const { data, loading, error, refetch } = useGetData<PokemonDetail>(url, {});
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        css={css`
          background-color: white;
          border-radius: .5rem;
          display: flex;
          flex-direction: column;
          margin: 5rem auto;
          width: 380px;
          max-width: 80%;
          padding: 1rem;
          @media (min-width: 768px) {
            flex-direction: row;
            width: 640px;
          }
        `}
      >
        {loading && (
          <>
            <Shimmer
              css={css`
                height: 250px;
                @media (min-width: 768px) {
                  width: 250px;
                }
              `}
            />
            <div css={css`flex: 1;`}>
              <Shimmer css={css`
                margin-top: .5rem;
                width: 100%;
                height: 3rem;
                @media (min-width: 768px) {
                  margin: 0;
                }
              `}/>
              <Shimmer css={css`
                margin-top: .5rem;
                width: 100%;
                height: 1.5rem;
                @media (min-width: 768px) {
                }
              `}/>
              <Shimmer css={css`
                margin-top: .5rem;
                width: 100%;
                height: 36.5px;
                @media (min-width: 768px) {
                }
              `}/>
            </div>
          </>)}
        {(!loading && error) && (
          <Error error={error} refetch={refetch}/>
        )}
        {(!loading && !error) && (
        // {false && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image src={data.sprites?.other["official-artwork"].front_default || ''} width="250" height="250" />
            </Box>
            <div>
              <div
                css={css`
                  font-size: 2rem;
                  line-height: 1.5;
                  font-weight: 700;
                  text-transform: uppercase;
                  margin-top: .5rem;
                `}>
                {data.name}
              </div>
              <div
                css={css`
                font-size: 1rem;
                line-height: 1.5;
                font-weight: 500;
                text-transform: uppercase;
                margin-top: .5rem;
              `}>
                Type: {data.types?.map((type, index) => {
                  if (index === (data.types.length - 1)) return (<span key={type.type.name}>{type.type.name}</span>)
                  return (<span key={type.type.name}>{type.type.name}, </span>)
                })}
              </div>
              <Button variant="contained" sx={{ marginTop: '.5rem' }}>More Details</Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  )
}