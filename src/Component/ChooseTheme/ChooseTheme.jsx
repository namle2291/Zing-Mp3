import React from "react";

import Modal from "react-bootstrap/Modal";

import { useSelector, useDispatch } from "react-redux";

import { themes } from "../../data/dataThemeFull";
import "./ChooseTheme.module.scss";
import { setThemes } from "../../features/setTheme/themeSetFeatures";

function ChooseTheme({ show, handleClose }) {
  const dispatch = useDispatch();

  const handleChangeThem = (item) => {
    dispatch(setThemes(item));
  };

  return (
    <>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn giao diện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowY: "scroll", height: "500px" }}>
            {themes &&
              themes.map((theme, index) => (
                <div key={index} className="row mb-3 mx-0 cursor-pointer">
                  <div className="col-12">
                    <h5 className="fw-semibold">{theme.title}</h5>
                  </div>
                  <div className="col-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {theme.items.map((item, index) => {
                        return (
                          <div>
                            <div
                              onClick={() => handleChangeThem(item)}
                              key={index}
                              className="rouded-md overflow-hidden w-[110px] h-[73px]"
                            >
                              <img
                                className="w-full h-full object-cover"
                                src={item.itemS}
                                alt=""
                              />
                            </div>
                            <div className="text-[13px] line-clamp-1">{item.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ChooseTheme;
