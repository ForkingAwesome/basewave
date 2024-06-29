"use client";
import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useEffect, useState } from "react";

type SubscriptionType = {
  allowance: bigint;
  customer: string;
  description: string;
  exists: boolean;
  isActive: boolean;
  lastExecutionDate: bigint;
  name: string;
  payee: string;
  subscriptionPeriod: bigint;
};

type CreatedSubscriptionType = {
  allowance: bigint;
  creationDate: bigint;
  customer: string;
  description: string;
  name: string;
  payee: string;
};

const Dashboard = () => {
  const [createdSubscriptions, setCreatedSubscriptions] = useState<CreatedSubscriptionType[] | undefined>(undefined);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[] | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<"subscribers" | "created">("subscribers");

  const result = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllCreatedSubscriptions",
    args: ["0x369B9F5963Ae40F06FA87E001De4BE4C39F21F2B"],
  });

  const result2 = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscribers",
    args: ["0x369B9F5963Ae40F06FA87E001De4BE4C39F21F2B"],
  });

  useEffect(() => {
    if (result.data) {
      setCreatedSubscriptions(result.data as CreatedSubscriptionType[]);
    }
  }, [result.data]);

  useEffect(() => {
    if (result2.data) {
      setSubscriptions(result2.data as SubscriptionType[]);
    }
  }, [result2.data]);

  const tableClassName = "min-w-full bg-white border border-gray-200 shadow-md rounded-lg";
  const theadClassName = "bg-gray-100 border-b border-gray-200";
  const thClassName = "px-4 py-2 text-left text-gray-600";
  const tbodyClassName = "text-gray-700";
  const trClassName = "border-b border-gray-200";
  const tdClassName = "px-4 py-2";

  const displayCreatedSubs = (
    <div className="overflow-x-auto">
      <table className={tableClassName}>
        <thead className={theadClassName}>
          <tr>
            <th className={thClassName}>Index</th>
            <th className={thClassName}>Allowance</th>
            <th className={thClassName}>Creation Date</th>
            <th className={thClassName}>Customer</th>
            <th className={thClassName}>Description</th>
            <th className={thClassName}>Name</th>
            <th className={thClassName}>Payee</th>
          </tr>
        </thead>
        <tbody className={tbodyClassName}>
          {createdSubscriptions?.map((subscription, index) => (
            <tr key={index} className={trClassName}>
              <td className={tdClassName}>{index}</td>
              <td className={tdClassName}>{subscription.allowance.toString()}</td>
              <td className={tdClassName}>{subscription.creationDate.toString()}</td>
              <td className={tdClassName}>{subscription.customer}</td>
              <td className={tdClassName}>{subscription.description}</td>
              <td className={tdClassName}>{subscription.name}</td>
              <td className={tdClassName}>{subscription.payee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const displayAllSubscribers = (
    <div className="overflow-x-auto">
      <table className={tableClassName}>
        <thead className={theadClassName}>
          <tr>
            <th className={thClassName}>Index</th>
            <th className={thClassName}>Allowance</th>
            <th className={thClassName}>Customer</th>
            <th className={thClassName}>Description</th>
            <th className={thClassName}>Exists</th>
            <th className={thClassName}>Is Active</th>
            <th className={thClassName}>Last Execution Date</th>
            <th className={thClassName}>Name</th>
            <th className={thClassName}>Payee</th>
            <th className={thClassName}>Subscription Period</th>
          </tr>
        </thead>
        <tbody className={tbodyClassName}>
          {subscriptions?.map((subscription, index) => (
            <tr key={index} className={trClassName}>
              <td className={tdClassName}>{index}</td>
              <td className={tdClassName}>{subscription.allowance.toString()}</td>
              <td className={tdClassName}>{subscription.customer}</td>
              <td className={tdClassName}>{subscription.description}</td>
              <td className={tdClassName}>{subscription.exists.toString()}</td>
              <td className={tdClassName}>{subscription.isActive.toString()}</td>
              <td className={tdClassName}>{subscription.lastExecutionDate.toString()}</td>
              <td className={tdClassName}>{subscription.name}</td>
              <td className={tdClassName}>{subscription.payee}</td>
              <td className={tdClassName}>{subscription.subscriptionPeriod.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-x-4 mb-4">
        <button
          onClick={() => setSelectedOption("subscribers")}
          className={`px-4 py-2 rounded-md ${selectedOption === "subscribers" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Show Subscribed Things (User)
        </button>
        <button
          onClick={() => setSelectedOption("created")}
          className={`px-4 py-2 rounded-md ${selectedOption === "created" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Show Created Subscriptions (Merchant)
        </button>
      </div>

      {selectedOption === "subscribers" && (
        <div>
          <h2 className="text-xl font-bold mb-2">All Subscribers</h2>
          {displayAllSubscribers}
        </div>
      )}

      {selectedOption === "created" && (
        <div>
          <h2 className="text-xl font-bold mb-2">Created Subscriptions</h2>
          {displayCreatedSubs}
        </div>
      )}
    </div>
  );
};

export default Dashboard;