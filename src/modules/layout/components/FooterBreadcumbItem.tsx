import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { INDEX } from "../../index";

type Props = {
  to: string;
  label: string;
  isFirstItem: boolean;
};

const FooterBreadcumbItem = ({ to, label, isFirstItem }: Props) => {
  const moduleMatching = INDEX.find((item) => item.module === label);

  return (
    <Link
      className="link-footer"
      to={isFirstItem ? `/${moduleMatching?.module}` : to}
      tabIndex={-1}
    >
      {moduleMatching?.icon
        ? React.cloneElement(moduleMatching?.icon, {
            className: "text-base mr-2",
          })
        : null}
      {decodeURI(label)}
    </Link>
  );
};

export default FooterBreadcumbItem;
