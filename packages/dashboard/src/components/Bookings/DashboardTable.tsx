import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { ethers } from "ethers";
import CheckoutHub from "../../resources/CheckoutHub.json";
import { Network, Alchemy } from "alchemy-sdk";

import "./DashboardContent.css";

export default function DashboardTable() {
  const [web3Data, setWeb3Data] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const { abi, address } = CheckoutHub;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/9JAI0P5UbmdcRreyr-IgjJKV61Bl210o"
  );

  useEffect(() => {
    const getEventData = async () => {
      const contract = new ethers.Contract(address, abi, provider);
      const data = await contract.queryFilter("Booking", 34100999);
      setWeb3Data(data);
    };
    getEventData();
  }, []);

  console.log(web3Data);

  const getFormattedValues = (val: any) => {
    const checkin = new Date(val.fromDate._hex * 1000).toDateString();
    const checkout = new Date(val.toDate._hex * 1000).toDateString();
    const bigNumber = ethers.BigNumber.from(val.paymentAmount._hex.toString());
    const amount = ethers.utils.formatUnits(bigNumber, 18);

    return { checkin, checkout, amount };
  };

  useEffect(() => {
    const events = web3Data?.map((event: any) => {
      const { checkin, checkout, amount } = getFormattedValues(event.args);
      return {
        name: "Frida Kahlo",
        checkin: checkin,
        checkout: checkout,
        wallet: event.address,
        date: "08/10/2022",
        amount: "DAI " + amount,
      };
    });
    setTableData(events);
  }, [web3Data]);

  const data = useMemo(() => tableData, [tableData]);

  const columns = useMemo(
    () => [
      {
        Header: "Latest Trasactions",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Check-in",
            accessor: "checkin",
          },
          {
            Header: "Check-out",
            accessor: "checkout",
          },
          {
            Header: "Payment",
            accessor: "wallet",
          },
          {
            Header: "Booking date",
            accessor: "date",
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div {...getTableProps()} className="dashboardTable">
      <div className="tableHead">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </div>
      <div {...getTableBodyProps()} className="tableBody">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </div>
    </div>
  );
}
