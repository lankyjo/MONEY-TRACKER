const Transaction = ({ transaction, currencyOption, exchangeRate, deleteTransaction }) => {
  let amountNumber = parseFloat(transaction.amount.replace("₦", "").replace(",", "")); 

  // Convert to USD if selected
  if (currencyOption === "USD" && exchangeRate) {
    amountNumber /= parseFloat(exchangeRate);
  }

  // Ensure the amount is properly formatted with two decimal places
  const formattedAmount = amountNumber.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex justify-between pb-1">
      <div id="left">
        <h3 className="text-base md:text-xl capitalize">{transaction.name}</h3>
        <h4 className="text-xs text-gray-500">{transaction.description}</h4>
        <button onClick={()=>deleteTransaction(transaction.id)} className="text-red-500 text-xs underline cursor-pointer">Delete</button>
      </div>
      <div id="right" className="text-right">
        <h2
          className={`text-base md:text-2xl font-semibold overflow-hidden text-ellipsis ${
            transaction.option === "Spend" ? "text-red-500" : "text-green-500"
          }`}
        >
          {transaction.option === "Spend" ? <span>-</span> : <span>+</span>}
          {currencyOption === "NGN" ? "₦" : "$"}
          {formattedAmount}
        </h2>
        <h5 className="text-xs text-gray-500">{transaction.dateTime.replace("T", " ")}</h5>
      </div>
    </div>
  );
};

export default Transaction;
