import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Signup from "../components/Signup";
import Button from "../components/ui/Button";
import Loading from "../components/Loding";
import AddPoint from "../components/AddPoint";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    "max-width": "450px",
    position: "absolute",
    height: "450px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "1rem",
    "padding-left": "2rem",
    "padding-right": "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    animation: "slide-up 0.5s", // 애니메이션 적용
  },
};

// 슬라이드 업 애니메이션을 위한 CSS 키 프레임 정의
const slideUpAnimation = `
  @keyframes slide-up {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translateY(-50%, 0);
    }
  }
`;

export default function MyProfile() {
  const { user, isLoading, myStore } = useAuthContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPoint, setIsPoint] = useState(false);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <></>;
  } else {
    return (
      <div className="flex flex-col gap-5 max-w-lg p-2 mx-auto">
        <div className="mt-5 w-full text-left content-center p-2 flex flex-row text-xl font-semibold">
          <p className="text-pink-500">{user.nickname}</p>
          <p className="font-bold"> {"님의 회원정보"}</p>
        </div>
        <div className="rounded-xl border-slate-200 text-slate-500 p-4 shadow-xl border flex flex-col gap-4">
          <div className="flex flex-row items-center text-lg justify-between">
            <div className="flex flex-row">
              <p className="font-bold w-20">이름</p> <span className="ms-10 text-black">{user.name}</span>
            </div>
          </div>
          <div className="border-b-2 border-slate-100 w-[80%] mx-auto"></div>
          <div className="flex flex-row  items-center text-lg justify-between">
            <div className="flex flex-row justify-between">
              <p className="font-bold w-20">닉네임</p> <span className="ms-10 text-black">{user.nickname}</span>
            </div>
          </div>
          <div className="border-b-2 border-slate-100 w-[80%] mx-auto"></div>

          <div className="flex flex-row  items-center text-lg justify-between">
            <div className="flex flex-row justify-between">
              <p className="font-bold w-20">이메일</p> <span className="ms-10 text-black">{user.email}</span>
            </div>
          </div>
          <div className="border-b-2 border-slate-100 w-[80%] mx-auto"></div>

          <div className="flex flex-row  items-center text-lg justify-between">
            <div className="flex flex-row justify-between">
              <p className="font-bold w-20">전화번호</p> <span className="ms-10 text-black">{user.phoneNumber}</span>
            </div>
          </div>
          <div className="border-b-2 border-slate-100 w-[80%] mx-auto"></div>

          <div className="flex flex-row  items-center text-lg justify-between">
            <div className="flex flex-row justify-between">
              <p className="font-bold w-20">포인트</p>{" "}
              <div className="ms-10 text-black flex flex-row gap-4">
                <span>{user.point}P</span>
                <button
                  className=" text-black-300 font-bold hover:text-pink-500"
                  onClick={() => {
                    setModalIsOpen(true);
                    setIsPoint(true);
                  }}>
                  포인트 충전
                </button>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-slate-100 w-[80%] mx-auto"></div>

          <div className="flex flex-row  items-center text-lg justify-between">
            <div className="flex flex-row justify-between">
              <p className="font-bold w-20">주소</p>{" "}
              <div className="ms-10 text-black">
                {user.address && (
                  <div>
                    {JSON.parse(user.address).map((item) => {
                      return (
                        <div key={item.name}>
                          <p>{item.name}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <Button
              text={"변경"}
              onClick={() => {
                setModalIsOpen(true);
                setIsPoint(false);
              }}></Button>
          </div>
        </div>
        <div className="border-b-2 border-slate-300 mb-5"></div>
        {user.isPersonal && (
          <div>
            <h1 className="text-center text-xl font-bold w-20">{`${myStore.name}님의 가게 정보`}</h1>
            <div className="border-b-2 border-slate-300 my-5"></div>
          </div>
        )}
        {user && user.isPersonal && (
          <div>
            <Link to={`/orderlistbyadmin`} className="font-bold w-20 hover:text-pink-300">
              나의 가게 주문내역
            </Link>
          </div>
        )}
        {user && user.isAdmin && (
          <div>
            <Link to={`/admin`} className="font-bold w-20 hover:text-pink-300">
              관리자 페이지
            </Link>
          </div>
        )}
        {user && (
          <div>
            <Link to={`/orderlist`} className="font-bold w-20 hover:text-pink-300">
              나의 주문내역
            </Link>
          </div>
        )}
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
          <style>{slideUpAnimation}</style>
          <div className=""> {isPoint ? <AddPoint user={user} /> : <Signup isUpdateProfile={true} />}</div>
        </Modal>
      </div>
    );
  }
}
