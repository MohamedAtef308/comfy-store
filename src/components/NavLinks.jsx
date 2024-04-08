import React from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "orders", text: "orders" },
];

const NavLinks = () => {
  const {user} = useSelector((store) =>(store.user));

  return (
    <>
      {links.map((link, i) => {
        if (!( !user && (i == 4 || i == 5)))
        {
        return (<li key={link.id}>
          <NavLink to={link.url} className="capitalize">
            {link.text}
          </NavLink>
        </li>)
        }
      })}
    </>
  );
};

export default NavLinks;
