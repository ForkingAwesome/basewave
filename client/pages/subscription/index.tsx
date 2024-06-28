import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";

const Subscription = () => {
  const result = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getSubscription",
    args: [
      "0xb158224674F8128554E23d1E6eaA57AA045Febe3",
      "0xb158224674F8128554E23d1E6eaA57AA045Febe3",
    ],
  });

  console.log(result.data);

  return (
    <div>
      <h1>Subscription</h1>
      <br />
      <div>
        <p>Details</p>
      </div>
    </div>
  );
};

export default Subscription;
