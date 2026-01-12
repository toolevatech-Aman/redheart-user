// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Delivery options
// const deliveryOptions = [
//   {
//     title: "Morning Delivery",
//     price: 199,
//     slots: ["7:00 AM - 9:00 AM"],
//     note: "Delivered anytime in the selected time slot.",
//     checkAvailability: (now) => {
//       const available = now.getHours() < 20;
//       const nextAvailable = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate() + (available ? 0 : 1),
//         7,
//         0
//       );
//       return { available, nextAvailable };
//     },
//   },
//   {
//     title: "30-60 Minutes Delivery",
//     price: 69,
//     slots: ["30-60 Minutes from order"],
//     note: "Delivered quickly within the selected slot.",
//     checkAvailability: (now) => {
//       const available = now.getHours() >= 9 && now.getHours() < 19;
//       const nextAvailable = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate() + (now.getHours() >= 19 ? 1 : 0),
//         9,
//         0
//       );
//       return { available, nextAvailable };
//     },
//   },
//   {
//     title: "Standard Delivery",
//     price: 49,
//     slots: ["9:00 - 13:00", "12:00 - 15:00", "15:00 - 18:00", "18:00 - 21:00", "20:00 - 22:00"],
//     note: "Delivered anytime within the selected slot.",
//     checkAvailability: (now, slot) => {
//       const startHour = parseInt(slot.split(" - ")[0]);
//       const endHour = parseInt(slot.split(" - ")[1].split(":")[0]);
//       const available = now.getHours() < endHour;
//       const nextAvailable = available
//         ? now
//         : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, 0);
//       return { available, nextAvailable };
//     },
//   },
//   {
//     title: "Fixed Time Delivery",
//     price: 199,
//     slots: [
//       "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
//       "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
//       "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00",
//     ],
//     note: "Delivered at the exact selected time.",
//     checkAvailability: (now, slot) => {
//       const startHour = parseInt(slot.split(" - ")[0]);
//       const endHour = parseInt(slot.split(" - ")[1].split(":")[0]);
//       const available = now.getHours() < endHour;
//       const nextAvailable = available
//         ? now
//         : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, 0);
//       return { available, nextAvailable };
//     },
//   },
//   {
//     title: "Midnight Delivery",
//     price: 249,
//     slots: ["23:00 - 00:00"],
//     note: "Delivered in the midnight slot.",
//     checkAvailability: (now) => {
//       const available = now.getHours() < 21;
//       const nextAvailable = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 0);
//       return { available, nextAvailable };
//     },
//   },
// ];

// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

// const formatTime = (date) =>
//   date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// export const DeliveryModal = ({ isOpen, onClose }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [optionsWithStatus, setOptionsWithStatus] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const now = new Date();
//     const updatedOptions = deliveryOptions.map((opt) => {
//       const slotsWithStatus = opt.slots.map((slot) => {
//         const { available, nextAvailable } = opt.checkAvailability(now, slot);
//         const displaySlot = available
//   ? slot
//   : `${slot} (Next: ${nextAvailable.toLocaleString()})`;

//         return {
//           slot: displaySlot,
//           available,
//           originalSlot: slot,
//           nextAvailable,
//         };
//       });
//       return { ...opt, slotsWithStatus };
//     });
//     setOptionsWithStatus(updatedOptions);
//   }, [isOpen]);

//   const handleProceed = () => {
//     if (selectedOption && selectedSlot) {
//       const selectedDateTime = selectedSlot.nextAvailable || new Date();
//       navigate("/checkout", {
//         state: {
//           deliveryOption: {
//             title: selectedOption.title,
//             price: selectedOption.price,
//           },
//           slot: selectedSlot.originalSlot,
//           date: selectedDateTime,
//         },
//       });
//     }
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//       />

//       <div
//         className={`fixed bottom-0 left-0 w-full z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-y-0" : "translate-y-full"
//         }`}
//         style={{ height: "75vh" }}
//       >
//         <div className="bg-white rounded-t-3xl shadow-2xl h-full flex flex-col overflow-hidden">
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">Choose Delivery Slot</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//               &times;
//             </button>
//           </div>

