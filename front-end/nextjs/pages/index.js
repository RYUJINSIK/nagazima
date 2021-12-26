import React from "react";
import "semantic-ui-css/semantic.min.css";
import HeaderNav from "../components/HeaderNav";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div>
      <HeaderNav />
    </div>
  );
};

export default Index;
