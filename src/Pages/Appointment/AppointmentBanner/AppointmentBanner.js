import React from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";
import PasswordGenerator from "../../../components/PasswordGenerator/PasswordGenerator";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header
      className="bg-contain bg-no-repeat my-10 lg:py-48"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse justify-around gap-6">
          <img
            src={chair}
            className="rounded-lg lg:w-1/2 shadow-lg"
            alt="dentist chair"
          />
          <div className="shadow-lg rounded-xl bg-white">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
      </div>
      <PasswordGenerator></PasswordGenerator>
    </header>
  );
};

export default AppointmentBanner;
