import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Loading, Header } from "../components";

const HomeLayout = () => {
  const isLoading = useNavigation().state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
