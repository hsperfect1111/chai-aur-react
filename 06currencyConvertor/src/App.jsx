import { useState } from "react";
import { Inputbox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0); // Amount user input karega
  const [from, setFrom] = useState("usd"); // Initially USD se conversion
  const [to, setTo] = useState("inr"); // Target currency
  const [convertedAmount, setConvertedAmount] = useState(0); // Converted amount

  // Use the custom hook to fetch exchange rates for `from` currency
  const currencyInfo = useCurrencyInfo(from);
  //   Yeh line useCurrencyInfo hook ko call karti hai, jisme aap from currency pass karte hain. Toh agar from = "usd" hai, toh yeh API se USD currency ke conversion rates fetch karega.
  //   json response:
  //   {
  //   "usd": {
  //     "aed": 3.67,
  //     "afn": 85.09,
  //     "all": 109.75,
  //     "amd": 477.65,
  //     "inr": 74.85,  // <- INR ke liye rate
  //     "eur": 0.85,
  //     "jpy": 115.07,
  //     // aur bhi currencies...
  //     }
  //    }

  // console.log(currencyInfo);
  // {
  //   "aed": 3.67,
  //   "afn": 85.09,
  //   "all": 109.75,
  //   "inr": 74.85,
  //   "eur": 0.85,
  //   "jpy": 115.07
  //   // Aur bhi currencies ka data dikhai de sakta hai
  // }

  // currencyInfo: Ismein USD ke liye saare conversion rates store hote hain.
  // javascript:
  // const currencyInfo = {
  //   "aed": 3.67,  // 1 USD = 3.67 AED
  //   "afn": 85.09, // 1 USD = 85.09 AFN
  //   "inr": 74.85, // 1 USD = 74.85 INR
  //   "eur": 0.85,  // 1 USD = 0.85 EUR
  //   // aur bhi rates...
  // };

  // Example Response for `currencyInfo` (for `from = "usd"`):
  // {
  //   "aed": 3.67,
  //   "afn": 85.09,
  //   "all": 109.75,
  //   "inr": 74.85,
  //   "eur": 0.85,
  //   "jpy": 115.07,
  //   ...
  // }

  const options = Object.keys(currencyInfo); // ??

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://www.pexels.com/photo/windsor-suspension-bridge-in-gibraltar-scenic-view-32437893/)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={from}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

// Ui k andar change krna h
// left side m photo lagao aur right side m is card ko use kijiye
// inr ka currencySelecteor dono m usd aa raha h abhi m chahta hu ki ek m usd aaye aur dusre m bydefault inr aaye
