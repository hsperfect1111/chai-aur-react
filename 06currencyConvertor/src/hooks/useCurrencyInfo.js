import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  // jo json format m data aayega usko ek variable m hold nhi kr skte kyuki UI bhi update krna h // to ye hook direct useState se value return krva dete h
  // fetch krne pr koi value nhi aa rahi h to crash nhi karega {} use krne se useState k andar
  // data ek state variable hai jisme aap fetched data store karoge.
  // setData us data ko update karne ka function hai.
  // Initial value {} (empty object) diya gaya hai.
  const [data, setData] = useState({}); // ??
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      // Jab API se data milta hai, wo res mein aata hai.
      // Us res object ke andar ka currency key ka value nikala jaa raha hai.
      // res[currency] ka matlab hai:
      // res["usd"]  // agar currency = "usd"
      // Fir setData(...) ke through us value ko React state (data) mein store kiya ja raha hai.
      // Currency ka specific data (jaise usd ke liye { "inr": 74.85, "eur": 0.85, ... })
      .then((res) => setData(res[currency]));
    console.log(data);
  }, [currency]);
  console.log(data);
  return data;
}

export default useCurrencyInfo;

// By the 22:05 timestamp, I had learned how to design a custom hook,
