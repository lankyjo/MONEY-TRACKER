import { useEffect, useState } from "react";
import Form from "./components/Form";
import Transactions from "./components/Transactions";
import axios from "axios";

function App() {
  const [transactionList, setTransactionList] = useState(()=>{
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [

    ];  
  });

  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("Spend");
  const [currencyOption, setCurrencyOption] = useState("NGN");
  const [totalAmount, setTotalAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate,  setExchangeRate] = useState(null)

  useEffect(() => {
    let total = 0
    transactionList.forEach(transaction=>{
      let amountNumber = parseFloat(transaction.amount.replace('₦',''))
      transaction.option=='Spend'?total-=amountNumber:total+=amountNumber
  })
  setTotalAmount(total)
  localStorage.setItem('transactions', JSON.stringify(transactionList))
  }, [transactionList]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/NGN`;

    const storedRate = localStorage.getItem("exchangeRate");
    setExchangeRate(JSON.parse(storedRate))
    const storedDate = localStorage.getItem("exchangeRateDate");
    const currentDate = new Date().toISOString().split('T')[0];

    if (storedRate && storedDate === currentDate) {
      const exchangeRate = JSON.parse(storedRate);
      if (currencyOption === "USD") {
        setConvertedAmount(totalAmount / exchangeRate);
      } else if(currencyOption === 'NGN') {
        setConvertedAmount(totalAmount);
      }
    } else {
      fetchdata()
    }

    async function fetchdata() {
      try{
        const response = await axios.get(url)
        const exchangeRate = response.data.conversion_rate
        localStorage.setItem("exchangeRate", JSON.stringify(exchangeRate));
        localStorage.setItem("exchangeRateDate", currentDate);
        if (currencyOption === "USD") {
          setConvertedAmount(totalAmount / exchangeRate);
        } else {
          setConvertedAmount(totalAmount);
        }
      }
      catch(error){
        console.error(error);
      }
    }
  }, [currencyOption, totalAmount]);

  function deleteTransaction(id){
    const newTransactionList = transactionList.filter((transaction)=>(
      transaction.id != id
    ))
    setTransactionList(newTransactionList)
  }
  function clearList(){
    const savedTransactions = localStorage.getItem("transactions");

    savedTransactions&&localStorage.removeItem('transactions')
    setTransactionList([      {
      "id": 2,
      "name": "Test",
      "description": "This is a test, For you to use as a guide",
      "amount": "₦0",
      "option": "Earn",
      "dateTime": "2025-02-06T18:15"
    }])
    setCurrencyOption('NGN')
  }
  return (
    <>
      <main className="max-w-[700px] w-full px-4 mx-auto space-y-5 flex flex-col pt-7 pb-14">
      <header className="flex justify-between items-center ">
        <button className="border-gray-600 py-2 px-4 rounded-md border-2 cursor-pointer" onClick={clearList}>Clear</button>
        <select className="border-gray-600 focus:border-blue-400 p-2 rounded-md border-2" value={currencyOption} onChange={e=>setCurrencyOption(e.target.value)}>
          <option value="NGN" className="bg-gray-300 font-semibold text-black p-3" >NGN</option>
          <option value="USD" className="bg-gray-300 font-semibold text-black p-3" >USD</option>
        </select>
      </header>
        <h1 id="balance" className={`text-center md:text-6xl text-4xl font-semibold max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${totalAmount<0?'text-red-500':'text-white'}`}>
        <span>{currencyOption === "NGN" ? "₦" : "$"}</span>
        {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <section>
          <Form
            name={name}
            setName={setName}
            dateTime={dateTime}
            setDateTime={setDateTime}
            description={description}
            setDescription={setDescription}
            amount={amount}
            setAmount={setAmount}
            option={option}
            setOption={setOption}
            transactionList={transactionList}
            setTransactionList={setTransactionList}
            setCurrencyOption={setCurrencyOption}
          />
          {transactionList.length?<Transactions deleteTransaction={deleteTransaction} transactionList={transactionList} exchangeRate={exchangeRate} currencyOption={currencyOption}  />:<div className="mt-10 text-center text-2xl text-gray-700">No Transactions here yet</div>}
        </section>
      </main>
    </>
  );
}

export default App;
