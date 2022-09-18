import { useState, useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

// import Button from "../components/Button";
import Button from "../components/Button";
import Loading from "../components/Loading";

const BuyList = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("PokeList component mounts");

    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {!loading && <p>Buy List</p>}
    </div>
  );
};

export default BuyList;
