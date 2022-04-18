import { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import {
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  KeyOutlined as KeyOutlinedIcon,
  VisibilityOutlined as Visibility,
  VisibilityOffOutlined as VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

const useAuthFormStyles = makeStyles((theme: Theme) =>
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
      borderBottom: "8px solid #D84465",
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
    footerLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "15px",
      width: "fit-content",
      color: theme.palette.grey[800],
      textDecoration: "underline",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    helperText: {
      fontSize: "0.85rem",
      color: theme.palette.grey[600],
    },
  })
);

const Login = () => {
  const classes = useAuthFormStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/list");
  };

  return (
    <DefaultLayout>
      <div className={classes.root}>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Login</h3>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classes.inputStyle}>
              <TextField
                autoComplete="off"
                style={{ flexGrow: 1 }}
                id="input-with-icon-grid-password"
                variant="outlined"
                label="Password"
                color="secondary"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors?.password)}
                helperText={errors?.password?.message}
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,16}$/,
                    message:
                      "8-16 characters long password having at least 1 Special Character, 1 Uppercase, 1 Lowercase and 1 number",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
