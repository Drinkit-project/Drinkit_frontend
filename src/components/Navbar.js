import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Cookies from "js-cookie";
import Login from "./Login";
import Signup from "./Signup";
import CartButton from "./CartButton";
import _debounce from "lodash/debounce";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const cardStyles = {
  zIndex: "1100",
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    maxWidth: "450px",
    position: "absolute",
    height: "450px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
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

Modal.setAppElement("#root"); // App 요소 설정

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("AccessToken"));
  const [refreshToken, setRefreshToken] = useState(Cookies.get("RefreshToken"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSignupLogIn, setIsSignupLogIn] = useState("login");
  const [text, setText] = useState("");
  const [searchValue, setSearchValue] = useState([]);
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(Cookies.get("AccessToken"));

  useEffect(() => {
    console.log("토큰 이펙트");
    const storedToken = Cookies.get("AccessToken");
    setRefreshToken(Cookies.get("RefreshToken"));
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (text !== "") {
      const debouncedSendRequest = _debounce(() => {
        const openSearch = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVERURL}/open-search?keyword=${text}`, {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              const data = await response.data;
              console.log(data);
              setSearchValue(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        openSearch();
      }, 800);
      debouncedSendRequest();

      return () => {
        debouncedSendRequest.cancel();
      };
    }
  }, [text]);

  const newText = (value) => {
    setText(value);
    if (!value) {
      setSearchValue([]);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <header className="flex max-w-4xl mx-auto justify-between p-3 titleFont">
      {/* <div className="w-32">
        <button onClick={goBack} className="text-3xl text-center mx-auto py-1 px-2 rounded-xl font-bold text-pink-300 hover:text-pink-500">
          <MdArrowBackIos />
        </button>
      </div> */}
      <div className="flex flex-row items-center gap-4 text-xl">
        <Link to={"/"} className="flex text-4xl text-pink-500 font-bold ">
          <h1>Drin!t</h1>
        </Link>
        <div>
          <Link className="text-black-300 hover:text-pink-500 font-mono font-bold" to={"/subscribes"}>
            구독
          </Link>
        </div>
        <div>
          <Link className="text-black-300 hover:text-pink-500 font-mono font-bold" to={"/chatList"}>
            같이술
          </Link>
        </div>
      </div>
      <div className=" flex justify-end items-center gap-2">
        <div className="hidden absolute right-[30%] sm:block">
          <div className="flex flex-row items-center">
            <input placeholder="검색어 입력" className=" placeholder:text-gray-500 p-2 w-52 border rounded-lg border-pink-300" value={text} onChange={(e) => newText(e.target.value)}></input>
          </div>
        </div>
        <div style={cardStyles} className="absolute hidden sm:block right-[30%] top-[54px]">
          {searchValue.length > 0 && text && (
            <div className="w-52 border border-pink-300 bg-white rounded-md flex flex-col shadow-md">
              {searchValue.map((item) => {
                return (
                  <div
                    className="cursor-pointer hover:bg-slate-200 rounded-md"
                    onClick={() => {
                      newText("");
                      navigate(`/products/${item._source.id}`);
                    }}>
                    <p className=" p-2" key={item._source.id}>
                      {item._source.productName}
                    </p>
                    <div className="border-b"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <Link to="/posts">Post</Link> */}
        {user ? (
          <Link className="text-black-300 text-pink-300 font-semibold hover:text-pink-500" to="/profile">
            {user.nickname + " 님 >"}
          </Link>
        ) : (
          <button
            className="text-black-300 hover:text-pink-500 font-thin"
            onClick={() => {
              setModalIsOpen(true);
              setIsSignupLogIn("signup");
            }}>
            회원가입
          </button>
        )}
        {user ? (
          <button
            className="text-black-300 hover:text-pink-500 font-mono font-bold"
            onClick={() => {
              Cookies.remove("AccessToken");
              Cookies.remove("RefreshToken");
              window.location.reload();
            }}>
            로그아웃
          </button>
        ) : (
          <button
            className="text-black-300 hover:text-pink-500"
            onClick={() => {
              setModalIsOpen(true);
              setIsSignupLogIn("login");
            }}>
            로그인
          </button>
        )}
        <CartButton />
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <style>{slideUpAnimation}</style>
        <div className="">{isSignupLogIn === "login" ? <Login /> : <Signup />}</div>
      </Modal>
    </header>
  );
}
