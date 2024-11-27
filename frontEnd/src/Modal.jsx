/* eslint-disable react/prop-types */
import React from "react";
import "./Modal.css"; // We'll style the modal in this file

const Modal = ({
  isOpen,
  closeModal,
  userData,
  handleSubmit,
  handleChange,
  userBtn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <h2>{userBtn}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the name"
            autoComplete="off"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter the email"
            autoComplete="off"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Enter the age"
            autoComplete="off"
            name="age"
            // eslint-disable-next-line react/prop-types
            value={userData.age}
            onChange={handleChange}
          />
          <button type="submit">{userBtn}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
