import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  fetchAuth,
  setEmail,
  setPassword,
} from "../../features/setAuth/setAuth";

import LoadingCircle from "../../Component/Loading/LoadingCircle";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, loading, token } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = () => {
    if (email && password !== "") {
      const payload = {
        email,
        password,
      };
      dispatch(
        fetchAuth({
          type: "login",
          payload,
        })
      );
    } else {
      toast.warn("tài khoản hoặc mật khẩu không bỏ trống!");
    }
    dispatch(clearData());
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div
      className="max-w-[500px] rounded-md py-5 px-4 mx-auto flex flex-col gap-2"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      <h5 className="text-center text-[var(--text-primary)]">Đăng nhập</h5>
      <div className="flex flex-col gap-1">
        <label className="text-[14px] text-[var(--text-primary)]">Email</label>
        <input
          type="text"
          className="border-none outline-none bg-transparent p-2 text-[14px]"
          style={{
            color: "var(--text-primary)",
            border: "1px solid var(--sidebar-bg)",
          }}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[14px] text-[var(--text-primary)]">
          Mật khẩu
        </label>
        <input
          type="password"
          className="border-none outline-none bg-transparent p-2 text-[14px] text-[var(--text-primary)]"
          style={{
            border: "1px solid var(--sidebar-bg)",
          }}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
      </div>
      <div
        className="text-center mt-3 py-2 cursor-pointer hover:bg-[var(--alpha-bg)] bg-[var(--layout-bg)]"
        onClick={handleSubmit}
      >
        <button className="text-[14px] text-[var(--text-primary)]">
          {loading && <LoadingCircle />}
          {!loading && "Đăng nhập"}
        </button>
      </div>
      <div className="text-center text-[13px] text-[var(--text-primary)]">
        Chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
      </div>
    </div>
  );
}
