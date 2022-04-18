import { Box, Button, Theme } from "@mui/material";

import { createStyles, makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: theme.spacing(5),
      color: "#1A1D3F !important",
      border: "1px solid #1A1D3F !important",
      cursor: "pointer",
    },
    header: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      boxShadow: "1px 2px 10px rgb(0 0 0 / 10%)",
      height: "8vh",
      position: "fixed",
      width: "100%",
      backgroundColor: "#fff",
      zIndex: 1000,
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      margin: "0 auto",
    },
    logo: {
      cursor: "pointer",
    },
  })
);

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const classes = useStyles();

  const navigator = useNavigate();

  const handleAuth = () => {
    console.log({ user });
    if (user?.email) {
      localStorage.removeItem("user");
      navigator("/login");
    }
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Box
          component="h1"
          className={classes.logo}
          onClick={() => navigator("/list")}
        >
          USERS LIST
        </Box>
        <Button
          onClick={handleAuth}
          variant="outlined"
          className={classes.button}
        >
          {user?.email ? "Logout" : "Login"}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
