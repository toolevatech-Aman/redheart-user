import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiLogOut,
  FiPackage,
  FiArrowRight,
  FiMapPin,
  FiHome,
  FiBriefcase,
  FiBuilding, // <-- use this for work addresses
  FiTrash2,
  FiX,
  FiShoppingBag
} from "react-icons/fi";

import {
  GetUser,
  UpdateUser,
  UpdateAddress,

  DeleteAddress
} from "../../service/user"; // your api helpers
import { formatDate, getOrderStatusColor } from "../../utils/utils";
import { message } from "../../comman/toaster-message/toasterMessage";


const MyAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: ""
  });

  const [showAddresses, setShowAddresses] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Fetch user data on mount
  const fetchUser = async () => {
    try {
      const res = await GetUser();
      setUser(res.user);
      setOrders(res.orders || []);
      setSavedAddresses(res.user.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Save profile (name, email, phone, dob)
  const handleSaveProfile = async () => {
    try {
      const payload = {
        name: `${profileForm.firstName} ${profileForm.lastName}`,
        email: profileForm.email,
        phone: profileForm.phone,
        dateOfBirth: profileForm.dateOfBirth
      };
      await UpdateUser(payload);
      fetchUser();
      setShowEditProfile(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Save or update address
  const handleSaveAddress = async (addressForm) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (addressForm._id) {
      // Update existing
      await UpdateAddress(addressForm.id, addressForm);
    } else {
      // Add new address
      let newAddresses = [...(user.addresses || [])];

      // Handle default address
      if (addressForm.isDefault) {
        newAddresses = newAddresses.map(addr => ({ ...addr, isDefault: false }));
      }

      newAddresses.push(addressForm);

      await UpdateUser({ addresses: newAddresses });
    }

    fetchUser();
    setEditingAddress(null);
  } catch (err) {
    console.error("Save Address Error:", err);
  }
};


  // Delete address
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await DeleteAddress(addressId);
      fetchUser();
    } catch (err) {
      console.error(err);
    }
  };

  // Sign out (dummy)
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-grey-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal tracking-tight mb-2">
            My Account
          </h1>
          <p className="font-body text-sm sm:text-base text-grey-600 font-light">
            Manage your profile, orders, and addresses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Profile & Actions */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-rose-100 to-accent-pink-100 rounded-full flex items-center justify-center border-2 border-accent-rose-200">
                  <FiUser className="w-8 h-8 text-accent-rose-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal mb-1">
                    {user.name || user.firstName || "User"}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light">
                    {user.email || user.phone || "No contact info"}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3 border-t border-grey-200 pt-4">
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">{user.phone}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">{user.email}</span>
                  </div>
                )}
                {user.dateOfBirth && (
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">
                      DOB: {formatDate(user.dateOfBirth)}
                    </span>
                  </div>
                )}
                {user.createdAt && (
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">
                      Member since {formatDate(user.createdAt)}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setProfileForm({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    dateOfBirth: user.dateOfBirth || ""
                  });
                  setShowEditProfile(true);
                }}
                className="w-full mt-4 px-4 py-2.5 border border-grey-200 hover:border-accent-rose-600 text-accent-rose-600 font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <h3 className="font-display text-base sm:text-lg font-light text-black-charcoal mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full flex items-center justify-between p-3 hover:bg-grey-50 rounded-lg transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <FiPackage className="w-5 h-5 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" />
                    <span className="font-body text-sm font-light text-black-charcoal">View All Orders</span>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-grey-400 group-hover:text-accent-rose-600 group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button
                  onClick={() => setShowAddresses(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-grey-50 rounded-lg transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <FiMapPin className="w-5 h-5 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" />
                    <span className="font-body text-sm font-light text-black-charcoal">
                      Saved Addresses ({savedAddresses.length})
                    </span>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-grey-400 group-hover:text-accent-rose-600 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant"
            >
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Right Column - Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal flex items-center gap-2">
                  <FiShoppingBag className="w-5 h-5 text-accent-rose-600" />
                  Recent Orders
                </h2>
                {orders.length > 0 && (
                  <button
                    onClick={() => navigate("/orders")}
                    className="font-body text-sm text-accent-rose-600 hover:text-accent-rose-700 font-light transition-colors duration-300 flex items-center gap-1"
                  >
                    View All
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <FiPackage className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                  <p className="font-display text-lg font-light text-black-charcoal mb-2">No orders yet</p>
                  <p className="font-body text-sm text-grey-600 font-light mb-6">Start shopping to see your orders here</p>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="border border-grey-200 p-4 sm:p-5 hover:border-grey-300 transition-colors duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-display text-sm font-light text-black-charcoal">
                              Order #{order.orderNumber || order.id}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-body font-light rounded-full ${getOrderStatusColor(order.status)}`}>
                              {order.status || "Processing"}
                            </span>
                          </div>
                          <p className="font-body text-xs text-grey-600 font-light mb-1">{formatDate(order.orderDate || order.createdAt)}</p>
                          <p className="font-body text-sm text-black-charcoal font-light">
                            {order.items?.length || 0} {order.items?.length === 1 ? "item" : "items"} • ${order.total?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/orders?orderId=${order.id}`)}
                          className="px-4 py-2 border border-grey-200 hover:border-accent-rose-600 text-accent-rose-600 font-body text-xs font-light rounded-full transition-colors duration-300 whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {/* Saved Addresses Modal */}
      {showAddresses && (
        <SavedAddressesModal
          addresses={savedAddresses}
          onEdit={(address) => setEditingAddress(address)}
          onDelete={handleDeleteAddress}
          onAdd={() => setEditingAddress({})}
          onClose={() => {
            setShowAddresses(false);
            setEditingAddress(null);
          }}
          editingAddress={editingAddress}
          onSaveAddress={handleSaveAddress}
        />
      )}
    </div>
  );
};

// Edit Profile Modal Component
const EditProfileModal = ({ profileForm, setProfileForm, onSave, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <h2 className="font-display text-2xl font-light text-black-charcoal">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                First Name <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Last Name <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm font-light text-black-charcoal mb-2">
              Email <span className="text-accent-rose-600">*</span>
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-light text-black-charcoal mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={profileForm.dateOfBirth || ""} // fallback to empty string
              onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
              className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              placeholder="Date of Birth"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-light text-black-charcoal mb-2">
              Phone Number <span className="text-accent-rose-600">*</span>
            </label>
            <input
              type="tel"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-grey-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-grey-100 hover:bg-grey-200 text-black-charcoal font-body text-sm font-light rounded-full transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const SavedAddressesModal = ({
  addresses = [],
  onSaveAddress, // function to add/update address
  onDelete,      // function to delete address
  onClose,
}) => {
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: "home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
    isDefault: false,
  });

  // Load address into form when editing
  useEffect(() => {
    if (editingAddress) {
      setAddressForm(editingAddress);
    } else {
      setAddressForm({
        label: "home",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        phone: "",
        isDefault: false,
      });
    }
  }, [editingAddress]);

  const handleSave = () => {
    if (!addressForm.street || !addressForm.city || !addressForm.postalCode) {
      message.error("Please fill in all required fields");
      return;
    }
    onSaveAddress(addressForm);
    setEditingAddress(null);
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <h2 className="font-display text-2xl font-light text-black-charcoal">
            {editingAddress ? "Edit Address" : "Saved Addresses"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* List of saved addresses */}
        {!editingAddress && (
          <div className="space-y-4">
            {addresses.length === 0 && (
              <p className="text-center text-grey-600">No saved addresses</p>
            )}
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="border border-grey-200 p-4 rounded flex justify-between items-start hover:border-grey-300 transition-colors duration-300"
              >
                <div>
                  <p className="font-body text-sm font-medium text-black-charcoal">
                    {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                  <p className="font-body text-sm text-grey-700">{addr.country}</p>
                  {addr.phone && (
                    <p className="font-body text-sm text-grey-700">Phone: {addr.phone}</p>
                  )}
                  <span className="px-2 py-0.5 bg-grey-100 text-xs text-grey-600 rounded">
                    {addr.label} {addr.isDefault && "(Default)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="p-2 text-grey-400 hover:text-accent-rose-600 rounded-full"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(addr._id)}
                    className="p-2 text-grey-400 hover:text-accent-rose-600 rounded-full"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddNew}
              className="mt-4 px-4 py-2 bg-accent-rose-600 hover:bg-accent-rose-700 text-white rounded-full text-sm font-medium"
            >
              + Add New Address
            </button>
          </div>
        )}

        {/* Add / Edit Form */}
        {editingAddress !== null && (
          <div className="space-y-5">
            {/* Street */}
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Street <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={addressForm.street}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, street: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            {/* City / State / Postal Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  City <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, city: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={addressForm.state}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, state: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  Postal Code <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.postalCode}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, postalCode: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Country
              </label>
              <input
                type="text"
                value={addressForm.country}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={addressForm.phone}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              />
            </div>

            {/* Label & Default */}
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="label"
                    value="home"
                    checked={addressForm.label === "home"}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, label: e.target.value })
                    }
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  Home
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="label"
                    value="office"
                    checked={addressForm.label === "office"}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, label: e.target.value })
                    }
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  Office
                </label>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, isDefault: e.target.checked })
                  }
                  className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                />
                <span className="font-body text-sm text-black-charcoal">Default</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setEditingAddress(null)}
                className="flex-1 px-6 py-3 bg-grey-100 hover:bg-grey-200 text-black-charcoal font-body text-sm font-light rounded-full transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default MyAccount;

