import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";

const Dashboard = () => {
  const result = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllCreatedSubscriptions",
    args: ["0xb158224674F8128554E23d1E6eaA57AA045Febe3"],
  });

  console.log("Created Subs: ", result.data);

  const result2 = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscribers",
    args: ["0xb158224674F8128554E23d1E6eaA57AA045Febe3"],
  });

  console.log("All Subscribers: ", result2.data);

  return (
    <div>
      <h1>Dashboard</h1>
      <button>Show Subscribed Things (User)</button>
      <button>Show Created Subscribtions (Merchant)</button>
      <br />
      <br />
      <div>
        <p>Subscribed Things</p>
      </div>
      <br />
      <br />
      <div>
        <p>Created Subscriptions</p>
      </div>
    </div>
  );
};

export default Dashboard;
