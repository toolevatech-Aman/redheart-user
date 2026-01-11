import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  RefreshCw,
  X,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  ArrowLeft,
  FileText,
  CheckCircle,
  Check,
} from "lucide-react";
import { getUserOrdersApi } from "../../service/orderService";

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrdersApi();
        console.log("Fetched Orders:", response);
        if (response.success) setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-success bg-success/10 border-success/20";
      case "pending":
        return "text-warning bg-warning/10 border-warning/20";
      case "shipped":
        return "text-info bg-info/10 border-info/20";
      case "cancelled":
        return "text-error bg-error/10 border-error/20";
      default:
        return "text-grey-600 bg-grey-100 border-grey-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <Check className="w-4 h-4" strokeWidth={2} />;
      case "pending":
        return <Clock className="w-4 h-4" strokeWidth={2} />;
      case "shipped":
        return <Truck className="w-4 h-4" strokeWidth={2} />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4" strokeWidth={2} />;
      default:
        return <Package className="w-4 h-4" strokeWidth={2} />;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const filteredOrders =
    activeTab === "orders"
      ? orders
      : orders.filter(
          (order) =>
            order.orderStatus?.toLowerCase() === "shipped" ||
            order.orderStatus?.toLowerCase() === "delivered"
        );

  if (loading) {
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
            My Orders
          </h1>
          <p className="font-body text-sm sm:text-base text-grey-600 font-light">
            View and track your orders
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-primary-white border border-grey-200 mb-6">
          <div className="flex border-b border-grey-200">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-6 py-4 font-body text-sm font-light transition-colors duration-300 relative ${
                activeTab === "orders"
                  ? "text-accent-rose-600"
                  : "text-grey-600 hover:text-black-charcoal"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Package className="w-4 h-4" strokeWidth={2} />
                <span>Orders</span>
              </div>
              {activeTab === "orders" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-rose-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`flex-1 px-6 py-4 font-body text-sm font-light transition-colors duration-300 relative ${
                activeTab === "track"
                  ? "text-accent-rose-600"
                  : "text-grey-600 hover:text-black-charcoal"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-4 h-4" strokeWidth={2} />
                <span>Track Order & Return</span>
              </div>
              {activeTab === "track" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-rose-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-primary-white border border-grey-200">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <Package
                className="w-20 h-20 text-grey-300 mx-auto mb-6"
                strokeWidth={1.5}
              />
              <p className="font-display text-xl font-light text-black-charcoal mb-2">
                No orders found
              </p>
              <p className="font-body text-sm text-grey-600 font-light mb-6">
                {activeTab === "track"
                  ? "No trackable orders available"
                  : "Start shopping to see your orders here"}
              </p>
              {activeTab === "orders" && (
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300"
                >
                  Start Shopping
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-grey-200">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-5 sm:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-display text-base font-light text-black-charcoal">
                          Order #{order.orderId}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs font-body font-light rounded-full border flex items-center gap-1.5 ${getOrderStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-grey-600">
                          <Calendar className="w-4 h-4" strokeWidth={2} />
                          <span className="font-body font-light">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-grey-600">
                          <Package className="w-4 h-4" strokeWidth={2} />
                          <span className="font-body font-light">
                            {order.cartItems.length}{" "}
                            {order.cartItems.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                        <div className="font-display text-base font-light text-black-charcoal">
                          ₹{order.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {activeTab === "track" &&
                        (order.orderStatus?.toLowerCase() === "shipped" ||
                          order.orderStatus?.toLowerCase() === "delivered") && (
                          <button
                            onClick={() =>
                              navigate(`/track-order?orderId=${order._id}`)
                            }
                            className="px-4 py-2 border border-grey-200 hover:border-accent-rose-600 text-accent-rose-600 font-body text-xs font-light rounded-full transition-colors duration-300 flex items-center gap-2"
                          >
                            <Truck className="w-4 h-4" strokeWidth={2} />
                            Track
                          </button>
                        )}
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="px-4 py-2 border border-grey-200 hover:border-accent-rose-600 text-accent-rose-600 font-body text-xs font-light rounded-full transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          activeTab={activeTab}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
            navigate("/orders", { replace: true });
          }}
        />
      )}
    </div>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({ order, activeTab, onClose }) => {
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [returnItems, setReturnItems] = useState([]);
  const [returnMethod, setReturnMethod] = useState("pickup");
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-success bg-success/10 border-success/20";
      case "pending":
        return "text-warning bg-warning/10 border-warning/20";
      case "shipped":
        return "text-info bg-info/10 border-info/20";
      case "cancelled":
        return "text-error bg-error/10 border-error/20";
      default:
        return "text-grey-600 bg-grey-100 border-grey-200";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <div>
            <h2 className="font-display text-2xl font-light text-black-charcoal mb-1">
              Order Details
            </h2>
            <p className="font-body text-sm text-grey-600 font-light">
              Order #{order.orderId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {!showReturnForm ? (
          <div className="space-y-6">
            {/* Order Status */}
            <div className="p-4 bg-grey-50 border border-grey-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-grey-600 font-light mb-1">
                    Order Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-body font-light rounded-full border ${getOrderStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus || "Pending"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-grey-600 font-light mb-1">
                    Delivery Date
                  </p>
                  <p className="font-body text-sm text-black-charcoal font-light">
                    {formatDate(order.deliveryDate)}
                  </p>
                  <p className="font-body text-xs text-grey-600 font-light mt-1">
                    Slot: {order.deliverySlot}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-display text-lg font-light text-black-charcoal mb-4">
                Items
              </h3>
              <div className="space-y-4">
                {order.cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border border-grey-200">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover border border-grey-200"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-display text-base font-light text-black-charcoal mb-1">
                        {item.name}
                      </h4>
                      <p className="font-body text-xs text-grey-600 font-light mb-1">
                        Quantity: {item.quantity}
                      </p>
                     { item.name !=="Personalize Hamper"&& <p className="font-display text-sm font-light text-black-charcoal">
                        ₹{item.selling_price.toFixed(2)}
                      </p>}

                      {/* Add-ons */}
                      {item.add_ons && item.add_ons.length > 0 && (
                        <div className="mt-2">
                          {item.add_ons.map((addon, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-grey-600"
                            >
                              <span>+ {addon.name}</span>
                              <span>₹{addon.selling_price.toFixed(2)} x {addon.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div>
                <h3 className="font-display text-lg font-light text-black-charcoal mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                  Shipping Address
                </h3>
                <div className="p-4 bg-grey-50 border border-grey-200 space-y-1">
                  <p className="font-body text-sm text-black-charcoal font-light">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="font-body text-sm text-black-charcoal font-light">
                    {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                  </p>
                  <p className="font-body text-sm text-black-charcoal font-light">
                    {order.shippingAddress.country}
                  </p>
                  <p className="font-body text-sm text-black-charcoal font-light">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div>
              <h3 className="font-display text-lg font-light text-black-charcoal mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 p-4 bg-grey-50 border border-grey-200">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-grey-600 font-light">Products</span>
                  <span className="font-display text-sm font-light text-black-charcoal">
                    ₹{order.totalProductPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-grey-600 font-light">
                    Shipping
                  </span>
                  <span className="font-display text-sm font-light text-black-charcoal">
                    ₹{order.shippingCharges.toFixed(2)}
                  </span>
                </div>
                {order.coupanDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-grey-600 font-light">
                      Coupon ({order.coupanApplied})
                    </span>
                    <span className="font-display text-sm font-light text-black-charcoal">
                      -₹{order.coupanDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-grey-200 pt-3 flex justify-between items-center">
                  <span className="font-body text-sm font-medium text-black-charcoal">
                    Total
                  </span>
                  <span className="font-display text-sm font-medium text-black-charcoal">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Return Form */}
            <h3 className="font-display text-lg font-light text-black-charcoal mb-4">
              Return Items
            </h3>
            {/* ... return form fields go here ... */}
            <button
              onClick={() => setReturnSubmitted(true)}
              className="px-4 py-2 bg-accent-rose-600 text-white rounded-full"
            >
              Submit Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
