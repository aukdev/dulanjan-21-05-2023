import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "brand", label: "Brand", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "right",
  },
  {
    id: "stock",
    label: "Stock",
    minWidth: 170,
    align: "right",
  },
];

const createData = (brand, category, price, title, stock) => {
  return { brand, category, price, title, stock };
};

const App = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((fetchdata) => {
        if (Array.isArray(fetchdata.products)) {
          // console.log(fetchdata.products);
          const tempArr = [];
          fetchdata.products.forEach((product) => {
            tempArr.push(
              createData(
                product.brand,
                product.category,
                product.price,
                product.title,
                product.stock
              )
            );
          });
          setData(tempArr);
        }
      });
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState({});

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1>{selected.title}</h1>
          </div>
        </Box>
      </Modal>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        onClick={() => {
                          setSelected(row);
                          handleOpen();
                        }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.stock}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default App;