//           <div className="overflow-y-auto p-4 flex-1 space-y-4">
//             {optionsWithStatus.map((option, idx) => (
//               <div
//                 key={idx}
//                 className={`border rounded-2xl p-4 transition-all ${
//                   option.slotsWithStatus.some((s) => s.available)
//                     ? "bg-white hover:shadow-xl cursor-pointer"
//                     : "bg-gray-100 opacity-70"
//                 }`}
//               >
//                 <div
//                   className="flex justify-between items-center mb-3 cursor-pointer"
//                   onClick={() => {
//                     setSelectedOption(option);
//                     setSelectedSlot(null);
//                   }}
//                 >
//                   <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
//                   <span className="font-bold text-red-600">{formatCurrency(option.price)}</span>
//                 </div>

//                 <p className="text-gray-500 text-sm mb-2">{option.note}</p>

//                 {selectedOption?.title === option.title && (
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {option.slotsWithStatus.map((slotObj, sidx) => (
//                       <button
//                         key={sidx}
//                         onClick={() => setSelectedSlot(slotObj)}
//                         className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
//                           ${selectedSlot?.originalSlot === slotObj.originalSlot
//                             ? "bg-red-600 text-white border-red-600"
//                             : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
//                           }`}
//                       >
//                         {slotObj.slot}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {selectedOption && selectedSlot && (
//             <div className="p-4 border-t border-gray-200">
//               <button
//                 onClick={handleProceed}
//                 className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 font-semibold text-lg transition"
//               >
//                 Proceed
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Delivery options
const deliveryOptions = [
  {
    title: "Morning Delivery",
    price: 199,
    slots: ["7:00 AM - 9:00 AM"],
    note: "Your gift will be delivered anytime in between the selected time slot.",
    checkAvailability: (now, slot, isToday) => {
      if (!isToday) return { available: true, nextAvailable: new Date(now) };
      const available = now.getHours() < 18; // Not after 6 PM
      const nextAvailable = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (available ? 0 : 1),
        7,
        0
      );
      return { available, nextAvailable };
    },
  },
  {
    title: "30-60 Minutes Delivery",
    price: 69,
    slots: ["30-60 Minutes from order"],
    note: "Your gift will be delivered quickly within the selected slot.",
    checkAvailability: (now, slot, isToday) => {
      if (!isToday) return { available: true, nextAvailable: new Date(now) };
      const available = now.getHours() >= 9 && now.getHours() < 19;
      const nextAvailable = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (now.getHours() >= 19 ? 1 : 0),
        9,
        0
      );
      return { available, nextAvailable };
    },
  },
  {
    title: "Standard Delivery",
    price: 49,
    slots: ["9:00 - 13:00", "12:00 - 15:00", "15:00 - 18:00", "18:00 - 21:00", "20:00 - 22:00"],
    note: "Your gift will be delivered anytime in between the selected time slot.",
    checkAvailability: (now, slot, isToday) => {
      if (!isToday) return { available: true, nextAvailable: new Date(now) };
      const startHour = parseInt(slot.split(" - ")[0]);
      const endHour = parseInt(slot.split(" - ")[1].split(":")[0]);
      const available = now.getHours() < endHour - 2; // 2-hour buffer
      const nextAvailable = available
        ? now
        : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, 0);
      return { available, nextAvailable };
    },
  },
  {
    title: "Fixed Time Delivery",
    price: 199,
    slots: [
      "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
      "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
      "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00",
    ],
    note: "Your gift will be delivered at the exact selected time.",
    checkAvailability: (now, slot, isToday) => {
      if (!isToday) return { available: true, nextAvailable: new Date(now) };
      const endHour = parseInt(slot.split(" - ")[1].split(":")[0]);
      const available = now.getHours() < endHour && now.getHours() < 21; // Not after 9 PM
      const nextAvailable = available
        ? now
        : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, parseInt(slot.split(" - ")[0]), 0);
      return { available, nextAvailable };
    },
  },
  {
    title: "Midnight Delivery",
    price: 249,
    slots: ["23:00 - 00:00"],
    note: "Your gift will be delivered in the midnight slot.",
    checkAvailability: (now, slot, isToday) => {
      if (!isToday) return { available: true, nextAvailable: new Date(now) };
      const available = now.getHours() < 21; // Not after 9 PM
      const nextAvailable = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 0);
      return { available, nextAvailable };
    },
  },
];

