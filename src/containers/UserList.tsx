import { Navigate, useNavigate } from "react-router-dom";
import { Avatar, Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
} from "@mui/icons-material";

import DefaultLayout from "../components/DefaultLayout";
import { useUserList } from "../contexts/UserListProvider";
import { IUser } from "../types";
import { stringAvatar, stringToColor } from "../utils/stringChange";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(10),
    },
    itemContainer: {
      display: "flex",
      padding: theme.spacing(3, 3, 1, 3),
      minWidth: "380px",
      borderRadius: "5px",
      boxShadow: theme.shadows[3],
      backgroundColor: "#fff",
      marginBottom: theme.spacing(3),
    },
    avatar: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      marginRight: theme.spacing(2),
    },
    items: {
      "& > *": {
        marginBottom: theme.spacing(0.75),
      },
    },
    inputStyle: {
      margin: theme.spacing(2, 0),
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "0.3em",
    },
    button: {
      color: "#6d76dd !important",

      "&:hover": {
        backgroundColor: "unset !important",
        color: "#3946dd !important",
      },
    },
  })
);

const UserList = () => {
  const classes = useStyles();

  const { usersList, deleteUser } = useUserList();

  const navigate = useNavigate();

  if (!usersList.length) return <Navigate to="/new" />;

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    deleteUser(id);
  };

  return (
    <DefaultLayout>
      <Box className={classes.root}>
        <h1>User's List</h1>
        <Button className={classes.button} onClick={() => navigate("/new")}>
          Add New User
        </Button>
        <Box paddingTop={2}>
          {usersList.map((user: IUser, i: string) => (
            <Box key={`${i}-index`} className={classes.itemContainer}>
              <Avatar
                {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                className={classes.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: stringToColor(`${user.firstName} ${user.lastName}`),
                }}
              />
              <Box>
                <Box className={classes.items}>
                  <Box>
                    {" "}
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </Box>
                  <Box>
                    <strong>Email:</strong> {user.email}
                  </Box>
                  <Box>
                    <strong>Phone Number:</strong> {user.phoneNumber}
                  </Box>
                  <Box>
                    <strong>Address:</strong> {user.address}
                  </Box>
                </Box>
                <Box>
                  <Button
                    className={classes.button}
                    variant="text"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className={classes.button}
                    variant="text"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default UserList;
