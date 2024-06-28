import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useRouter } from "next/router";
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

const Subscription = () => {
  const router = useRouter();
  const address = router.query.slug;
  const [subscriptions, setSubscriptions] = useState<
    SubscriptionType[] | undefined
  >(undefined);

  const result = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscribers",
    args: [address],
  });

  useEffect(() => {
    console.log(result.data);
    if (result.data) {
      setSubscriptions(result.data as SubscriptionType[]);
    }
  }, [result.data]);

  const displayAllSubscribers = (
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
        {subscriptions?.map((subscription, index) => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1>Subscription</h1>
      <br />
      <div>{displayAllSubscribers}</div>
    </div>
  );
};

export default Subscription;
