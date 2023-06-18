import { For, splitProps, mergeProps } from "solid-js";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@suid/material";
import Chip from "@suid/material/Chip";
import { useBreakpoint } from "../../hooks";

const ChipGenre = (props) => {
  const { xs } = useBreakpoint();
  const defaultProps = mergeProps(
    { dataGenres: [], isSelectedGenres: false },
    props
  );
  const [local] = splitProps(defaultProps, [
    "dataGenres",
    "onSelectGenre",
    "onDelete",
    "isSelectedGenres",
  ]);

  return (
    <TableContainer
      sx={{ marginBottom: xs() && local?.isSelectedGenres ? "30px" : "20px" }}
    >
      <Table
        sx={{
          minWidth: "650px",
          ...(xs() &&
            local?.isSelectedGenres && {
              padding: "50px 0",
            }),
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <Grid container spacing={1} columns={2}>
                <For each={local?.dataGenres} fallback={<>No Data</>}>
                  {(data) => {
                    return (
                      <Grid item>
                        <Chip
                          clickable
                          label={data}
                          variant={
                            local?.isSelectedGenres ? "filled" : "outlined"
                          }
                          color="primary"
                          {...(local?.onDelete && {
                            onDelete: () => {
                              if (local?.onDelete) {
                                local?.onDelete(data);
                              }
                            },
                          })}
                          onClick={(e) => {
                            if (local?.onSelectGenre) {
                              local?.onSelectGenre(e?.target?.innerText);
                            }
                          }}
                        />
                      </Grid>
                    );
                  }}
                </For>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChipGenre;
