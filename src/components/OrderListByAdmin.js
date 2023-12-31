import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function OrderListByAdmin() {
  const [paymentLog, setPaymentLog] = useState();
  const [reLoad, setReLoad] = useState(true);

  useEffect(() => {
    const getPaymentLog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVERURL}/orders/Admin`, {
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

  const statusChangeOrder = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVERURL}/orders/${id}/Admin`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const cancelOrderComplete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_SERVERURL}/orders/${id}/Ok`, {
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
        alert("환불 승인 처리가 완료되었습니다.")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const compulsionRefund = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_SERVERURL}/orders/${id}/Admin`, {
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
        alert("환불이 완료되었습니다.")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const convertUtc = (time) => {
    let date = new Date(time);
    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();
    date.setHours(hours - offset);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="h-[93%] rounded-t-3xl p-6">
        <h1 className="text-2xl text-center font-bold">어드민 주문 관리</h1>
      </div>
      {paymentLog &&
        paymentLog.map((item) => {
          return (
            <div type="submit" className="flex flex-col w-[90%] mx-auto shadow-md shadow-slate-400 bg-pink-300 p-4 py-1.5 rounded-2xl font-bold text-white mb-3">
              <div className="flex flex-row justify-between">
                <p>주문 코드: {item.impUid}</p>
                <p>금액: {item.totalPrice}</p>
              </div>
              <div>구매 목록</div>
              {item.paymentDetail.length === 0 ? (
                <div>포인트 충전</div>
              ) : (
                item.paymentDetail.map((e) => {
                  return (
                    <div>
                      {e["product"].productName} X {e.count}
                    </div>
                  );
                })
              )}
              <div>사용 포인트: {item.paidPoint}</div>
              <span> 주문일: {convertUtc(item.createdAt)}</span>
              <div className="flex justify-end">
                <p className="me-2">{item.status}</p>
                <button value={item.id} type="submit" className="w-[100px] bg-pink-400 rounded-2xl me-2" onClick={(e) => statusChangeOrder(e.target.value)}>
                  상태 변경
                </button>
                <button value={item.id} type="submit" className="w-[100px] bg-pink-400 rounded-2xl me-2" onClick={(e) => compulsionRefund(e.target.value)}>
                  강제 환불
                </button>
                <button value={item.id} type="submit" className="w-[100px] bg-pink-400 rounded-2xl me-2" onClick={(e) => cancelOrderComplete(e.target.value)}>
                  환불 승인
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
