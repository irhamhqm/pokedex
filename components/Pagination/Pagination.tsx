import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { useState } from "react";


type PaginationProps = {
  count: number,
  limit: number,
  handleLimitChange: () => void,
  handlePageChange: () => void,
}

export default function CustomPagination(props: PaginationProps) {
  const { count, limit, handleLimitChange, handlePageChange } = props;

  return (
    <div css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}>
      <FormControl>
        <InputLabel id="page-select-label">Per Page</InputLabel>
        <Select
          autoWidth
          labelId="page-select-label"
          id="page-select"
          defaultValue="9"
          label="9"
          onChange={handleLimitChange}
        >
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={27}>27</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        count={Math.round(count / limit)}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
      <div>
        Total Data: {count}
      </div>
    </div>
  )
}