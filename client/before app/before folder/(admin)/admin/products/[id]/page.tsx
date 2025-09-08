import React from "react";
import UpdateProduct from "../../../_componnents/UpdateProduct";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <UpdateProduct productId={id} />
    </div>
  );
};

export default page;
