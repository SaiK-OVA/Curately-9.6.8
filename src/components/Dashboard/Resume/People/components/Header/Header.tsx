// import React from "react";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";

import './Header.scss'

const Header = () => {

  // const isCandidate = window.location.hash.includes('/resume/people');
  const isContact = window.location.hash.includes('/contact/people');

  return (
    <Card
      className="header-card"
    >
      <Typography className="header-text">People - {isContact ? "Contact" : "Candidate"}</Typography>
    </Card>
  );
};

export default Header;
