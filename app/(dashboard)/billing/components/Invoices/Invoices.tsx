"use client";

// Components
import InvoiceItem from "../InvoiceItem/InvoiceItem";

// Types
import { Invoice } from "@/types";

interface InvoicesProps {
  invoices: Invoice[];
}

const Invoices = ({ invoices }: InvoicesProps) => {
  const invoiceListDeskTop = invoices.slice(0, 2).map(invoice => {
    const { id, invoicePrefix, createdAt, totalCost } = invoice;
    return (
      <InvoiceItem
        key={id}
        id={id}
        date={createdAt}
        invoicePrefix={invoicePrefix}
        price={totalCost}
      />
    );
  });

  const invoiceList = invoices.map(invoice => {
    const { id, invoicePrefix, createdAt, totalCost } = invoice;
    return (
      <InvoiceItem
        key={id}
        id={id}
        date={createdAt}
        invoicePrefix={invoicePrefix}
        price={totalCost}
      />
    );
  });

  return (
    <div className="p-6 bg-white dark:bg-[#202940] rounded-lg shadow-md w-full min-h-[234px]">
      <div className="text-[#344767] dark:text-white flex justify-between items-center">
        <h3 className="font-semibold">Invoices</h3>
        <button className="text-xs font-semibold px-[18px] py-[6px] border border-[#344767] dark:border-white rounded-md">
          VIEW ALL
        </button>
      </div>
      <ul className="flex flex-col gap-2 mt-6 hidden xl:block">
        {invoiceListDeskTop}
      </ul>
      <ul className="flex flex-col gap-2 mt-6 xl:hidden">{invoiceList}</ul>
    </div>
  );
};

export default Invoices;
