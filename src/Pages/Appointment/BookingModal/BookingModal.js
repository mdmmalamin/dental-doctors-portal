import { format } from "date-fns";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext, auth } from "../../../contexts/AuthProvider";
import PhoneInput from "react-phone-input-2";
import OTPInput from "otp-input-react";
import "./BookingModal..css";
import { CgSpinner } from "react-icons/cg";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  // otp related
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  //   captch verify
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        // auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // treatment is just another name of appointmentOption
  const { name, slots, price } = treatment;
  // console.log(treatment);
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);
  // console.log(user);
  const today = format(new Date(), "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const patient_name = form.name.value;
    const slot = form.slot.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      bookingDate: today,
      appointmentDate: date,
      treatment: name,
      patient: patient_name,
      slot,
      email,
      phone,
      price,
    };
    // TODO: send data to the server
    // and once data is saved then close the modal display success toast
    console.log(booking);

    fetch("https://doctors-portal-server-kappa-sooty.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking confirmed");

          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-12">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 md:gap-6"
          >
            <input
              type="text"
              disabled
              value={date}
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <input
              name="name"
              type="text"
              readOnly={user?.displayName}
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              name="email"
              type="email"
              readOnly={user?.email}
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            {/* <input
              name="phone"
              type="Phone"
              defaultValue={user?.phoneNumber}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            /> */}

            {/* otp related input */}

            <div>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div className="recaptcha-container"></div>
              {!user ? (
                <div className="text-center">
                  <h1 className="text-4xl font-bold">Login Successful</h1>
                </div>
              ) : (
                <>
                  {showOtp ? (
                    <div className="bg-gray-600/30 py-2">
                      <h1 className="text-center font-bold pb-2">
                        Write Your OTP
                      </h1>
                      <OTPInput
                        name="otp"
                        value={otp}
                        onChange={setOtp}
                        className="flex justify-center items-center otp-container text-black"
                        OTPLength={6}
                        otpType="number"
                        autoFocus
                        disabled={false}
                      ></OTPInput>
                      <div className="flex justify-center items-center my-2">
                        <label className="btn border-none text-white bg-gradient-to-r from-primary to-secondary">
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}

                          <span> Verify OTP</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-600/30 py-2">
                      <h1 className="text-center font-bold pb-2">
                        Write Your Phone Number
                      </h1>
                      <div className="w-full flex justify-center items-center">
                        <PhoneInput
                          className="mx-20"
                          country={"in"}
                          value={phone}
                          onChange={setPhone}
                        ></PhoneInput>
                      </div>
                      <div
                        onClick={onSignup}
                        className="flex justify-center items-center my-2"
                      >
                        <label className="btn border-none mt-2 text-white bg-gradient-to-r from-primary to-secondary">
                          <span> Send Code Via SMS</span>
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
