import { css, keyframes } from '@emotion/react';

type ShimmerProps = {
  className?: string
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export function Shimmer(props: ShimmerProps) {
  const { className } = props;
  return (
    <div
      css={css`
        animation : ${shimmer} 2s infinite;
        background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
        background-size: 1000px 100%;
      `}
      className={className} />
  )
}

export function Loading() {
  return (
    <div>
      Loading...
    </div>
  )
}