import DefaultLayout from "../components/DefaultLayout";

import { Button, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUserList } from "../contexts/UserListProvider";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      padding: theme.spacing(3),
      width: "380px",
      borderRadius: "5px",
      alignSelf: "center",
      margin: "auto",
      boxShadow: theme.shadows[3],
      backgroundColor: "#fff",
      fontFamily: "Roboto",
      // borderBottom: "8px solid #D84465",
    },
    heading: {
      FontSize: "24px",
      textAlign: "left",
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
      width: "100%",
      backgroundColor: "#1A1D3F !important",
      color: "#fff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#1A1D3F  !important",
      },
      padding: `${theme.spacing(1.5, 0)} !important`,
      margin: `${theme.spacing(2, 0)} !important`,
    },
  })
);
const User: any = () => {
  const classes = useStyles();
  const [, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const { usersList, createUser, editUser } = useUserList();
  let { id } = useParams();
  const getUser = () => {
    if (id) {
      const prevUsers = [...usersList];
      const user: any = prevUsers.find((user) => user.id === Number(id));
      return user;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...getUser() },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const prevUsers = [...usersList];
      const user: any = prevUsers.find((user) => user.id === Number(id));
      if (user) {
        setUser(user);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = (data: any) => {
    if (id) {
      editUser(id, data);
    } else {
      createUser(data);
    }
    navigate("/list");
  };
  return (
    <DefaultLayout>
      <div className={classes.root}>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{id ? "Update" : "Enter"} User Details</h3>
            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-email"
                variant="outlined"
                label="First Name"
                type="text"
                color="secondary"
                {...register("firstName", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "First Name is required!",
                  },
                })}
                error={Boolean(errors?.firstName)}
                helperText={errors?.firstName?.message}
              />
            </div>

            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-email"
                variant="outlined"
                label="Last Name"
                type="text"
                color="secondary"
                {...register("lastName", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Last Name is required",
                  },
                })}
                error={Boolean(errors?.lastName)}
                helperText={errors?.lastName?.message}
              />
            </div>

            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-email"
                variant="outlined"
                label="Email address"
                type="text"
                color="secondary"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </div>

            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-email"
                variant="outlined"
                label="Phone Number"
                type="text"
                color="secondary"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^(?:[0-9]{2,3}|\+[0-9]{2,3}|0)((?:7|1)[0-9]{8})$/,
                    message: "Input a Valid Phone Number",
                  },
                })}
                error={Boolean(errors?.phoneNumber)}
                helperText={errors?.phoneNumber?.message}
              />
            </div>

            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-email"
                variant="outlined"
                label="Address"
                type="text"
                color="secondary"
                {...register("address", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9 ,']{2,40}$/,
                    message: "Invalid Address",
                  },
                })}
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
              />
            </div>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {id ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default User;
