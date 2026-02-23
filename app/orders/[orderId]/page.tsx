"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "@/styles/no-oklch.css";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { toast, Toaster } from "react-hot-toast";
import html2pdf from "html2pdf.js";

interface Order {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  currency: string;
  status: string;
  createdAt: string;
  paymentMethod?: string;
  transactionId?: string;
  razorpayOrderId?: string;
  buyerDetails?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false); // ✅ new state for preloader

  useEffect(() => {
    if (!orderId) return;
    async function fetchOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/orders/${orderId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success && data.order) setOrder(data.order);
        else toast.error("Order not found");
      } catch {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  const handleDownloadInvoice = async () => {
  if (!invoiceRef.current || !order) return;
  setDownloading(true);

  // ✅ Temporarily enable PDF-safe mode
  document.documentElement.setAttribute("data-pdf-export", "true");

  // Clone the invoice node
  const element = invoiceRef.current.cloneNode(true) as HTMLElement;

  // ✅ Force dark theme for the PDF
  const allElements = element.querySelectorAll("*");
  allElements.forEach((el) => {
    const style = (el as HTMLElement).style;
    style.background = "black";
    style.backgroundColor = "black";
    style.color = "white";
    style.borderColor = "#333333";
  });

  // ✅ PDF generation config
  const opt: any = {
    margin: 0,
    filename: `Invoice_${order._id}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#000000", // pure black page
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  try {
    await html2pdf().set(opt).from(element).save();
    toast.success("Invoice downloaded successfully!");
  } catch (err) {
    console.error("Invoice download failed:", err);
    toast.error("Failed to download invoice");
  } finally {
    document.documentElement.removeAttribute("data-pdf-export");
    setDownloading(false);
  }
};


  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    const base = "flex items-center gap-1 px-2 py-1 rounded-md border text-sm";
    if (s === "delivered" || s === "paid")
      return (
        <Badge className={`${base} bg-green-600/30 text-green-400 border-green-500/40`}>
          <CheckCircle className="w-3 h-3" />
          Delivered
        </Badge>
      );
    if (s === "processing")
      return (
        <Badge className={`${base} bg-yellow-600/30 text-yellow-400 border-yellow-500/40`}>
          <Clock className="w-3 h-3" />
          Processing
        </Badge>
      );
    if (s === "cancelled")
      return (
        <Badge className={`${base} bg-red-600/30 text-red-400 border-red-500/40`}>
          <XCircle className="w-3 h-3" />
          Cancelled
        </Badge>
      );
    return (
      <Badge className={`${base} bg-blue-600/30 text-blue-400 border-blue-500/40`}>
        <Truck className="w-3 h-3" />
        Pending
      </Badge>
    );
  };

 if (loading)
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] overflow-hidden">
      {/* Glowing Rings Animation */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-48 h-48 rounded-full border-[3px] border-cyan-400/40 animate-ping" />
        <div className="absolute w-36 h-36 rounded-full border-[3px] border-blue-500/60 animate-spin-slow" />
        <div className="absolute w-24 h-24 rounded-full border-[3px] border-purple-600/70 animate-pulse" />
        <img
          src="https://www.batworks.in/logo.png"
          alt="BatWorks Logo"
          className="relative w-32 h-auto object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]"
        />
      </div>

      {/* Slogan Text */}
      <h2 className="text-xl md:text-2xl font-semibold text-white text-center px-6 leading-relaxed animate-fadeIn">
        SKIP THE BUILD.{" "}
        <span className="text-cyan-400">LAUNCH FASTER</span> <br className="hidden md:block" />
        WITH PREMIUM WEB APPLICATIONS.
      </h2>

      {/* Subtext */}
      <p className="mt-6 text-gray-400 text-sm tracking-widest uppercase animate-pulse">
        Loading your order details...
      </p>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );



  if (!order)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0e17] text-white">
        <XCircle className="w-12 h-12 text-red-400" />
        <p className="ml-2 text-lg">Order not found</p>
      </div>
    );

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0b0e17] text-white overflow-hidden">
      <Toaster position="top-right" />
      <Navbar />

      {/* ✅ Preloader Overlay */}
      {downloading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
          <p className="text-lg text-white/90 font-medium animate-pulse">
            Preparing your invoice...
          </p>
        </div>
      )}

      <main className="flex-grow pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-1">Order Invoice</h1>
            <p className="text-gray-400 text-sm">Order ID: {order._id}</p>
          </motion.div>

          <div ref={invoiceRef}>
            <Card className="bg-[#141414] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
              <CardHeader className="border-b border-[#2a2a2a] px-6 py-6 flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-4">
                  <img
                    src="https://www.batworks.in/logo.png"
                    alt="BatWorks Logo"
                    className="w-[150px] h-auto object-contain"
                  />
                </div>
                {getStatusBadge(order.status)}
              </CardHeader>

              <CardContent className="px-6 py-8 space-y-8">
                <div className="flex justify-between flex-wrap gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2 text-lg">Billed To</h3>
                    <p className="text-white text-sm">{order.buyerDetails?.name || "Customer"}</p>
                    <p className="text-gray-400 text-sm">{order.buyerDetails?.email}</p>
                    <p className="text-gray-400 text-sm">{order.buyerDetails?.phone}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-white mb-2 text-lg">Seller Info</h3>
                    <p className="text-white text-sm">BATWORKS</p>
                    <p className="text-gray-400 text-sm">UDYAM-UP-55-0047651</p>
                    <p className="text-gray-400 text-sm">
                      Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden border border-[#2a2a2a] rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-[#1f1f1f] text-gray-300">
                      <tr>
                        <th className="text-left p-3">Item</th>
                        <th className="text-right p-3">Price</th>
                        <th className="text-right p-3">Qty</th>
                        <th className="text-right p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2a2a]">
                      <tr className="hover:bg-[#1c1c1c] transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={order.productImage || "/placeholder.svg"}
                            alt={order.productName}
                            className="w-10 h-10 rounded-md border border-[#2a2a2a] object-cover"
                          />
                          <span>{order.productName}</span>
                        </td>
                        <td className="text-right p-3">₹{order.price.toFixed(2)}</td>
                        <td className="text-right p-3">1</td>
                        <td className="text-right p-3">₹{order.price.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-dashed border-[#3a3a3a] pt-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>₹{order.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GST (18%)</span>
                    <span>₹{(order.price * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white border-t border-[#2a2a2a] pt-2">
                    <span>Total Paid</span>
                    <span>₹{(order.price * 1.18).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-4 text-sm text-gray-400 space-y-1">
                  <p>
                    Transaction ID: <span className="text-white">{order.transactionId}</span>
                  </p>
                 
                
                </div>
                      
                {/* Disclaimer Section — visible in PDF */}
<div className="mt-10 bg-[#000000] text-white rounded-xl border border-[#222] p-6 space-y-4 shadow-inner">
  <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>

  <p className="text-sm leading-relaxed text-gray-300">
    This is a <strong>system-generated invoice</strong> and does not require any
    physical signature or company seal. The details presented in this document are
    automatically generated through the BATWORKS digital billing system. 
  </p>

  <p className="text-sm leading-relaxed text-gray-300">
    This invoice serves as an official record of your purchase from the
    <strong> BATWORKS</strong>. It can be used for internal
    accounting, reimbursement claims, and digital ownership validation for assets
    and services purchased via our platform. Unauthorized duplication,
    redistribution, or modification of this invoice is strictly prohibited.
  </p>

  <p className="text-sm leading-relaxed text-gray-300">
     For billing
    disputes and clarifications, please reach out to:
  </p>

  <p className="text-sm">
    <a
      href="mailto:admin@batworks.in"
      className="text-blue-400 underline hover:text-blue-300"
    >
      admin@batworks.in
    </a>
  </p>

  <div className="pt-4 border-t border-dashed border-[#333] mt-4">
    <p className="text-sm font-medium text-gray-200">
      With Regards, <br />
      <span className="text-white font-semibold">BATWORKS Administration</span> <br />
      <span className="text-gray-400 text-sm">admin@batworks.in</span>
    </p>
  </div>
</div>

              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className={`bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white font-medium ${
                downloading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <Download className="w-4 h-4 mr-2" />{" "}
              {downloading ? "Generating..." : "Download Invoice"}
            </Button>
            <Button
              onClick={() => router.push("/my-products")}
              variant="outline"
              className="border-[#2a2a2a] text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] font-medium"
            >
              ← Back to My Products
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
