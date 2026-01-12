import React, { useState, useEffect } from "react";
import { FiX, FiSave, FiPlus, FiEdit, FiTrash } from "react-icons/fi";

export const SavedAddressesModal = ({
  addresses,
  editingAddress,
  isAddingNew,
  setEditingAddress,
  setIsAddingNew,
  onSaveAddress,
  onDelete,
  onClose,
}) => {
  const [addressForm, setAddressForm] = useState({});

  useEffect(() => {
    if (editingAddress) setAddressForm(editingAddress);
    else if (isAddingNew) setAddressForm({ ...defaultAddress });
    else setAddressForm({});
  }, [editingAddress, isAddingNew]);

  const handleEditClick = (addr) => {
    setEditingAddress(addr);
    setIsAddingNew(false);
  };

  const handleAddNewClick = () => {
    setEditingAddress(null);
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (!addressForm.street || !addressForm.city || !addressForm.postalCode) {
      alert("Please fill required fields");
      return;
    }
    onSaveAddress(addressForm);
  };

  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <h2 className="font-display text-2xl font-light text-black-charcoal">
            Saved Addresses
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Address List */}
        <div className="space-y-4 mb-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="border border-grey-200 p-4 rounded-lg flex justify-between items-start gap-4"
            >
              <div>
                <p className="font-body text-sm font-light text-black-charcoal">
                  {(addr.label || "home").charAt(0).toUpperCase() + (addr.label || "home").slice(1)}{" "}
                  {addr.isDefault && "(Default)"}
                </p>

                <p className="font-body text-xs text-grey-600 font-light">
                  {addr.street}, {addr.city}, {addr.state} {addr.postalCode},{" "}
                  {addr.country}
                </p>
                {addr.phone && (
                  <p className="font-body text-xs text-grey-600 font-light">
                    Phone: {addr.phone}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(addr)}
                  className="p-2 bg-grey-50 hover:bg-grey-100 rounded-full transition-colors duration-300"
                >
                  <FiEdit className="w-4 h-4 text-grey-600" />
                </button>
                <button
                  onClick={() => onDelete(addr._id)}
                  className="p-2 bg-grey-50 hover:bg-grey-100 rounded-full transition-colors duration-300"
                >
                  <FiTrash className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {(editingAddress || isAddingNew) && (
          <div className="border-t border-grey-200 pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-1">
                  Label
                </label>
                <select
                  value={addressForm.label}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, label: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault || false}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, isDefault: e.target.checked })
                  }
                  className="w-4 h-4 accent-accent-rose-600"
                />
                <label className="font-body text-sm font-light text-black-charcoal">
                  Set as default
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street"
                value={addressForm.street || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, street: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
              <input
                type="text"
                placeholder="City"
                value={addressForm.city || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="State"
                value={addressForm.state || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={addressForm.postalCode || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, postalCode: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
              <input
                type="text"
                placeholder="Country"
                value={addressForm.country || "India"}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone"
                value={addressForm.phone || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FiSave className="w-4 h-4" /> Save Address
            </button>
          </div>
        )}

        {!editingAddress && !isAddingNew && (
          <button
            onClick={handleAddNewClick}
            className="w-full mt-4 px-4 py-3 border border-accent-rose-600 hover:bg-accent-rose-50 text-accent-rose-600 font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add New Address
          </button>
        )}
      </div>
    </div>
  );
};
const defaultAddress = {
  label: "home",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  phone: "",
  isDefault: false,
};      