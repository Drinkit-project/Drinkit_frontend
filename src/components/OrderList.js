import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function OrderList() {
  const [paymentLog, setPaymentLog] = useState();
  const [reLoad, setReLoad] = useState(true);

  useEffect(() => {
    const getPaymentLog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVERURL}/orders`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.data;
          setPaymentLog(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPaymentLog();
  }, [reLoad]);

  const cancelOrderRequest = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_SERVERURL}/orders/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.data;
        if (reLoad) {
          setReLoad(false);
        } else {
          setReLoad(true);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className=" rounded-t-3xl text-2xl font-bold text-center my-4 p-3">주문 목록</h1>
      {paymentLog &&
        paymentLog.map((item) => {
          return (
            <div type="submit" key={item.id} className="flex flex-col w-[90%] mx-auto shadow-md shadow-slate-400 bg-pink-300 p-4 py-1.5 rounded-2xl font-bold text-white mb-3">
              <div className="flex flex-row justify-between">
                <p>{item.impUid}</p>
                <p>금액-{item.totalPrice}</p>
              </div>
              <span> 주문일: {item.createdAt}</span>
              <div className="flex justify-end">
                <p className="me-2">{item.status}</p>
                <button value={item.id} type="submit" className="w-[10%] bg-pink-400 rounded-2xl me-2" onClick={(e) => cancelOrderRequest(e.target.value)}>
                  환불하기
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
