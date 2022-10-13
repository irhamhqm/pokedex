
type ErrorProps = {
  refetch: () => void,
  error: any
}

export default function Error(props: ErrorProps) {
  const { error, refetch } = props;
  return (
    <div>
      <div>{error.message || 'Error'}</div>
      <button onClick={refetch}>Retry</button>
    </div>
  )
}