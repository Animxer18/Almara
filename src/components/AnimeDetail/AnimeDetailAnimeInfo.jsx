/* eslint-disable no-unused-vars */
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
} from "@suid/material";
import { For, splitProps } from "solid-js";
import { camelToUpperLowerCase, pascalCase } from "../../helpers";

const AnimeDetailAnimeInfo = (props) => {
  const [local] = splitProps(props, ["datas"]);

  const dataDetail = () => {
    const { id, title, url, image, episodes, ...usedProps } = local.datas;
    const dataMapped = Object.keys(usedProps)
      ?.sort()
      .map((dataProps) => {
        if (Array.isArray(usedProps?.[dataProps])) {
          return (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{camelToUpperLowerCase(dataProps)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <For each={usedProps?.[dataProps]} fallback={<></>}>
                    {(data) => {
                      return <Chip color={"primary"} label={data} />;
                    }}
                  </For>
                </Stack>
              </TableCell>
            </TableRow>
          );
        }
        return (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              {pascalCase(camelToUpperLowerCase(dataProps))}
            </TableCell>
            <TableCell>{usedProps?.[dataProps]}</TableCell>
          </TableRow>
        );
      });
    return dataMapped;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>{dataDetail()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AnimeDetailAnimeInfo;
