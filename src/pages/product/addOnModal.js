import React, { useState } from "react";

const AddOnModal = ({ isOpen, onClose, addOnData = [], onProceed }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  if (!isOpen) return null;

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a._id === addon._id);
      if (exists) return prev.filter((a) => a._id !== addon._id);

      return [
        ...prev,
        {
          _id: addon._id,
          name: addon.name,
          selling_price: addon.sellingPrice,
          quantity: 1,
          image_url: addon.image,
        },
      ];
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-end">
      {/* Modal */}
      <div
        className="
          bg-white w-full
          max-h-[85vh]
          rounded-t-3xl
          flex flex-col
        "
      >
        {/* HEADER (fixed) */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Enhance Your Gift 🎁</h2>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-red-500"
          >
            Skip
          </button>
        </div>

        {/* SCROLL AREA (IMPORTANT PART) */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div
            className="
              grid gap-4
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-5
            "
          >
            {addOnData.map((addon) => {
              const isSelected = selectedAddOns.some(
                (a) => a._id === addon._id
              );

              return (
                <div
                  key={addon._id}
                  className="
                    relative rounded-xl border bg-white
                    transition hover:shadow-md
                  "
                >
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="h-28 w-full rounded-t-xl object-cover"
                  />

                  <div className="p-2">
                    <p className="text-sm font-medium line-clamp-2">
                      {addon.name}
                    </p>
                    <p className="text-sm font-bold text-red-600">
                      ₹{addon.sellingPrice}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleAddOn(addon)}
                    className={`
                      absolute top-2 right-2 h-7 w-7 rounded-full
                      flex items-center justify-center font-bold
                      ${
                        isSelected
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-700 border"
                      }
                    `}
                  >
                    {isSelected ? "✓" : "+"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER (fixed) */}
        <div className="p-4 border-t">
          <button
            onClick={() => onProceed(selectedAddOns)}
            disabled={selectedAddOns.length === 0}
            className="
              w-full rounded-xl bg-red-600 py-3
              text-white font-semibold
              disabled:opacity-40
            "
          >
            Proceed {selectedAddOns.length > 0 && `(${selectedAddOns.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOnModal;
