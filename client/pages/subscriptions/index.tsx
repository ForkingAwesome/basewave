import {
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useClientStore } from "../../store";

const index = () => {
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
        args: ["0x369B9F5963Ae40F06FA87E001De4BE4C39F21F2B"],
      });
      console.log(result);
    } catch (error: any) {
      console.error("Contract call failed with error:", error);
    }
  };

  const displayAllSubscriptions = (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Allowance</th>
          <th>Customer</th>
          <th>Description</th>
          <th>Exists</th>
          <th>Is Active</th>
          <th>Last Execution Date</th>
          <th>Name</th>
          <th>Payee</th>
          <th>Subscription Period</th>
        </tr>
      </thead>
      <tbody>
        {allSubscriptions.map((subscription, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{subscription.allowance.toString()}</td>
            <td>{subscription.customer}</td>
            <td>{subscription.description}</td>
            <td>{subscription.exists.toString()}</td>
            <td>{subscription.isActive.toString()}</td>
            <td>{subscription.lastExecutionDate.toString()}</td>
            <td>{subscription.name}</td>
            <td>{subscription.payee}</td>
            <td>{subscription.subscriptionPeriod.toString()}</td>
            {/* ADD POPUP ON CLICKING THIS BUTTON */}
            <button onClick={subscribe}>
              <td>Subscribe</td>
            </button>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const { data } = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscriptionPlans",
  });

  useEffect(() => {
    console.log(allSubscriptions);
  }, [allSubscriptions]);

  useEffect(() => {
    if (data) {
      setAllSubscriptions(data as Array<any>);
    }
  }, [data, setAllSubscriptions]);

  return (
    <div>
      <h1>Your Subscriptions</h1>
      <br />
      <div>{displayAllSubscriptions}</div>
    </div>
  );
};

export default index;
