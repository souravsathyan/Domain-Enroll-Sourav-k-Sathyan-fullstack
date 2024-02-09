import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import {useState } from "react";
import useProductList from "../Utils/Hooks/useProductList";

const Products = () => {
  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  useProductList(page,rowperpage,rowchange)
 

  const columns = [
    { id: "image", name: "Image" },
    { id: "name", name: "Name" },
    { id: "category", name: "Category" },
    { id: "price", name: "Price" },
    { id: "gender", name: "Gender" },
    { id: "actions", name: "Actions" },
  ];

  const handlechangepage = (event, newpage) => {
    if (newpage < page) {
      pagechange(newpage - 1);
    } else if (newpage == 0) {
      pagechange(0);
    } else {
      pagechange(newpage + 1);
    }
    rowchange(newpage + 1);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  function handleEdit(row) {
    console.log("Edit", row);
    // Your edit logic here
  }

  function handleDelete(row) {
    console.log("Delete", row);
    // Your delete logic here
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Products List</h1>

      <Paper sx={{ width: "90%", marginLeft: "5%" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={column.id}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.products &&
                rows.products.map((row) => {
                  return (
                    <TableRow key={row._id}>
                      {columns.map((column) =>
                        column.id !== "image" ? (
                          <TableCell key={column.id}>
                            {column.id === "actions" ? (
                              <div >
                                <Button
                                sx={{mr:2}}
                                  variant="contained"
                                  color="info"
                                  onClick={() => handleEdit(row)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(row)}
                                >
                                  Delete
                                </Button>
                              </div>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id}>
                            <img
                              src={row[column.id]}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={rows.totalProducts}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default Products;
