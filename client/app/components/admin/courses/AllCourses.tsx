/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import { useDeleteCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";

type Props = {};

const AllCourses = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiFillEdit
                className="text-white text-center hover:underline mr-5"
                size={20}
              />
            </Link>
          </>
        );
      },
    },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="text-white text-center hover:underline mr-5"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.allCourses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }

  // const rows: any = [
  //   // {
  //   //   id: "1234",
  //   //   title: "React",
  //   //   purchased: "30",
  //   //   ratings: "5",
  //   //   created_at: "01/01/17",
  //   // },
  // ];

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course created successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px] h-screen bg-[#0D1421]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            width="90%"
            mx="auto"
            // sx={{
            //   "& .MuiDataGrid-root": {
            //     border: "none",
            //     outline: "none",
            //   },
            //   "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //   },
            //   "& .MuiDataGrid-sortIcon": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //   },
            //   "& .MuiDataGrid-row": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //     borderBottom:
            //       theme === "dark"
            //         ? "1px solid #ffffff30!important"
            //         : "1px solid #ccc!important",
            //   },
            //   "& .MuiTablePagination-root": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //   },
            //   "& .MuiDataGrid-cell": {
            //     borderBottom: "none",
            //   },
            //   "& .name-column--cell": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //   },
            //   "& .MuiDataGrid-columnHeaders": {
            //     backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            //     borderBottom: "none",
            //     color: theme === "dark" ? "#fff" : "#000",
            //   },
            //   "& .MuiDataGrid-virtualScroller": {
            //     backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            //   },
            //   "& .MuiDataGrid-footerContainer": {
            //     color: theme === "dark" ? "#fff" : "#000",
            //     borderTop: "none",
            //     backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            //   },
            //   "& .MuiCheckbox-root": {
            //     color:
            //       theme === "dark" ? "#b7ebde !important" : "#000 !important",
            //     borderTop: "none",
            //     backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            //   },
            //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            //     color: "#fff !important",
            //   },
            // }}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.05)" // very soft hover in dark
                      : "rgba(0,0,0,0.04)", // minimal hover in light
                },
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#e5e7eb" : "#f5f5f5",
                borderBottom: "none",
                color: "#000", // black headers always
                fontWeight: 600,
                fontSize: "14px",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#0F172A" : "#F9FAFB",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#111C43" : "#E5E7EB",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#45CBA0 !important" : "#111 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color:
                  theme === "dark" ? "#45CBA0 !important" : "#111 !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <>
              <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              />
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this course
                </h1>
                <div className="flex w-full items-center justify-between mt-5">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] text-white `}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] text-white`}
                    onClick={handleDelete}
                  ></div>
                </div>
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
