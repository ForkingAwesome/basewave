import { useReadContract, useWriteContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useClientStore } from "../../store";

const Index = () => {
  const allSubscriptions = useClientStore((state) => state.allSubscriptions);
  const setAllSubscriptions = useClientStore(
    (state) => state.setAllSubscriptions
  );

  const [formData, setFormData] = useState({
    address: "",
  });

  const { writeContractAsync } = useWriteContract();

  const subscribe = async () => {
    const { address } = formData;

    try {
      const result = await writeContractAsync({
        abi: ABI_RECURRING_PAYMENTS,
        address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
        functionName: "executePayment",
        args: ["0xb158224674F8128554E23d1E6eaA57AA045Febe3"],
      });
      console.log(result);
    } catch (error: any) {
      console.error("Contract call failed with error:", error);
    }
  };

  const { data } = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscriptionPlans",
  });

  useEffect(() => {
    if (data) {
      setAllSubscriptions(data as Array<any>);
    }
  }, [data, setAllSubscriptions]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allSubscriptions.map((subscription, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{subscription.name}</h2>
              <p className="text-gray-600 mb-4">{subscription.description}</p>
              <ul className="mb-4">
                <li>
                  <strong>Allowance:</strong>{" "}
                  {subscription.allowance.toString()}
                </li>
                <li>
                  <strong>Customer:</strong> {subscription.customer}
                </li>
                <li>
                  <strong>Exists:</strong> {subscription.exists.toString()}
                </li>
                <li>
                  <strong>Is Active:</strong> {subscription.isActive.toString()}
                </li>
                <li>
                  <strong>Last Execution Date:</strong>{" "}
                  {subscription.lastExecutionDate.toString()}
                </li>
                <li>
                  <strong>Payee:</strong> {subscription.payee}
                </li>
                <li>
                  <strong>Subscription Period:</strong>{" "}
                  {subscription.subscriptionPeriod.toString()}
                </li>
              </ul>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={subscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
