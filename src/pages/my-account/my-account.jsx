import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  MapPin,
  LogOut,
  Edit2,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ShoppingBag,
  X,
  Trash2,
  Home,
  Building2,
  Save
} from "lucide-react";

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    // Load saved addresses or use dummy data
    let addresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    
    // If no addresses, use dummy data for testing
    if (addresses.length === 0) {
      addresses = [
        {
          id: "addr-1",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          address: "123 Main Street, Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
          addressType: "home"
        },
        {
          id: "addr-2",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          address: "456 Business Plaza, Suite 200",
          city: "New York",
          state: "NY",
          zipCode: "10002",
          country: "United States",
          addressType: "work"
        },
        {
          id: "addr-3",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          address: "789 Oak Avenue",
          city: "Brooklyn",
          state: "NY",
          zipCode: "11201",
          country: "United States",
          addressType: "home"
        }
      ];
      localStorage.setItem("savedAddresses", JSON.stringify(addresses));
    }
    setSavedAddresses(addresses);

    if (!authToken || !userData) {
      // For testing: use mock data if not logged in
      const mockUser = {
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "+1 234 567 8900",
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      setProfileForm({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900"
      });
      
      // Load orders from localStorage (in a real app, this would be an API call)
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileForm({
        firstName: parsedUser.firstName || parsedUser.name?.split(" ")[0] || "",
        lastName: parsedUser.lastName || parsedUser.name?.split(" ")[1] || "",
        email: parsedUser.email || "",
        phone: parsedUser.mobile || parsedUser.phone || ""
      });
      
      // Load orders from localStorage (in a real app, this would be an API call)
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    } catch (error) {
      console.error("Error loading user data:", error);
      // For testing: use mock data on error
      const mockUser = {
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "+1 234 567 8900",
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      setProfileForm({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900"
      });
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Clear mock data if testing
    setUser(null);
    navigate("/");
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      name: `${profileForm.firstName} ${profileForm.lastName}`,
      email: profileForm.email,
      mobile: profileForm.phone,
      phone: profileForm.phone
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowEditProfile(false);
    alert("Profile updated successfully!");
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressId);
      setSavedAddresses(updatedAddresses);
      localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    }
  };

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = savedAddresses.map(addr =>
        addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr
      );
      setSavedAddresses(updatedAddresses);
      localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    } else {
      // Add new address
      const newAddress = {
        ...addressData,
        id: `addr-${Date.now()}`
      };
      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    }
    setEditingAddress(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-success bg-success/10";
      case "processing":
        return "text-warning bg-warning/10";
      case "shipped":
        return "text-info bg-info/10";
      case "cancelled":
        return "text-error bg-error/10";
      default:
        return "text-grey-600 bg-grey-100";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-grey-600">Loading...</p>
        </div>
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
          {/* Left Column - Profile & Actions */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-rose-100 to-accent-pink-100 rounded-full flex items-center justify-center border-2 border-accent-rose-200">
                  <User className="w-8 h-8 text-accent-rose-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal mb-1">
                    {user.name || user.firstName || "User"}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light">
                    {user.email || user.mobile || "No contact info"}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3 border-t border-grey-200 pt-4">
                {user.mobile && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-grey-400" strokeWidth={2} />
                    <span className="font-body text-sm text-grey-700 font-light">
                      {user.mobile}
                    </span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-grey-400" strokeWidth={2} />
                    <span className="font-body text-sm text-grey-700 font-light">
                      {user.email}
                    </span>
                  </div>
                )}
                {user.createdAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-grey-400" strokeWidth={2} />
                    <span className="font-body text-sm text-grey-700 font-light">
                      Member since {formatDate(user.createdAt)}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setProfileForm({
                    firstName: user?.firstName || user?.name?.split(" ")[0] || "",
                    lastName: user?.lastName || user?.name?.split(" ")[1] || "",
                    email: user?.email || "",
                    phone: user?.mobile || user?.phone || ""
                  });
                  setShowEditProfile(true);
                }}
                className="w-full mt-4 px-4 py-2.5 border border-grey-200 hover:border-accent-rose-600 text-accent-rose-600 font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" strokeWidth={2} />
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
                    <Package className="w-5 h-5 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" strokeWidth={2} />
                    <span className="font-body text-sm font-light text-black-charcoal">View All Orders</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-accent-rose-600 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2} />
                </button>

                <button
                  onClick={() => setShowAddresses(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-grey-50 rounded-lg transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" strokeWidth={2} />
                    <span className="font-body text-sm font-light text-black-charcoal">
                      Saved Addresses ({savedAddresses.length})
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-accent-rose-600 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sign Out
            </button>
          </div>

          {/* Right Column - Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                  Recent Orders
                </h2>
                {orders.length > 0 && (
                  <button
                    onClick={() => navigate("/orders")}
                    className="font-body text-sm text-accent-rose-600 hover:text-accent-rose-700 font-light transition-colors duration-300 flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-grey-300 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="font-display text-lg font-light text-black-charcoal mb-2">
                    No orders yet
                  </p>
                  <p className="font-body text-sm text-grey-600 font-light mb-6">
                    Start shopping to see your orders here
                  </p>
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
                    <div
                      key={order.id}
                      className="border border-grey-200 p-4 sm:p-5 hover:border-grey-300 transition-colors duration-300"
                    >
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
                          <p className="font-body text-xs text-grey-600 font-light mb-1">
                            {formatDate(order.orderDate || order.createdAt)}
                          </p>
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
            <X className="w-5 h-5" strokeWidth={2} />
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
            <Save className="w-4 h-4" strokeWidth={2} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Saved Addresses Modal Component
const SavedAddressesModal = ({ addresses, onEdit, onDelete, onAdd, onClose, editingAddress, onSaveAddress }) => {
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    addressType: "home"
  });

  useEffect(() => {
    if (editingAddress && editingAddress.id) {
      setAddressForm(editingAddress);
    } else if (editingAddress) {
      setAddressForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        addressType: "home"
      });
    }
  }, [editingAddress]);

  const handleSave = () => {
    if (!addressForm.firstName || !addressForm.lastName || !addressForm.address || !addressForm.city || !addressForm.zipCode) {
      alert("Please fill in all required fields");
      return;
    }
    onSaveAddress(addressForm);
    setAddressForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      addressType: "home"
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !editingAddress) {
          onClose();
        }
      }}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <h2 className="font-display text-2xl font-light text-black-charcoal">
            {editingAddress ? (editingAddress.id ? "Edit Address" : "Add New Address") : "Saved Addresses"}
          </h2>
          <button
            onClick={() => {
              if (editingAddress) {
                onClose();
              } else {
                onClose();
              }
            }}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {editingAddress ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  First Name <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.firstName}
                  onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  Last Name <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.lastName}
                  onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Address <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={addressForm.address}
                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  City <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
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
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                  ZIP Code <span className="text-accent-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={addressForm.zipCode}
                  onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                  className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Address Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={addressForm.addressType === "home"}
                    onChange={(e) => setAddressForm({ ...addressForm, addressType: e.target.value })}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  <Home className="w-4 h-4 text-grey-600" strokeWidth={2} />
                  <span className="font-body text-sm font-light text-black-charcoal">Home</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    value="work"
                    checked={addressForm.addressType === "work"}
                    onChange={(e) => setAddressForm({ ...addressForm, addressType: e.target.value })}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  <Building2 className="w-4 h-4 text-grey-600" strokeWidth={2} />
                  <span className="font-body text-sm font-light text-black-charcoal">Work</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => onClose()}
                className="flex-1 px-6 py-3 bg-grey-100 hover:bg-grey-200 text-black-charcoal font-body text-sm font-light rounded-full transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" strokeWidth={2} />
                Save Address
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <button
                onClick={() => onAdd()}
                className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" strokeWidth={2} />
                Add New Address
              </button>
            </div>
            <div className="space-y-4">
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-grey-300 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="font-display text-lg font-light text-black-charcoal mb-2">
                    No saved addresses
                  </p>
                  <p className="font-body text-sm text-grey-600 font-light mb-6">
                    Add your first address to get started
                  </p>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-grey-200 p-5 hover:border-grey-300 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {address.addressType === "home" ? (
                            <Home className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                          ) : (
                            <Building2 className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                          )}
                          <span className="font-display text-base font-light text-black-charcoal">
                            {address.firstName} {address.lastName}
                          </span>
                          <span className="px-2 py-0.5 bg-grey-100 text-grey-600 text-xs font-body font-light uppercase rounded">
                            {address.addressType}
                          </span>
                        </div>
                        <p className="font-body text-sm text-grey-700 font-light mb-1">
                          {address.address}
                        </p>
                        <p className="font-body text-sm text-grey-700 font-light mb-1">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="font-body text-sm text-grey-700 font-light">
                          {address.country}
                        </p>
                        {address.phone && (
                          <p className="font-body text-xs text-grey-600 font-light mt-2">
                            {address.phone}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => onEdit(address)}
                          className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => onDelete(address.id)}
                          className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

