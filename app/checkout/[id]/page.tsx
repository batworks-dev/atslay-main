"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Star, Eye, Shield, Zap, Award } from "lucide-react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { toast, Toaster } from "react-hot-toast";
import Script from "next/script";
import { useSession } from "next-auth/react";

interface Product {
  _id: string;
  name: string;
  mini_description: string;
  main_price: number;
  base_price: number;
  category: string;
  rating?: number;
  status?: string;
  reviews?: number;
  image: string;
  tags?: string[];
  revenue?: string;
  views?: number;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { data: session } = useSession();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Auto-fill form from session
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user?.name || prev.fullName,
        email: session.user?.email || prev.email,
      }));
    }
  }, [session]);

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (productId) {
      fetchProduct();
    }
  }, [productId]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { fullName, email, phone } = formData;
    
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    
    if (!phone.trim() || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };

  // Verify coupon
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Enter a coupon code");
      return;
    }

    try {
      const res = await fetch("/api/coupons/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await res.json();

      if (data.valid) {
        setDiscount(data.discount);
        setCouponApplied(true);
        toast.success(`Coupon applied! ${data.discount}% off`);
      } else {
        setDiscount(0);
        setCouponApplied(false);
        toast.error(data.message || "Invalid or expired coupon");
      }
    } catch (error) {
      console.error("Coupon error:", error);
      toast.error("Failed to verify coupon");
    }
  };

  // Razorpay Payment Handler
  const handlePayment = async () => {
    // Guard: Prevent multiple simultaneous payment attempts
    if (processingPayment || verifyingPayment) {
      toast.error("Payment is already in progress");
      return;
    }

    if (!product) {
      toast.error("Product not found");
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!razorpayLoaded) {
      toast.error("Payment gateway is loading. Please wait...");
      return;
    }

    setProcessingPayment(true);

    try {
      let totalAmount = product.base_price * 1.18; // GST included
      if (discount > 0) {
        totalAmount = totalAmount * ((100 - discount) / 100);
      }

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "INR",
          productId: product._id,
          buyerDetails: formData,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      if (!order?.razorpayOrderId) {
        toast.error("Failed to create Razorpay order");
        setProcessingPayment(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "BATWORKS",
        description: product.name,
        order_id: order.razorpayOrderId,
        handler: async (response: any) => {
          // Idempotency guard: Prevent duplicate handler executions
          if (verifyingPayment) {
            console.warn("Payment verification already in progress, skipping duplicate handler call");
            return;
          }

          setVerifyingPayment(true);
          toast.success("Payment successful! Verifying...");

          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order.orderId,
                productId: product._id,
                buyerDetails: {
                  name: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                },
                couponCode: couponApplied ? couponCode : null,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment verified successfully!");
              setTimeout(() => {
                router.push("/marketplace");
              }, 1500);
            } else {
              toast.error("Payment verification failed. Please contact support.");
              setVerifyingPayment(false);
              setProcessingPayment(false);
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
            setVerifyingPayment(false);
            setProcessingPayment(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled");
            setProcessingPayment(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment initialization failed. Please try again.");
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(220_25%_8%)] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[hsl(220_25%_8%)] text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-4">Product not found</p>
            <Button
              onClick={() => router.push("/marketplace")}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Back to Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = product.base_price;
  const tax = subtotal * 0.18;
  const totalBeforeDiscount = subtotal + tax;
  const discountAmount = discount > 0 ? totalBeforeDiscount * (discount / 100) : 0;
  const finalTotal = totalBeforeDiscount - discountAmount;

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(220_25%_8%)]">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => toast.error("Failed to load payment gateway")}
      />
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6"
        >
          {/* LEFT: Billing Form */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Billing Information
              </CardTitle>
              <CardDescription className="text-white/60">
                Enter your details to proceed with the payment
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-6 pb-6">
              <div className="grid gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm text-white/70 font-medium">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/40 h-11"
                    disabled={!!session?.user?.name}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm text-white/70 font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/40 h-11"
                    disabled={!!session?.user?.email}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm text-white/70 font-medium">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/40 h-11"
                  />
                </div>

                {/* Coupon Code */}
                <div className="space-y-2 pt-2">
                  <label className="block text-sm text-white/70 font-medium">
                    Promo Code (Optional)
                  </label>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-3 flex items-center justify-between gap-3"
                  >
                    <Input
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        if (couponApplied) {
                          setCouponApplied(false);
                          setDiscount(0);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") applyCoupon();
                      }}
                      placeholder="Enter promo code"
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/40 h-9 p-0"
                      disabled={couponApplied}
                    />

                    {!couponApplied ? (
                      <Button
                        onClick={applyCoupon}
                        disabled={!couponCode.trim()}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-4 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </Button>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="bg-green-400/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
                          {discount}% OFF
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDiscount(0);
                            setCouponApplied(false);
                            setCouponCode("");
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 px-3"
                        >
                          Remove
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </CardContent>

            <div className="flex justify-end px-6 pb-6 pt-2 border-t border-white/10">
              <Button
                onClick={handlePayment}
                disabled={!razorpayLoaded || processingPayment || verifyingPayment}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {verifyingPayment 
                  ? "Verifying Payment..." 
                  : processingPayment 
                  ? "Processing..." 
                  : `Pay ₹${finalTotal.toFixed(2)}`}
              </Button>
            </div>
          </Card>

          {/* RIGHT: Order Summary */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 h-fit sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl text-white">Order Summary</CardTitle>
              <div className="mt-3">
                <div className="text-3xl font-bold text-white">
                  ₹{product.base_price?.toLocaleString("en-IN")}
                </div>
                {product.main_price > product.base_price && (
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="line-through text-white/50">
                      ₹{product.main_price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-green-400 font-semibold">
                      {Math.round(((product.main_price - product.base_price) / product.main_price) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-white font-semibold mb-1">{product.name}</h3>
                <p className="text-white/60 text-sm mb-2 line-clamp-2">
                  {product.mini_description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-white/10 text-white border-white/20 text-xs">
                    {product.category}
                  </Badge>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-white">{product.rating}</span>
                    </div>
                  )}
                  {product.views !== undefined && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-white/70" />
                      <span className="text-xs text-white/70">{product.views}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between text-green-400 font-semibold text-sm"
                  >
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </motion.div>
                )}
                <div className="border-t border-white/20 pt-3 mt-2">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <motion.span
                      key={finalTotal}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="text-emerald-400"
                    >
                      ₹{finalTotal.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Award className="h-4 w-4 text-blue-400" />
                  <span>Money-back Guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}