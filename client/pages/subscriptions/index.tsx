import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useEffect } from "react";
import { useClientStore } from "../../store";

const index = () => {
  const allSubscriptions = useClientStore((state) => state.allSubscriptions);
  const setAllSubscriptions = useClientStore(
    (state) => state.setAllSubscriptions
  );

  const displayAllSubscriptions = allSubscriptions.map(
    (subscription, index) => (
      <div key={index}>
        <p>{subscription}</p>
      </div>
    )
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
