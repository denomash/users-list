import { ReactChild } from "react";

import { createStyles, makeStyles } from "@mui/styles";

const useStyles: any = makeStyles(() =>
  createStyles({
    pageContent: {
      width: "80%",
      margin: "0 auto",
      height: '100%',
    },
    container: {
      height: "92vh",
      marginTop: "8vh",
      position: 'absolute',
      width: "100%",

    },
  })
);

type LayoutProps = {
  children: ReactChild;
};

const DefaultLayout = ({ children }: LayoutProps) => {
  const classes = useStyles();

  return (
    <>
      <main className={classes.container}>
        <div className={classes.pageContent}>
          <>{children}</>
        </div>
      </main>
    </>
  );
};

export default DefaultLayout;