// Helpers
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

export const DeliveryModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [optionsWithStatus, setOptionsWithStatus] = useState([]);
  const [isToday, setIsToday] = useState(true);
  const navigate = useNavigate();

  // Update delivery options whenever date changes or modal opens
// useEffect(() => {
//   const now = new Date();
//   const isCurrentDay = selectedDate.toDateString() === now.toDateString();
//   setIsToday(isCurrentDay);

//   const updatedOptions = deliveryOptions.map((opt) => {
//     const slotsWithStatus = opt.slots.map((slot) => {
//       // Pass selectedDate instead of now
//       const checkDate = isCurrentDay ? now : selectedDate;
//       const { available, nextAvailable } = opt.checkAvailability(checkDate, slot, isCurrentDay);
//       return {
//         slot: available ? slot : `${slot} (Next: ${nextAvailable.toLocaleString()})`,
//         available,
//         originalSlot: slot,
//         nextAvailable,
//       };
//     });
//     return { ...opt, slotsWithStatus };
//   });

//   setOptionsWithStatus(updatedOptions);
//   setSelectedOption(null);
//   setSelectedSlot(null);
// }, [selectedDate, isOpen]);
useEffect(() => {
  const now = new Date();
  const isCurrentDay = selectedDate.toDateString() === now.toDateString();
  setIsToday(isCurrentDay);

  const updatedOptions = deliveryOptions.map((opt) => {
    const slotsWithStatus = opt.slots.map((slot) => {
      // Check availability only for today
      const checkDate = isCurrentDay ? now : selectedDate;
      const { available } = opt.checkAvailability(checkDate, slot, isCurrentDay);
      return {
        slot,              // just the slot, no "Next" text
        available,         
        originalSlot: slot
      };
    });
    return { ...opt, slotsWithStatus };
  });

  setOptionsWithStatus(updatedOptions);
  setSelectedOption(null);
  setSelectedSlot(null);
}, [selectedDate, isOpen]);

  // Proceed to checkout
  const handleProceed = () => {
    if (selectedOption && selectedSlot) {
      const selectedDateTime = selectedSlot.nextAvailable || selectedDate;
      navigate("/checkout", {
        state: {
          deliveryOption: {
            title: selectedOption.title,
            price: selectedOption.price,
          },
          slot: selectedSlot.originalSlot,
          date: selectedDateTime,
        },
      });
    }
  };

  return (
    // <>
    //   {/* Backdrop */}
    //   <div
    //     className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
    //       isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    //     }`}
    //     onClick={onClose}
    //   />

    //   {/* Modal */}
    //   <div
    //     className={`fixed bottom-0 left-0 w-full z-50 transform transition-transform duration-300 ${
    //       isOpen ? "translate-y-0" : "translate-y-full"
    //     }`}
    //     style={{ height: "80vh" }}
    //   >
    //     <div className="bg-white rounded-t-3xl shadow-2xl h-full flex flex-col overflow-hidden">
    //       {/* Header */}
    //       <div className="flex justify-between items-center p-4 border-b border-gray-200">
    //         <h2 className="text-xl font-bold text-gray-900">Choose Delivery Slot</h2>
    //         <button
    //           onClick={onClose}
    //           className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
    //         >
    //           &times;
    //         </button>
    //       </div>

    //       {/* Date Selector */}
    //       <div className="p-4 border-b border-gray-200 flex items-center gap-4">
    //         <button
    //           onClick={() => setSelectedDate(new Date())}
    //           className={`px-4 py-2 rounded-full font-medium transition ${
    //             isToday ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
    //           }`}
    //         >
    //           Today
    //         </button>

    //         <DatePicker
    //           selected={selectedDate}
    //           onChange={(date) => setSelectedDate(date)}
    //           minDate={new Date()}
    //           className="px-4 py-2 border rounded-full w-40 text-center"
    //           placeholderText="Select Date"
    //         />
    //       </div>

    //       {/* Delivery Options */}
    //       <div className="overflow-y-auto p-4 flex-1 space-y-4">
    //         {optionsWithStatus.map((option, idx) => (
    //           <div
    //             key={idx}
    //             className={`border rounded-2xl p-4 transition-all ${
    //               option.slotsWithStatus.some((s) => s.available)
    //                 ? "bg-white hover:shadow-xl cursor-pointer"
    //                 : "bg-gray-100 opacity-70"
    //             }`}
    //           >
    //             <div
    //               className="flex justify-between items-center mb-3 cursor-pointer"
    //               onClick={() => {
    //                 setSelectedOption(option);
    //                 setSelectedSlot(null);
    //               }}
    //             >
    //               <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
    //               <span className="font-bold text-red-600">{formatCurrency(option.price)}</span>
    //             </div>

    //             <p className="text-gray-500 text-sm mb-2">{option.note}</p>

    //             {/* Slots */}
    //             {selectedOption?.title === option.title && (
    //               <div className="flex flex-wrap gap-3 mt-2">
    //                 {option.slotsWithStatus.map((slotObj, sidx) => (
    //                   <button
    //                     key={sidx}
    //                     onClick={() => setSelectedSlot(slotObj)}
    //                     disabled={!slotObj.available}
    //                     className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
    //                       ${selectedSlot?.originalSlot === slotObj.originalSlot
    //                         ? "bg-red-600 text-white border-red-600"
    //                         : slotObj.available
    //                         ? "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
    //                         : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
    //                       }`}
    //                   >
    //                     {slotObj.slot}
    //                   </button>
    //                 ))}
    //               </div>
    //             )}
    //           </div>
    //         ))}
    //       </div>

    //       {/* Proceed Button */}
    //       {selectedOption && selectedSlot && (
    //         <div className="p-4 border-t border-gray-200">
    //           <button
    //             onClick={handleProceed}
    //             className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 font-semibold text-lg transition"
    //           >
    //             Proceed
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </>
    <>
  {/* Backdrop */}
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
    onClick={onClose}
  />

  {/* Modal */}
  <div
    className={`fixed bottom-0 left-0 w-full z-50 transform transition-transform duration-300 ${
      isOpen ? "translate-y-0" : "translate-y-full"
    }`}
    style={{ height: "80vh" }}
  >
    <div className="bg-white rounded-t-3xl shadow-xl h-full flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Choose Delivery Slot</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-3xl font-bold transition-colors"
        >
          &times;
        </button>
      </div>

      {/* Date Selector */}
      <div className="p-5 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => setSelectedDate(new Date())}
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            isToday
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Today
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          className="px-4 py-2 border rounded-full w-40 text-center text-gray-700 shadow-sm hover:shadow-md transition"
          placeholderText="Select Date"
        />
      </div>

      {/* Delivery Options */}
      <div className="overflow-y-auto p-5 flex-1 flex flex-col gap-4">
        {optionsWithStatus.map((option, idx) => (
          <div
            key={idx}
            className={`border rounded-2xl p-5 transition-all ${
              option.slotsWithStatus.some((s) => s.available)
                ? "bg-white hover:shadow-lg cursor-pointer"
                : "bg-gray-50 opacity-80"
            }`}
          >
            <div
              className="flex justify-between items-center mb-3 cursor-pointer"
              onClick={() => {
                setSelectedOption(option);
                setSelectedSlot(null);
              }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
              <span className="font-bold text-red-600">{formatCurrency(option.price)}</span>
            </div>

            <p className="text-gray-500 text-sm mb-2">{option.note}</p>

            {/* Slots */}
            {selectedOption?.title === option.title && (
              <div className="flex flex-wrap gap-3 mt-3">
                {option.slotsWithStatus.map((slotObj, sidx) => (
                  <button
                    key={sidx}
                    onClick={() => setSelectedSlot(slotObj)}
                    disabled={!slotObj.available}
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition-all
                      ${selectedSlot?.originalSlot === slotObj.originalSlot
                        ? "bg-red-600 text-white border-red-600 shadow-md"
                        : slotObj.available
                        ? "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:shadow-sm"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      }`}
                  >
                    {slotObj.slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proceed Button */}
      {selectedOption && selectedSlot && (
        <div className="p-5 border-t border-gray-100">
          <button
            onClick={handleProceed}
            className="w-full bg-red-600 text-white py-4 rounded-2xl hover:bg-red-700 font-semibold text-lg shadow-md transition"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  </div>
</>

  );
};
