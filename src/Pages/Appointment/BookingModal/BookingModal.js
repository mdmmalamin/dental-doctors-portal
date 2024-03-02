import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  // treatment is just another name of appointmentOption
  const { name, slots, price } = treatment;
  // console.log(treatment);
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);
  // console.log(user);
  const today = format(new Date(), "PP");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // SignIn with Phone Number Start
  const { recaptcha, signInPhone } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [logger, setLogger] = useState(null);
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = async () => {
    try {
      let recaptchaVerifier = await recaptcha("recaptchaId", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      });
      let confirmation = await signInPhone(phone, recaptchaVerifier);
      console.log(confirmation);
      setLogger(confirmation);
      setShowOtp(true);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    await logger.confirm(otp);
  };

  // SignIn with Phone Number End

  const handleBooking = (event, data) => {
    console.log("handleSignUp:", data);

    event.preventDefault();
    const form = event.target;
    const patient_name = form.name.value;
    const slot = form.slot.value;
    const email = form.email.value;
    const phone = form.phone.value;
    generatePassword();
    console.log(password);

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
          onSubmit={handleSubmit(handleBooking)}
          className="grid grid-cols-1 gap-3 md:gap-6"
        >
          <input
            type="text"
            disabled
            value={date}
            className="input input-bordered w-full"
          />
          {/* <div className="form-control w-full max-w-xs my-2">
                            <input type="text" 
                                placeholder="Full Name"
                                {...register("name", {
                                    required: "Name is required!",
                                    pattern: { value: /^[a-zA-Z\- & .]+$/g, message: "Name not validate"},
                            })} 
                                className="input input-bordered w-full" />
                            {errors.name && <p role="alert" className='text-red-600 text-sm mx-2 my-1'>{errors.name?.message}</p>}
                        </div> */}
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
            required
            pattern="^[a-zA-Z\- & .]+$"
            readOnly={user?.displayName}
            defaultValue={user?.displayName}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            name="email"
            type="email"
            required
            readOnly={user?.email}
            defaultValue={user?.email}
            placeholder="Email Address"
            className="input input-bordered w-full"
          />

          {showOtp ? (
            // Phone Login Start
            <>
              <input
                name="otp"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="input input-bordered w-full"
              />
              <button className="btn" onClick={verifyOtp}>
                Confirm OTP
              </button>
            </>
          ) : (
            <>
              <input
                name="phone"
                type="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <button className="btn" onClick={sendOtp}>
                Send OTP
              </button>
            </>
          )}
          <input
            type="submit"
            value="Submit"
            className="btn btn-accent w-full"
          />

          <div id="recaptchaId"></div>
        </form>
      </div>
    </div>
  </>
);

export default BookingModal;
