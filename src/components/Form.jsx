const Form = ({name, setName, dateTime, setDateTime, description, setDescription, amount, setAmount, option, setOption, transactionList, setTransactionList,setCurrencyOption}) => {

    function addNewTransaction(e){
        e.preventDefault()
        const newTransaction = {
            id: crypto.randomUUID(),
            name: name.trim(),
            dateTime,
            description: description.trim(),
            amount: `₦${amount.trim()}`,
            option,
        }
        setTransactionList([...transactionList, newTransaction])
        setName("");
        setDateTime("");
        setDescription("");
        setAmount("");
        setOption("Spend");
        setCurrencyOption('NGN')
        console.log(newTransaction);
    }

    return (
    <form onSubmit={addNewTransaction} className="flex gap-2 justify-center items-center flex-col">

        <div className="flex gap-2 w-full">
            <input 
            className="border p-2 min-w-0 flex-1 border-gray-500 rounded-md" 
            placeholder="samsung Tv" 
            type="text"
            value={name}
            onChange={e=>setName(e.target.value.trimStart())}
            required />

            <input 
            className="border p-2 min-w-0 flex-1 border-gray-500 rounded-md" 
            type="datetime-local" 
            value={dateTime}
            onChange={e=>setDateTime(e.target.value)}
            onFocus={e=>e.target.showPicker()}
            inputMode="none"
            required />
        </div>

        <div className="flex gap-2 w-full">
            <input 
            className="border p-2 min-w-0 flex-1 border-gray-500 rounded-md" 
            placeholder="200" 
            type="number"
            value={amount}
            onChange={e=>setAmount(e.target.value.trimStart())}
            required
            />

            <select className="border p-2 min-w-0 flex-1 border-gray-500 rounded-md" value={option} onChange={e=>setOption(e.target.value)}>
                <option className="bg-gray-300 font-semibold text-black" value="Spend">Spend</option>
                <option className="bg-gray-300 font-semibold text-black" value="Earn">Earn</option>
            </select>
        </div>

        <textarea 
        className="border w-full p-2 resize-none border-gray-500 rounded-md"
        placeholder="Description"
        value={description}
        onChange={e=>setDescription(e.target.value.trimStart())}
        required
        ></textarea>

        <button 
        type="submit"
        className="bg-blue-500 px-6 py-4 rounded-lg cursor-pointer w-full"
        >Add new Transaction</button>
    </form>
  )
}

export default Form;
