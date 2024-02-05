import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, deleteProduct } from "../redux/apiCall/productCall";
import { Link } from "react-router-dom";
import { productActions } from "../redux/slice/productSlice";
import swal from "sweetalert";

export default function ProductAdmin() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id)).then(() => {
          dispatch(getAllProduct());
        });
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Product Name", width: 110 },
    { field: "description", headerName: "Product Description", width: 150 },
    { field: "price", headerName: "Price", width: 110 },
    {
      field: "image",
      headerName: "image",
      width: 110,
      renderCell: (params) => (
        <div>
          <img alt="product" src={params.row.image} width={100} height={100} />
        </div>
      ),
    },

    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/editproduct/`}
            state={{
              productId: params.row.id,
              productTitle: params.row.title,
              productDescription: params.row.description,
              productPrice: params.row.price,
            }}
          >
            {" "}
            <button
              className="btn btn-primary btn-sm"
              style={{ marginRight: "25px", borderRadius: "5px" }}
            >
              Edit
            </button>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            style={{ borderRadius: "5px" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Map the products array to include an 'id' property for each row

  const rows = products.map((product) => ({
    ...product,
    id: product._id, // Set the id to a unique value, e.g., the product's _id
  }));

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Link to={"/admin/product"}>
          {" "}
          <button type="submit">Add New Product</button>
        </Link>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
}
