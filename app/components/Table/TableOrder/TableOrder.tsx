"use client";

// Components
import {
  CustomAvatarName,
  CustomCheckBoxField,
  CustomDateFormat,
  CustomList,
  CustomNumberFormat,
  CustomStatus,
  CustomQuantity,
} from "@/components/Table/common";
import { DataGrid } from "@/components";

//Types
import { ColumnType, Order } from "@/types";

// Constants
import { ROUTES } from "@/constants";

interface TableOrderProps {
  orders: Order[];
  status: string;
  keyword: string;
}

const TableOrder = ({ orders, status, keyword }: TableOrderProps) => {
  const handleChangeCheckbox = () => {
    // TODO: handle checkbox here
  };

  // Table Columns
  const columns: ColumnType<Order>[] = [
    {
      key: "id",
      title: "Id",
      customNode: (_, { id }) => (
        <CustomCheckBoxField
          id={id}
          link={`${ROUTES.ORDER_LIST}/${id}`}
          onChange={handleChangeCheckbox}
        />
      ),
      sortable: true,
    },
    {
      key: "createdAt",
      title: "Date",
      customNode: (_, { createdAt }) => <CustomDateFormat date={createdAt} />,
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      customNode: (_, { status }) => <CustomStatus status={status} />,
      sortable: true,
    },
    {
      key: "customer",
      title: "Customer",
      customNode: (_, { customer }) => {
        return (
          <CustomAvatarName avatar={customer.avatar} text={customer.fullName} />
        );
      },
      sortable: true,
    },
    {
      key: "products",
      title: "Products",
      customNode: (_, { products }) => <CustomList products={products} />,
      sortable: true,
    },
    {
      key: "count",
      title: "quantity",
      customNode: (_, { products }) => <CustomQuantity products={products} />,
      sortable: true,
    },
    {
      key: "revenue",
      title: "Revenue",
      customNode: (_, { revenue }) => <CustomNumberFormat value={revenue} />,
      sortable: true,
    },
  ];

  const sortedProducts = orders.sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );

  return (
    <DataGrid
      data={sortedProducts}
      columns={columns}
      filterBy={status}
      keyword={keyword}
    />
  );
};

export default TableOrder;
