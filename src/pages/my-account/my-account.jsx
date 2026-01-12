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
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import {
  GetUser,
  UpdateUser,
  UpdateAddress,
  DeleteAddress,
} from "../../service/user";
import { formatDate, getOrderStatusColor } from "../../utils/utils";
import { message } from "../../comman/toaster-message/toasterMessage";
import { SavedAddressesModal } from "./SavedAddressesModal";
import { EditProfileModal } from "./EditProfileModal";
import Orders from "../orders/orders";

// Default empty address
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

const MyAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  const [showAddresses, setShowAddresses] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Fetch user data
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await GetUser();
      setUser(res.user);
      setOrders(res.orders || []);
      setSavedAddresses(res.user.addresses || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Fetch User Error:", err);
      message.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ------------------- PROFILE -------------------
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const payload = {
        name: `${profileForm.firstName} ${profileForm.lastName}`,
        email: profileForm.email,
        phone: profileForm.phone,
        dateOfBirth: profileForm.dateOfBirth,
      };
      await UpdateUser(payload);
      await fetchUser();
      setShowEditProfile(false);
      setLoading(false);
      message.success("Profile updated successfully");
    } catch (err) {
      setLoading(false);
      console.error(err);
      message.error("Failed to update profile");
    }
  };

  // ------------------- ADD/UPDATE ADDRESS -------------------
  const handleSaveAddress = async (addressForm) => {
    console.log("Saving Address:", addressForm);
    try {
      setLoading(true);

      // let updatedAddresses = [...(user.addresses || [])];

      // If default, unset others
      // if (addressForm.isDefault) {
      //   updatedAddresses = updatedAddresses.map((addr) => ({
      //     ...addr,
      //     isDefault: false,
      //   }));
      // }

      // if (addressForm._id) {
      //   // Update existing
      //   updatedAddresses = updatedAddresses.map((addr) =>
      //     addr._id === addressForm._id ? addressForm : addr
      //   );
      // } else {
      //   // Add new
      //   updatedAddresses.push(addressForm);
      // }

      await UpdateUser({ addresses: [addressForm] });
      await fetchUser();

      setEditingAddress(null);
      setIsAddingNew(false);
      setLoading(false);
      message.success("Address saved successfully");
    } catch (err) {
      setLoading(false);
      console.error("Save Address Error:", err);
      message.error("Failed to save address");
    }
  };

  // ------------------- DELETE ADDRESS -------------------
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      setLoading(true);
      await DeleteAddress(addressId);
      await fetchUser();
      setLoading(false);
      message.success("Address deleted successfully");
    } catch (err) {
      setLoading(false);
      console.error(err);
      message.error("Failed to delete address");
    }
  };

  // ------------------- SIGN OUT -------------------
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cookiesAccepted");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ------------------- RENDER -------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-accent-rose-600">
        <p>Loading...</p>
      </div>
    );
  }

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
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-rose-100 to-accent-pink-100 rounded-full flex items-center justify-center border-2 border-accent-rose-200">
                  <FiUser className="w-8 h-8 text-accent-rose-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal mb-1">
                    {user.name || "User"}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light">
                    {user.email || user.phone || "No contact info"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-grey-200 pt-4">
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">
                      {user.phone}
                    </span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-grey-400" />
                    <span className="font-body text-sm text-grey-700 font-light">
                      {user.email}
                    </span>
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
                    dateOfBirth: user.dateOfBirth || "",
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
                    <span className="font-body text-sm font-light text-black-charcoal">
                      View All Orders
                    </span>
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

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant"
            >
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-primary-white border border-grey-200 ">
             
              <Orders/>
              </div>

           
      
          </div>
        </div>
      </div>

      {/* ----------------- MODALS ----------------- */}
      {showEditProfile && (
        <EditProfileModal
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showAddresses && (
        <SavedAddressesModal
          addresses={savedAddresses}
          editingAddress={editingAddress}
          isAddingNew={isAddingNew}
          setEditingAddress={setEditingAddress}
          setIsAddingNew={setIsAddingNew}
          onSaveAddress={handleSaveAddress}
          onDelete={handleDeleteAddress}
          onClose={() => {
            setShowAddresses(false);
            setEditingAddress(null);
            setIsAddingNew(false);
          }}
        />
      )}
    </div>
  );
};

export default MyAccount;
