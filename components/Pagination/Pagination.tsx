import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";


type PaginationProps = {
  count: number,
  page: number,
  limit: number,
  handleLimitChange: (e: SelectChangeEvent) => void,
  handlePageChange: (e: React.ChangeEvent<any>, page: number) => void,
}

export default function CustomPagination(props: PaginationProps) {
  const { count, page, limit, handleLimitChange, handlePageChange } = props;

  return (
    <div css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 768px;
        margin: 1.25rem auto;
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
        count={Math.ceil(count / limit)}
        page={page}
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