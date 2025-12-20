import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Package,
  Truck,
  RefreshCw,
  X,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  Clock,
  AlertCircle,
  ArrowLeft,
  FileText,
  CheckCircle
} from "lucide-react";

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (!authToken || !userData) {
      // For testing: use mock user if not logged in
      const mockUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1 234 567 8900"
      };
      setUser(mockUser);
    } else {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error loading user data:", error);
        const mockUser = {
          name: "John Doe",
          email: "john.doe@example.com",
          mobile: "+1 234 567 8900"
        };
        setUser(mockUser);
      }
    }
    
    // Load orders from localStorage or use dummy data
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // If no orders in localStorage, use dummy data for testing
    const dummyOrders = [
      {
        id: "ORD-001",
        orderNumber: "ORD-001",
        status: "Delivered",
        orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "Red Rose Bouquet",
            quantity: 1,
            price: 49.99,
            image: "https://images.unsplash.com/photo-1518895949257-8f5a81e4f9ac?w=200"
          },
          {
            name: "Chocolate Box",
            quantity: 1,
            price: 24.99,
            image: "https://images.unsplash.com/photo-1606312619070-d48b4cbc6b3c?w=200"
          }
        ],
        subtotal: 74.98,
        shipping: 5.99,
        discount: 0,
        total: 80.97,
        shippingAddress: {
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States"
        }
      },
      {
        id: "ORD-002",
        orderNumber: "ORD-002",
        status: "Shipped",
        orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "Pink Rose Arrangement",
            quantity: 1,
            price: 59.99,
            image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=200"
          }
        ],
        subtotal: 59.99,
        shipping: 0,
        discount: 10.00,
        total: 49.99,
        shippingAddress: {
          address: "456 Oak Avenue",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90001",
          country: "United States"
        }
      },
      {
        id: "ORD-003",
        orderNumber: "ORD-003",
        status: "Processing",
        orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "White Lily Bouquet",
            quantity: 2,
            price: 39.99,
            image: "https://images.unsplash.com/photo-1520763185298-1b434c9198a4?w=200"
          },
          {
            name: "Birthday Card",
            quantity: 1,
            price: 4.99,
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200"
          }
        ],
        subtotal: 84.97,
        shipping: 7.99,
        discount: 0,
        total: 92.96,
        shippingAddress: {
          address: "789 Pine Road",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "United States"
        }
      },
      {
        id: "ORD-004",
        orderNumber: "ORD-004",
        status: "Delivered",
        orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "Mixed Flower Basket",
            quantity: 1,
            price: 79.99,
            image: "https://images.unsplash.com/photo-1563241521-5eda2e51e73a?w=200"
          }
        ],
        subtotal: 79.99,
        shipping: 0,
        discount: 15.00,
        total: 64.99,
        shippingAddress: {
          address: "321 Elm Street",
          city: "Miami",
          state: "FL",
          zipCode: "33101",
          country: "United States"
        }
      },
      {
        id: "ORD-005",
        orderNumber: "ORD-005",
        status: "Shipped",
        orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "Sunflower Bouquet",
            quantity: 1,
            price: 44.99,
            image: "https://images.unsplash.com/photo-1597848212624-e59336a7d3bb?w=200"
          },
          {
            name: "Teddy Bear",
            quantity: 1,
            price: 29.99,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
          }
        ],
        subtotal: 74.98,
        shipping: 5.99,
        discount: 0,
        total: 80.97,
        shippingAddress: {
          address: "654 Maple Drive",
          city: "Seattle",
          state: "WA",
          zipCode: "98101",
          country: "United States"
        }
      },
      {
        id: "ORD-006",
        orderNumber: "ORD-006",
        status: "Cancelled",
        orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            name: "Orchid Plant",
            quantity: 1,
            price: 34.99,
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200"
          }
        ],
        subtotal: 34.99,
        shipping: 4.99,
        discount: 0,
        total: 39.98,
        shippingAddress: {
          address: "987 Cedar Lane",
          city: "Boston",
          state: "MA",
          zipCode: "02101",
          country: "United States"
        }
      }
    ];
    
    const ordersToUse = savedOrders.length > 0 ? savedOrders : dummyOrders;
    setOrders(ordersToUse);
    
    // Check if orderId is in URL params
    const orderId = searchParams.get("orderId");
    if (orderId) {
      const order = ordersToUse.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setShowOrderModal(true);
      }
    }
  }, [navigate, searchParams]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-success bg-success/10 border-success/20";
      case "processing":
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
      case "processing":
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

  const filteredOrders = activeTab === "orders" 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === "shipped" || order.status?.toLowerCase() === "delivered");

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
              <Package className="w-20 h-20 text-grey-300 mx-auto mb-6" strokeWidth={1.5} />
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
                  key={order.id}
                  className="p-5 sm:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-display text-base font-light text-black-charcoal">
                          Order #{order.orderNumber || order.id}
                        </span>
                        <span className={`px-3 py-1 text-xs font-body font-light rounded-full border flex items-center gap-1.5 ${getOrderStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status || "Processing"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-grey-600">
                          <Calendar className="w-4 h-4" strokeWidth={2} />
                          <span className="font-body font-light">{formatDate(order.orderDate || order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-grey-600">
                          <Package className="w-4 h-4" strokeWidth={2} />
                          <span className="font-body font-light">
                            {order.items?.length || 0} {order.items?.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                        <div className="font-display text-base font-light text-black-charcoal">
                          ${order.total?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {activeTab === "track" && (order.status?.toLowerCase() === "shipped" || order.status?.toLowerCase() === "delivered") && (
                        <button
                          onClick={() => navigate(`/track-order?orderId=${order.id}`)}
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
            // Remove orderId from URL
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
      minute: "2-digit"
    });
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-success bg-success/10 border-success/20";
      case "processing":
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
        if (e.target === e.currentTarget) {
          onClose();
        }
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
              Order #{order.orderNumber || order.id}
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
                  <p className="font-body text-xs text-grey-600 font-light mb-1">Order Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-body font-light rounded-full border ${getOrderStatusColor(order.status)}`}>
                    {order.status || "Processing"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-grey-600 font-light mb-1">Order Date</p>
                  <p className="font-body text-sm text-black-charcoal font-light">
                    {formatDate(order.orderDate || order.createdAt)}
                  </p>
                </div>
              </div>
            </div>

          {/* Order Items */}
          <div>
            <h3 className="font-display text-lg font-light text-black-charcoal mb-4">Items</h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 border border-grey-200">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover border border-grey-200"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-display text-base font-light text-black-charcoal mb-1">
                      {item.name || "Product"}
                    </h4>
                    <p className="font-body text-xs text-grey-600 font-light mb-2">
                      Quantity: {item.quantity || 1}
                    </p>
                    <p className="font-display text-sm font-light text-black-charcoal">
                      ${item.price?.toFixed(2) || "0.00"}
                    </p>
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
              <div className="p-4 bg-grey-50 border border-grey-200">
                <p className="font-body text-sm text-black-charcoal font-light">
                  {order.shippingAddress.address}
                </p>
                <p className="font-body text-sm text-black-charcoal font-light">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="font-body text-sm text-black-charcoal font-light">
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          )}

            {/* Order Summary */}
            <div>
              <h3 className="font-display text-lg font-light text-black-charcoal mb-4">Order Summary</h3>
              <div className="space-y-3 p-4 bg-grey-50 border border-grey-200">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-grey-600 font-light">Subtotal</span>
                  <span className="font-display text-sm font-light text-black-charcoal">
                    ${order.subtotal?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-grey-600 font-light">Shipping</span>
                  <span className="font-display text-sm font-light text-black-charcoal">
                    ${order.shipping?.toFixed(2) || "0.00"}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-grey-600 font-light">Discount</span>
                    <span className="font-display text-sm font-light text-success">
                      -${order.discount?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-grey-200">
                  <span className="font-display text-base font-light text-black-charcoal">Total</span>
                  <span className="font-display text-lg font-light text-black-charcoal">
                    ${order.total?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : returnSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" strokeWidth={2} />
            </div>
            <h3 className="font-display text-xl font-light text-black-charcoal mb-2">
              Return Request Submitted
            </h3>
            <p className="font-body text-sm text-grey-600 font-light mb-6">
              Your return request has been submitted successfully. We'll process it within 2-3 business days.
            </p>
            <button
              onClick={() => {
                setShowReturnForm(false);
                setReturnSubmitted(false);
                setReturnItems([]);
                setReturnReason("");
              }}
              className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300"
            >
              Back to Order Details
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setShowReturnForm(false)}
                className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <div>
                <h3 className="font-display text-xl font-light text-black-charcoal mb-1">
                  Request Return
                </h3>
                <p className="font-body text-sm text-grey-600 font-light">
                  Select items you want to return
                </p>
              </div>
            </div>

            {/* Return Items Selection */}
            <div>
              <h4 className="font-display text-base font-light text-black-charcoal mb-4">Select Items to Return</h4>
              <div className="space-y-3">
                {order.items?.map((item, index) => {
                  const isSelected = returnItems.some(ri => ri.index === index);
                  return (
                    <div
                      key={index}
                      className={`flex gap-4 p-4 border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "border-accent-rose-600 bg-accent-rose-50/30"
                          : "border-grey-200 hover:border-grey-300"
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          setReturnItems(returnItems.filter(ri => ri.index !== index));
                        } else {
                          setReturnItems([...returnItems, { index, ...item }]);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                        />
                      </div>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover border border-grey-200"
                        />
                      )}
                      <div className="flex-1">
                        <h5 className="font-display text-sm font-light text-black-charcoal mb-1">
                          {item.name || "Product"}
                        </h5>
                        <p className="font-body text-xs text-grey-600 font-light mb-1">
                          Quantity: {item.quantity || 1}
                        </p>
                        <p className="font-display text-sm font-light text-black-charcoal">
                          ${item.price?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Return Reason */}
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Reason for Return <span className="text-accent-rose-600">*</span>
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
              >
                <option value="">Select a reason</option>
                <option value="defective">Defective/Damaged Item</option>
                <option value="wrong">Wrong Item Received</option>
                <option value="quality">Quality Issues</option>
                <option value="size">Size/Color Not as Expected</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Return Method */}
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-3">
                Return Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border-2 border-grey-200 hover:border-accent-rose-300 cursor-pointer transition-colors duration-300">
                  <input
                    type="radio"
                    name="returnMethod"
                    value="pickup"
                    checked={returnMethod === "pickup"}
                    onChange={(e) => setReturnMethod(e.target.value)}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  <Truck className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  <div>
                    <p className="font-body text-sm font-light text-black-charcoal">Home Pickup</p>
                    <p className="font-body text-xs text-grey-600 font-light">We'll arrange pickup from your address</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border-2 border-grey-200 hover:border-accent-rose-300 cursor-pointer transition-colors duration-300">
                  <input
                    type="radio"
                    name="returnMethod"
                    value="dropoff"
                    checked={returnMethod === "dropoff"}
                    onChange={(e) => setReturnMethod(e.target.value)}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                  />
                  <Package className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  <div>
                    <p className="font-body text-sm font-light text-black-charcoal">Drop Off</p>
                    <p className="font-body text-xs text-grey-600 font-light">Drop off at nearest service center</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-6 border-t border-grey-200 flex justify-end gap-3">
          {showReturnForm && !returnSubmitted && (
            <button
              onClick={() => {
                if (returnItems.length === 0) {
                  alert("Please select at least one item to return");
                  return;
                }
                if (!returnReason) {
                  alert("Please select a reason for return");
                  return;
                }
                setReturnSubmitted(true);
              }}
              className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" strokeWidth={2} />
              Submit Return Request
            </button>
          )}
          {!showReturnForm && (
            <>
              {activeTab === "track" && (order.status?.toLowerCase() === "shipped" || order.status?.toLowerCase() === "delivered") && (
                <button
                  onClick={() => setShowReturnForm(true)}
                  className="px-6 py-3 border border-accent-rose-600 text-accent-rose-600 hover:bg-accent-rose-50 font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" strokeWidth={2} />
                  Return
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;

