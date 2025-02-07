import Transaction from "./Transaction"

const Transactions = ({transactionList, exchangeRate, currencyOption, deleteTransaction}) => {
  return (
    <div className="mt-8 divide-y divide-gray-800 space-y-3">
    {
        transactionList.map((transaction)=>(
            <Transaction key={transaction.id} exchangeRate={exchangeRate} currencyOption={currencyOption} transaction={transaction} deleteTransaction={deleteTransaction} />
        ))
    }
    </div>
  )
}

export default Transactions