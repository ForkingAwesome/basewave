import { useWriteContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";

const index = () => {
  const { writeContract } = useWriteContract();

  return (
    <div>
      <h1>Subscribe</h1>
      <br />
      <div>
        <label htmlFor="address">Address</label>
        <input name="address" type="text"></input>
        <br />
        <br />
        <button
          onClick={() => {
            try {
              const result = writeContract({
                abi: ABI_RECURRING_PAYMENTS,
                address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
                functionName: "executePayment",
                args: ["0xb158224674F8128554E23d1E6eaA57AA045Febe3"],
                account: "0xb158224674F8128554E23d1E6eaA57AA045Febe3",
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default index;
