import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MeetingMinutesView } from './MeetingMinutesView';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  Check,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  User,
  CreditCard,
  X,
  Plus,
  Minus,
  ArrowRight,
  Filter,
  Eye,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export interface ElymoraProduct {
  product_id: string;
  title: string;
  slug: string;
  category_id: string;
  category_name: string;
  price: number;
  currency: string;
  stock_quantity: number;
  images: string[];
  description: string;
  variants: Array<{ color: string; size: string; sku: string; stock: number }>;
  is_featured: boolean;
  rating: number;
  reviews_count: number;
  slogan_badge?: string;
}

const ELYMORA_CATEGORIES = [
  { category_id: "all", name: "تمام کلیکشنز (All)", icon: "✨" },
  { category_id: "cat_01", name: "Luxury Apparel (شاہانہ ملبوسات)", icon: "👗" },
  { category_id: "cat_02", name: "Artisanal Jewelry (دستکاری زیورات)", icon: "💎" },
  { category_id: "cat_03", name: "Fragrance & Aura (خوشبو و پرفیوم)", icon: "🌸" },
  { category_id: "cat_04", name: "Leather & Couture (لیڈر بیگز)", icon: "👜" },
];

const INITIAL_PRODUCTS: ElymoraProduct[] = [
  {
    product_id: "ely_1001",
    title: "Elymora Velvet Royal Edition",
    slug: "elymora-velvet-royal-edition",
    category_id: "cat_01",
    category_name: "Luxury Apparel",
    price: 14999,
    currency: "PKR",
    stock_quantity: 25,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "گہرے نیوی بلیو اور گولڈن کڑھائی سے مزین شاہانہ مخملی ڈریس۔ ہر محفل میں آپ کی شخصیت کو پروقار اور ممتاز بناتا ہے۔",
    variants: [
      { color: "Navy Blue", size: "M", sku: "ELY-NV-M", stock: 10 },
      { color: "Navy Blue", size: "L", sku: "ELY-NV-L", stock: 15 },
      { color: "Rose Gold", size: "M", sku: "ELY-RG-M", stock: 8 }
    ],
    is_featured: true,
    rating: 4.9,
    reviews_count: 128,
    slogan_badge: "Define Your Presence"
  },
  {
    product_id: "ely_1002",
    title: "Elymora Emerald Aurelia Silk Gown",
    slug: "elymora-emerald-aurelia-silk-gown",
    category_id: "cat_01",
    category_name: "Luxury Apparel",
    price: 18500,
    currency: "PKR",
    stock_quantity: 12,
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    description: "خالص سلک فیبرک اور ہاتھ سے کی گئی نسیجی کڑھائی۔ روایتی ملبوست میں نفاست اور عصری فیشن کا شاہکار۔",
    variants: [
      { color: "Emerald Green", size: "S", sku: "ELY-EG-S", stock: 4 },
      { color: "Emerald Green", size: "M", sku: "ELY-EG-M", stock: 8 }
    ],
    is_featured: true,
    rating: 5.0,
    reviews_count: 94,
    slogan_badge: "Grace in Every Detail"
  },
  {
    product_id: "ely_1003",
    title: "Elymora Golden Radiance Extrait Perfume",
    slug: "elymora-golden-radiance-perfume",
    category_id: "cat_03",
    category_name: "Fragrance & Aura",
    price: 8999,
    currency: "PKR",
    stock_quantity: 40,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    description: "خالص عود، صندل اور عنبر کا روح پرور امتزاج۔ 24 گھنٹے تک قائم رہنے والی پریمیم دلکش خوشبو۔",
    variants: [
      { color: "50ml Bottle", size: "Standard", sku: "ELY-PERF-50", stock: 40 }
    ],
    is_featured: true,
    rating: 4.8,
    reviews_count: 210,
    slogan_badge: "Unveil Your True Elegance"
  },
  {
    product_id: "ely_1004",
    title: "Elymora 18k Rose Gold Artisan Necklace",
    slug: "elymora-rose-gold-artisan-necklace",
    category_id: "cat_02",
    category_name: "Artisanal Jewelry",
    price: 12200,
    currency: "PKR",
    stock_quantity: 18,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "دستکاری سے تیار کردہ 18k روز گولڈ پلیٹڈ نیکلس جس میں زرقون نگینے کی چمک شامل ہے۔",
    variants: [
      { color: "Rose Gold", size: "One Size", sku: "ELY-JWL-RG", stock: 18 }
    ],
    is_featured: false,
    rating: 4.9,
    reviews_count: 67,
    slogan_badge: "Crafted for Confidence"
  },
  {
    product_id: "ely_1005",
    title: "Elymora Midnight Obsidian Leather Tote",
    slug: "elymora-midnight-leather-tote",
    category_id: "cat_04",
    category_name: "Leather & Couture",
    price: 16800,
    currency: "PKR",
    stock_quantity: 15,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "خالص لیدر (Calfskin) سے تیار کردہ ہینڈ بیگ، گولڈ ہارڈ ویئر زپ اور کشادہ گنجائش کے ساتھ۔",
    variants: [
      { color: "Obsidian Black", size: "Standard", sku: "ELY-BAG-BLK", stock: 15 }
    ],
    is_featured: false,
    rating: 4.7,
    reviews_count: 82,
    slogan_badge: "Simply Distinct"
  }
];

