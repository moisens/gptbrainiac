import Link from "next/link";
import links from "../utils/utils.navlink";

const NavLinks = () => {
  return (
    <ul className="menu  text-base-content">
      {links.map((link) => {
        const { href, label } = link;
        return (
          <li key={href}>
            <Link href={href} className="uppercase">
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