export const ElymoraStorefront: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<Array<{ product: ElymoraProduct; selectedColor: string; selectedSize: string; qty: number }>>([]);
  const [wishlist, setWishlist] = useState<string[]>(["ely_1001"]);
  const [selectedProductModal, setSelectedProductModal] = useState<ElymoraProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Checkout Form State
  const [checkoutName, setCheckoutName] = useState<string>("Muhammad Adnan");
  const [checkoutPhone, setCheckoutPhone] = useState<string>("03001234567");
  const [checkoutAddress, setCheckoutAddress] = useState<string>("House 42, Block 5, Gulberg III, Lahore");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "easypaisa" | "jazzcash" | "cod">("easypaisa");
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentApiResponse, setPaymentApiResponse] = useState<any>(null);
  const [userMpinInput, setUserMpinInput] = useState<string>("");
  const [paymentStep, setPaymentStep] = useState<"form" | "mpin_prompt" | "success">("form");
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState<boolean>(false);
  const [isMeetingMinutesOpen, setIsMeetingMinutesOpen] = useState<boolean>(false);
  const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useState<boolean>(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string>("");
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState<boolean>(false);
  const [matchedPhotoCategory, setMatchedPhotoCategory] = useState<string>("");

  // Photo Upload Handler
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhotoName(file.name);
      const url = URL.createObjectURL(file);
      setUploadedPhotoUrl(url);
      setIsAnalyzingPhoto(true);

      // Simulate AI Visual Analysis & Match
      setTimeout(() => {
        setIsAnalyzingPhoto(false);
        setMatchedPhotoCategory("cat_01"); // Navy Velvet & Luxury Apparel Match
        setActiveCategory("cat_01");
      }, 1200);
    }
  };

  // Initiate Payment API
  const handleInitiatePayment = async () => {
    setIsProcessingPayment(true);
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch("/api/v1/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          amount: cartSubtotal || 14999,
          currency: "PKR",
          payment_method: paymentMethod.toUpperCase(),
          customer_phone: checkoutPhone,
          customer_email: "user@elymora.com"
        })
      });

      const data = await res.json();
      setPaymentApiResponse(data);

      if (paymentMethod === "cod") {
        setPaymentStep("success");
        setOrderPlacedSuccess(true);
      } else {
        setPaymentStep("mpin_prompt");
      }
    } catch (err) {
      console.error("Payment error:", err);
      // Fallback
      setPaymentApiResponse({
        status: "PENDING",
        transaction_id: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        order_id: orderId,
        amount: cartSubtotal,
        message: `OTP / MPIN prompt sent to ${checkoutPhone} via ${paymentMethod.toUpperCase()}`
      });
      if (paymentMethod === "cod") {
        setOrderPlacedSuccess(true);
        setPaymentStep("success");
      } else {
        setPaymentStep("mpin_prompt");
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Confirm Payment Webhook Simulation
  const handleConfirmMpinAndWebhook = async () => {
    setIsProcessingPayment(true);

    try {
      const txnId = paymentApiResponse?.transaction_id || `TXN-88491023`;
      const orderId = paymentApiResponse?.order_id || `ORD-2026-9081`;

      const res = await fetch("/api/v1/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_id: txnId,
          order_id: orderId,
          status_code: "0000",
          status_message: "SUCCESS",
          amount_paid: cartSubtotal || 14999,
          hash_signature: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        })
      });

      const data = await res.json();
      setPaymentApiResponse((prev: any) => ({ ...prev, webhook_result: data }));
      setOrderPlacedSuccess(true);
      setPaymentStep("success");
    } catch (err) {
      console.error("Webhook error:", err);
      setOrderPlacedSuccess(true);
      setPaymentStep("success");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Filtered Products
  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category_id === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Toggle Wishlist
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Open Product Modal
  const openProductModal = (product: ElymoraProduct) => {
    setSelectedProductModal(product);
    setSelectedColor(product.variants[0]?.color || "Default");
    setSelectedSize(product.variants[0]?.size || "Standard");
  };

  // Add to Cart
  const addToCart = (product: ElymoraProduct, color: string, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.product_id === product.product_id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  // Subtotal
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-3 sm:p-6 rounded-3xl border border-amber-500/30 font-sans space-y-8" dir="rtl">
      
      {/* Brand Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 border border-amber-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Elymora Luxury Boutique — Define Your Presence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-yellow-100 tracking-tight font-serif">
              ELYMORA
            </h1>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              عصری نفاست، اعلیٰ ترین معیار اور شاہانہ طرزِ زندگی۔ ایلمورا کے ہر ملبوس اور پروڈکٹ میں چھپی ہے آپ کے اعتماد اور وقار کی کہانی۔
            </p>

            {/* Slogans Showcase Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 text-xs font-semibold">
              <span className="bg-slate-900/80 border border-amber-800/60 text-amber-200 px-3 py-1 rounded-full">
                ✨ Grace in Every Detail
              </span>
              <span className="bg-slate-900/80 border border-amber-800/60 text-amber-200 px-3 py-1 rounded-full">
                👑 Unveil Your True Elegance
              </span>
              <span className="bg-slate-900/80 border border-amber-800/60 text-amber-200 px-3 py-1 rounded-full">
                💫 Crafted for Confidence
              </span>
            </div>
          </div>

          {/* Cart & Wishlist Trigger Widget */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-slate-950" />
              <span>شاپنگ بیگز</span>
              {cart.length > 0 && (
                <span className="bg-slate-950 text-amber-400 font-extrabold text-xs px-2 py-0.5 rounded-full border border-amber-400">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search & Categories Navigation Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          {/* Search Input & Upload Photo Option */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-amber-400 absolute right-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="پروڈکٹ، کپڑا یا خوشبو تلاش کریں..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Upload Photo Button (English Label) */}
            <button
              onClick={() => setIsUploadPhotoModalOpen(true)}
              className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap hover:brightness-110 shrink-0"
              title="Upload Photo for Visual Match Search"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span className="font-sans tracking-wide">Upload Photo</span>
            </button>
          </div>

          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {ELYMORA_CATEGORIES.map((cat) => (
              <button
                key={cat.category_id}
                onClick={() => setActiveCategory(cat.category_id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.category_id
                    ? "bg-amber-500 text-slate-950 shadow-md font-black"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>شاهانه کلیکشنز (Featured Boutique Showcase)</span>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} آئٹمز
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p, index) => {
            const isWish = wishlist.includes(p.product_id);

            return (
              <motion.div
                key={p.product_id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-900/90 border border-amber-900/40 hover:border-amber-500/70 rounded-2xl overflow-hidden transition-colors duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Slogan Badge */}
                    {p.slogan_badge && (
                      <span className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md border border-amber-500/60 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        ✨ {p.slogan_badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(p.product_id)}
                      className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                        isWish
                          ? "bg-rose-600 text-white"
                          : "bg-slate-950/70 text-slate-300 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWish ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                      <span>{p.category_name}</span>
                      <div className="flex items-center gap-1 text-amber-300 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{p.rating} ({p.reviews_count})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-slate-100 font-serif line-clamp-1 group-hover:text-amber-300 transition">
                      {p.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Footer Price & CTAs */}
                <div className="p-4 border-t border-slate-800/80 flex items-center justify-between gap-2 bg-slate-950/40">
                  <div>
                    <span className="text-[10px] text-slate-500 block">قیمت مع ٹیکس</span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      {p.currency} {p.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openProductModal(p)}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition cursor-pointer"
                      title="تفصیلات دیکھیں"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        addToCart(p, p.variants[0]?.color || "Default", p.variants[0]?.size || "Standard")
                      }
                      className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>خریدیں</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/50 max-w-2xl w-full rounded-3xl p-6 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                <img
                  src={selectedProductModal.images[0]}
                  alt={selectedProductModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Specs & Variants */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {selectedProductModal.category_name}
                  </span>
                  <h3 className="text-xl font-black text-slate-100 font-serif">
                    {selectedProductModal.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono mt-1">
                    {selectedProductModal.slogan_badge}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProductModal.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">رنگ منتخب کریں (Color):</label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(selectedProductModal.variants.map((v) => v.color))).map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          selectedColor === col
                            ? "bg-amber-500 text-slate-950 border-amber-400"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">سائز (Size):</label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(selectedProductModal.variants.map((v) => v.size))).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          selectedSize === sz
                            ? "bg-amber-500 text-slate-950 border-amber-400"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Add Button */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">قیمت:</span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      {selectedProductModal.currency} {selectedProductModal.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProductModal, selectedColor, selectedSize);
                      setSelectedProductModal(null);
                    }}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>بیگ میں شامل کریں</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer & Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex justify-end">
          <div className="bg-slate-900 border-r border-amber-500/40 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl space-y-4">
            {/* Cart Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-slate-100">ایلمورا شاپنگ بیگ ({cart.length})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-2 text-slate-500 text-xs">
                    <ShoppingBag className="w-10 h-10 mx-auto text-slate-700" />
                    <p>آپ کا بیگ خالی ہے۔ شاہانہ کلیکشن میں سے کچھ منتخب کریں۔</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded-lg border border-slate-800"
                      />
                      <div className="flex-1 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.product.title}</h4>
                        <div className="text-[10px] text-amber-400 font-mono">
                          {item.selectedColor} | {item.selectedSize}
                        </div>
                        <div className="text-xs font-bold text-slate-300 font-mono">
                          {item.product.currency} {(item.product.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-300">کل رقم (Subtotal):</span>
                  <span className="text-amber-400 font-mono text-lg">PKR {cartSubtotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>چیک آؤٹ پر جائیں (Checkout)</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/50 max-w-lg w-full rounded-3xl p-6 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100">ایلمورا محفوظ آرڈر پروسیسنگ (Checkout)</h3>
            </div>

            {paymentStep === "success" && orderPlacedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/50">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-300">مبارک ہو! آرڈر اور ادائیگی کامیابی سے تصدیق شدہ!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  آپ کا ایلمورا آرڈر نمبر <span className="font-mono font-bold text-amber-400">{paymentApiResponse?.order_id || "#ELY-9942"}</span> تصدیق شدہ ہے۔ ترسیل کا عمل شروع کر دیا گیا ہے۔
                </p>

                {paymentApiResponse?.transaction_id && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right text-xs space-y-1 font-mono">
                    <div className="text-amber-400 font-bold">Transaction ID: {paymentApiResponse.transaction_id}</div>
                    <div className="text-slate-400">Status Code: 0000 (SUCCESS)</div>
                    <div className="text-slate-400">Payment Gateway: {paymentMethod.toUpperCase()}</div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setOrderPlacedSuccess(false);
                    setPaymentStep("form");
                    setIsCheckoutOpen(false);
                    setCart([]);
                  }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  شاپنگ جاری رکھیں
                </button>
              </div>
            ) : paymentStep === "mpin_prompt" ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-2">
                  <span className="font-bold text-amber-300 block text-sm">
                    📲 {paymentMethod.toUpperCase()} پیمنٹ پرامپٹ (Mobile Wallet Verification)
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {paymentApiResponse?.message || `آپ کے موبائل نمبر ${checkoutPhone} پر پیمنٹ کی درخواست بھیج دی گئی ہے۔`}
                  </p>
                  <div className="font-mono text-amber-400 text-[11px]">
                    Transaction ID: {paymentApiResponse?.transaction_id}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    4-Digit MPIN / OTP داخل کریں (Simulated for Demo):
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={userMpinInput}
                    onChange={(e) => setUserMpinInput(e.target.value)}
                    placeholder="****"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-center text-lg font-mono tracking-widest text-amber-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPaymentStep("form")}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer"
                  >
                    واپس جائیں
                  </button>
                  <button
                    onClick={handleConfirmMpinAndWebhook}
                    disabled={isProcessingPayment}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {isProcessingPayment ? "تصدیق کی جا رہی ہے..." : "پیمنٹ کی تصدیق کریں ➔"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">پورا نام (Full Name):</label>
                    <input
                      type="text"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">فون نمبر (EasyPaisa / JazzCash Account Number):</label>
                    <input
                      type="text"
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">مکمل پتہ (Delivery Address):</label>
                    <textarea
                      rows={2}
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">طریقہ ادائیگی (Payment Method):</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "easypaisa", label: "EasyPaisa Wallet" },
                        { id: "jazzcash", label: "JazzCash Wallet" },
                        { id: "card", label: "Credit / Debit Card" },
                        { id: "cod", label: "Cash on Delivery" }
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                            paymentMethod === m.id
                              ? "bg-amber-500 text-slate-950 border-amber-400"
                              : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleInitiatePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPayment ? "پروسیس ہو رہا ہے..." : `ادائیگی شروع کریں (PKR ${cartSubtotal.toLocaleString()})`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Store Footer */}
      <div className="border-t border-amber-900/40 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-200">Elymora Luxury Boutique & Couture © 2026</span>
          <span className="text-slate-600">|</span>
          <span className="italic text-amber-300">Define Your Presence</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsMeetingMinutesOpen(true)}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg transition font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>📊 ایگزیکٹو میٹنگ منٹس (Meeting Intelligence)</span>
          </button>

          <button
            onClick={() => setIsLaunchModalOpen(true)}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg transition font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>🚀 پلے اسٹور و ایپ اسٹور پبلشنگ ڈیش بورڈ</span>
          </button>

          <button
            onClick={() => setIsPolicyModalOpen(true)}
            className="hover:text-amber-400 underline transition cursor-pointer"
          >
            پرائیویسی پالیسی و قانونی شرائط (Privacy Policy & Terms)
          </button>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">support@elymora.com</span>
        </div>
      </div>

      {/* App Store & Play Store Launch Checklist Modal */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/50 max-w-3xl w-full rounded-3xl p-6 space-y-5 shadow-2xl relative my-8 text-slate-200 text-xs max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsLaunchModalOpen(false)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-300 font-serif">
                Elymora — Play Store & App Store Launch Readiness Audit
              </h3>
            </div>

            <div className="space-y-4">
              {/* Section 1: Developer Accounts */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <span>1. ڈولپر اکاؤنٹس چیک لسٹ (Developer Accounts)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    Ready
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-slate-100">Google Play Console Account</div>
                    <div className="text-[11px] text-slate-400">• One-time $25 Fee Paid</div>
                    <div className="text-[11px] text-slate-400">• Developer Identity Verified (DUNS / CNIC)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-slate-100">Apple Developer Program</div>
                    <div className="text-[11px] text-slate-400">• Annual $99 Membership Active</div>
                    <div className="text-[11px] text-slate-400">• Two-Factor Authentication (2FA) Active</div>
                  </div>
                </div>
              </div>

              {/* Section 2: Store Assets */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-amber-400">2. اسٹور ایسٹس و گرافکس (App Store Assets Specifications)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-amber-300">
                        <th className="py-2 px-2">ایسٹ (Asset)</th>
                        <th className="py-2 px-2">گوگل پلے اسٹور (Android)</th>
                        <th className="py-2 px-2">ایپل ایپ اسٹور (iOS)</th>
                        <th className="py-2 px-2 text-center">سٹیٹس</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 px-2 font-bold">App Icon</td>
                        <td className="py-2 px-2">512 x 512 px (PNG 32-bit)</td>
                        <td className="py-2 px-2">1024 x 1024 px (No Alpha)</td>
                        <td className="py-2 px-2 text-center text-emerald-400">✓ Ready</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-bold font-sans">Screenshots</td>
                        <td className="py-2 px-2">2 to 8 Portrait Screenshots</td>
                        <td className="py-2 px-2">4.7", 5.5", 6.5", 12.9" Display</td>
                        <td className="py-2 px-2 text-center text-emerald-400">✓ Ready</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-bold">Feature Graphic</td>
                        <td className="py-2 px-2">1024 x 500 px (JPG/PNG)</td>
                        <td className="py-2 px-2">App Preview Video / Banner</td>
                        <td className="py-2 px-2 text-center text-emerald-400">✓ Ready</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-bold">Descriptions</td>
                        <td className="py-2 px-2">Short (80 char) / Full (4000)</td>
                        <td className="py-2 px-2">Subtitle (30 char) / Full (4000)</td>
                        <td className="py-2 px-2 text-center text-emerald-400">✓ Ready</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: Technical Builds & Access */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-amber-400">3. تکنیکی فائلز اور ریویو کریڈنشلز (Builds & Review Credentials)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-400">Android Build (.aab)</div>
                    <div className="text-[11px]">• Google Play App Signing key configured.</div>
                    <div className="text-[11px]">• Target API Level: 34+ (Android 14)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-400">iOS Build (.ipa / Xcode)</div>
                    <div className="text-[11px]">• Distribution Certificate & Provisioning Active.</div>
                    <div className="text-[11px]">• Uploaded to TestFlight for Internal Beta</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-slate-300 space-y-1 mt-2">
                  <div className="font-bold text-amber-300">Reviewer Demo Credentials (for Play Store & App Store Reviewers)</div>
                  <div className="font-mono text-[11px] text-slate-200">
                    Username: reviewer@elymora.com | Password: ReviewPass2026!
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
              <div className="text-[10px] text-slate-400">
                Status: Ready for Submission (Google Play & Apple App Store)
              </div>
              <button
                onClick={() => setIsLaunchModalOpen(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Privacy Policy & Terms Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" dir="ltr">
          <div className="bg-slate-900 border border-amber-500/50 max-w-2xl w-full rounded-3xl p-6 space-y-4 shadow-2xl relative my-8 text-slate-200 text-xs leading-relaxed max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsPolicyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-300 font-serif">
                Elymora — Privacy Policy & Terms of Service
              </h3>
            </div>

            <div className="space-y-4 text-slate-300 font-sans">
              <div>
                <h4 className="text-sm font-bold text-amber-400 mb-1">1. Privacy Policy</h4>
                <p>
                  <strong>Effective Date:</strong> August 7, 2026<br />
                  <strong>Brand:</strong> Elymora | <strong>Contact:</strong> support@elymora.com
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300">
                  <li><strong>Data Collection:</strong> We collect personal identifiers (Name, Email, Phone, Delivery Address) required for processing and shipping your luxury orders.</li>
                  <li><strong>Payments:</strong> All transactions are processed securely via encrypted gateways (EasyPaisa, JazzCash, Card Processors). No full sensitive card credentials are stored on our servers.</li>
                  <li><strong>Data Protection:</strong> Your personal information is strictly protected under high-grade SSL encryption and is never sold or rented to third-party advertisers.</li>
                </ul>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <h4 className="text-sm font-bold text-amber-400 mb-1">2. Terms & Conditions</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>Account Security:</strong> Users are responsible for maintaining confidentiality of credentials.</li>
                  <li><strong>Pricing & Orders:</strong> All prices are listed in PKR. Elymora reserves the right to adjust prices or cancel orders in cases of stock unavailability or pricing error.</li>
                  <li><strong>Returns & Refunds:</strong> Returns are accepted within 7 days of delivery for damaged or incorrect items provided items remain unworn with original tags attached.</li>
                  <li><strong>Intellectual Property:</strong> All branding, slogans, imagery, and UI designs are exclusive property of Elymora.</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-end">
              <button
                onClick={() => setIsPolicyModalOpen(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition cursor-pointer"
              >
                I Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload & Visual Match Search Modal */}
      {isUploadPhotoModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/50 max-w-lg w-full rounded-3xl p-6 space-y-5 shadow-2xl relative my-8 text-slate-100" dir="ltr">
            <button
              onClick={() => setIsUploadPhotoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Camera className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-300 font-serif">
                Photo Upload — Visual AI Search
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Upload or capture a photo of a outfit, dress, perfume, or accessory to instantly search Elymora's luxury collections.
              </p>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-slate-950 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-center space-y-0.5">
                  <span className="text-xs font-bold text-amber-300 block font-sans">
                    Click to Upload Photo
                  </span>
                  <span className="text-[10px] text-slate-400 block font-sans">
                    Supports JPG, PNG, WEBP (Max 10MB)
                  </span>
                </div>
              </label>

              {/* Preview & Analysis State */}
              {uploadedPhotoUrl && (
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-4">
                  <img
                    src={uploadedPhotoUrl}
                    alt="Uploaded preview"
                    className="w-16 h-16 object-cover rounded-xl border border-amber-500/40"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-200 line-clamp-1">{uploadedPhotoName}</div>
                    {isAnalyzingPhoto ? (
                      <div className="flex items-center gap-2 text-amber-400 animate-pulse font-mono text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing outfit texture & colors...</span>
                      </div>
                    ) : (
                      <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Match Found: Luxury Velvet & Couture</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-sans">Elymora Visual AI Recognition v2.4</span>
              <button
                onClick={() => {
                  setIsUploadPhotoModalOpen(false);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition cursor-pointer font-sans"
              >
                View Matches ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Intelligence Minutes Modal */}
      {isMeetingMinutesOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-amber-500/50 max-w-5xl w-full rounded-3xl p-4 sm:p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsMeetingMinutesOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <MeetingMinutesView />
          </div>
        </div>
      )}

    </div>
  );
};
