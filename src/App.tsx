import React, { useState } from 'react';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  CreditCard,
  Upload
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

type TabType = 'home' | 'mens' | 'womens' | 'oud' | 'exclusive' | 'checkout';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cart, setCart] = useState<{ id: number; name: string; price: number; image: string; quantity: number }[]>([
    { id: 1, name: "عطر 'كهرُمان' الملكي", price: 499, image: "images/prod-1.jfif", quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // حالة الدفع في السعودية
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'stcpay' | 'rajhi' | 'tamara'>('mada');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState<string>('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    city: 'الرياض',
    address: ''
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`تمت إضافة "${product.name}" إلى السلة`);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
          .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setReceiptImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptImage) {
      alert('يرجى إرفاق صورة إيصال التحويل (Screenshot) لإتمام الطلب.');
      return;
    }
    setOrderConfirmed(true);
  };

  const pageData: Record<Exclude<TabType, 'checkout'>, {
    title: string;
    subtitle: string;
    cta: string;
    heroImage: string;
    products: Product[];
  }> = {
    home: {
      title: "رحلة عطريّة: اكتشف الفخامة المطلقة",
      subtitle: "تجسيد للأناقة والجاذبية من SAMOU ROYALE",
      cta: "تسوّق الآن",
      heroImage: "images/hero-banner.jfif",
      products: [
        { id: 1, name: "عطر 'كهرُمان' الملكي", price: 499, rating: 5.0, image: "images/prod-1.jfif" },
        { id: 2, name: "كسرات عود فاخرة", price: 750, rating: 5.0, image: "images/prod-2.jfif" },
        { id: 3, name: "عطر 'شرقي' للجنسين", price: 389, rating: 5.0, image: "images/prod-3.jfif" },
        { id: 4, name: "مبخرة عصرية مع بخور", price: 599, rating: 4.6, image: "images/prod-4.jfif" },
      ]
    },
    mens: {
      title: "تشكيلة العطور الرجالية: هيبة ونفوذ",
      subtitle: "عطور خشبية وشرقية مخصصة للرجل العصري",
      cta: "تسوّق الآن",
      heroImage: "images/hero-mens.jfif",
      products: [
        { id: 101, name: "عطر سـيفرين بلاك", price: 549, rating: 5.0, image: "images/prod-3.jfif" },
        { id: 102, name: "عطر كهرُمان إنتنس", price: 620, rating: 4.9, image: "images/prod-1.jfif" },
        { id: 103, name: "عطر إميرالد ليدر", price: 480, rating: 5.0, image: "images/prod-3.jfif" },
        { id: 104, name: "عطر فانتوم وودز", price: 425, rating: 4.8, image: "images/prod-1.jfif" },
      ]
    },
    womens: {
      title: "عالم الأناقة النسائية: لمسات من السحر",
      subtitle: "توليفات زهرية وسكرية ناعمة تأسر الحواس",
      cta: "تسوّق الآن",
      heroImage: "images/hero-womens.jfif",
      products: [
        { id: 201, name: "عطر روز نوبل", price: 460, rating: 5.0, image: "images/prod-1.jfif" },
        { id: 202, name: "عطر فيلفيت أوركيد", price: 520, rating: 4.9, image: "images/prod-3.jfif" },
        { id: 203, name: "عطر فانيلا دي لوميير", price: 390, rating: 5.0, image: "images/prod-1.jfif" },
        { id: 204, name: "عطر بلانش مسك", price: 440, rating: 4.9, image: "images/prod-3.jfif" },
      ]
    },
    oud: {
      title: "أصالة العود والبخور: عبق التراث",
      subtitle: "أجود أنواع العود الطبيعي والمباخر الذكية",
      cta: "تسوّق الآن",
      heroImage: "images/hero-oud.jfif",
      products: [
        { id: 301, name: "كسرات عود موروكي", price: 750, rating: 5.0, image: "images/prod-2.jfif" },
        { id: 302, name: "تولة دهن عود هندي", price: 890, rating: 5.0, image: "images/prod-1.jfif" },
        { id: 303, name: "مبخرة عصرية مع بخور", price: 599, rating: 4.6, image: "images/prod-4.jfif" },
        { id: 304, name: "مبخرة ذكية متنقلة", price: 680, rating: 4.9, image: "images/prod-4.jfif" },
      ]
    },
    exclusive: {
      title: "المجموعات الحصرية: إصدارات محدودة",
      subtitle: "صناديق هدايا فاخرة تحتوي على أندر المزيجات العطرية",
      cta: "تسوّق الآن",
      heroImage: "images/hero-exclusive.jfif",
      products: [
        { id: 401, name: "صندوق النخبة الملكي", price: 1450, rating: 5.0, image: "images/hero-exclusive.jfif" },
        { id: 402, name: "ثلاثية نوكتورن الذهبية", price: 1150, rating: 5.0, image: "images/hero-banner.jfif" },
        { id: 403, name: "طقم الضيافة والبخور", price: 920, rating: 4.9, image: "images/prod-4.jfif" },
        { id: 404, name: "صندوق العروسين الفاخر", price: 1680, rating: 5.0, image: "images/hero-exclusive.jfif" },
      ]
    }
  };

  const currentConfig = activeTab !== 'checkout' ? pageData[activeTab] : pageData.home;

  return (
    <div className="bg-[#E2ECE6] p-2 sm:p-4 md:p-6 min-h-screen flex items-center justify-center font-['Tajawal',sans-serif] antialiased selection:bg-[#E5A855]/30 selection:text-[#0D231C]">
      
      {/* 1. الحاوية الرئيسية بعرض max-w-6xl وخلفية بيج دافئة وحواف منحنية rounded-3xl */}
      <div className="w-full max-w-6xl mx-auto bg-[#F4F8F5] rounded-3xl shadow-xl border border-[#CFE0D7] overflow-hidden flex flex-col justify-between min-h-[92vh] sm:min-h-[90vh]">
        
        {/* شريط التنقل العلوي (Navbar) */}
        <header className="w-full pt-5 pb-3 px-6 sm:px-10 border-b border-[#DFECE4]/80">
          <div className="flex items-center justify-between">
            
            {/* الشعار على اليسار بالخط الإنجليزي الفاخر SAMOU ROYALE مع الأيقونة */}
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2.5 text-left group"
            >
              <img src="images/logo.svg" alt="SAMOU ROYALE" className="h-9 w-auto object-contain" onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }} />
              <span className="font-['Cinzel',serif] text-xl sm:text-2xl font-extrabold tracking-wider text-[#0D231C] group-hover:text-[#E5A855] transition-colors">
                SAMOU <span className="text-[#E5A855]">ROYALE</span>
              </span>
            </button>

            {/* روابط الأقسام على اليمين باللغة العربية */}
            <nav className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold font-['Cairo',sans-serif] text-[#0D231C]">
              <button 
                onClick={() => setActiveTab('home')}
                className={`pb-1 transition-all ${activeTab === 'home' ? 'border-b-2 border-[#0D231C] font-bold text-[#081511]' : 'opacity-75 hover:opacity-100'}`}
              >
                الرئيسية
              </button>
              <button 
                onClick={() => setActiveTab('mens')}
                className={`pb-1 transition-all ${activeTab === 'mens' ? 'border-b-2 border-[#0D231C] font-bold text-[#081511]' : 'opacity-75 hover:opacity-100'}`}
              >
                عطور رجالية
              </button>
              <button 
                onClick={() => setActiveTab('womens')}
                className={`pb-1 transition-all ${activeTab === 'womens' ? 'border-b-2 border-[#0D231C] font-bold text-[#081511]' : 'opacity-75 hover:opacity-100'}`}
              >
                عطور نسائية
              </button>
              <button 
                onClick={() => setActiveTab('oud')}
                className={`pb-1 transition-all ${activeTab === 'oud' ? 'border-b-2 border-[#0D231C] font-bold text-[#081511]' : 'opacity-75 hover:opacity-100'}`}
              >
                بذور وعود
              </button>
              <button 
                onClick={() => setActiveTab('exclusive')}
                className={`pb-1 transition-all ${activeTab === 'exclusive' ? 'border-b-2 border-[#0D231C] font-bold text-[#081511]' : 'opacity-75 hover:opacity-100'}`}
              >
                مجموعات حصرية
              </button>

              {/* زر سلة التسوق */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-1 text-[#0D231C] hover:text-[#E5A855] transition-colors"
                title="سلة التسوق"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#13382D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>

          </div>
        </header>

        {/* 2. قسم الهيرو الرئيسي المدمج والمترابط */}
        {activeTab !== 'checkout' ? (
          <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-3">
            <div className="w-full flex flex-col items-center">
              
              {/* أ. التنسيق الرأسي الملموم للنصوص والزر (Compact Vertical Spacing) */}
              <div className="text-center space-y-1 mb-1 z-20">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D231C] font-['Cairo',sans-serif] tracking-tight">
                  {currentConfig.title}
                </h1>
                
                <p className="text-xs sm:text-sm text-[#1C4336] font-['Tajawal',sans-serif] font-medium mb-3">
                  {currentConfig.subtitle}
                </p>

                {/* زر تسوق الآن بحجم أنيق ومدمج */}
                <div className="pt-1">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('products-row');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-7 py-2 rounded-lg bg-[#13382D] hover:bg-[#0E2820] text-white text-xs sm:text-sm font-bold font-['Cairo',sans-serif] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {currentConfig.cta}
                  </button>
                </div>
              </div>

              {/* ب. صورة العطور الرئيسية المندمجة أسفل الزر بحجم متناسق بدون مساحات عشوائية */}
              <div className="w-full max-w-md mx-auto flex justify-center -mt-4 sm:-mt-6 -mb-6 z-0 pointer-events-none">
                <img 
                  src={currentConfig.heroImage} 
                  alt="تشكيلة عطور SAMOU ROYALE الفاخرة" 
                  className="max-h-44 sm:max-h-52 object-contain mix-blend-multiply opacity-95 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "images/hero-banner.jfif";
                  }}
                />
              </div>

              {/* ج. تداخل كروت المنتجات الأربعة في شبكة 4 أعمدة (Overlapping Product Cards) */}
              <div id="products-row" className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-1 z-10">
                {currentConfig.products.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#E3EDE7] cursor-pointer group hover:-translate-y-1"
                  >
                    {/* صورة المنتج في المنتصف بخلفية بيضاء نقية */}
                    <div className="w-full aspect-square flex items-center justify-center p-2 mb-1.5 bg-white rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-28 sm:max-h-32 max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).src = "images/prod-1.jfif"; }}
                      />
                    </div>

                    {/* اسم المنتج */}
                    <div className="text-center px-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#081511] font-['Cairo',sans-serif] truncate">
                        {item.name}
                      </h3>
                    </div>

                    {/* السطر السفلي: التقييم على اليسار والسعر على اليمين */}
                    <div className="mt-3 pt-2 border-t border-[#EBF3ED] flex items-center justify-between text-xs font-semibold text-[#4A382E]">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <span>★</span>
                        <span>{item.rating.toFixed(1)}</span>
                      </div>

                      <div className="font-bold text-[#0D231C] font-['Cairo',sans-serif]">
                        <span>{item.price}</span> <span className="text-[10px]">ر.س</span>
                      </div>
                    </div>

                    {/* تلميح الإضافة عند التمرير */}
                    <div className="mt-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-[#E5A855]">اضغط للإضافة للسلة +</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </main>
        ) : (
          /* صفحة إتمام الطلب والدفع عند اختيارها */
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#D6E6DC] space-y-6">
              <div className="flex items-center justify-between border-b border-[#E9F2ED] pb-3">
                <h2 className="text-xl font-bold font-['Cairo'] text-[#0D231C]">إتمام الطلب وتأكيد الحوالة</h2>
                <button onClick={() => setActiveTab('home')} className="text-xs text-[#E5A855] font-bold hover:underline">
                  ← العودة للمتجر
                </button>
              </div>

              {orderConfirmed ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold font-['Cairo'] text-[#0D231C]">تم تأكيد طلبكم بنجاح!</h3>
                  <p className="text-xs text-[#4A6B60] max-w-xs mx-auto">
                    رقم الطلب: <span className="font-bold text-[#0D231C]">#VE-2026-981</span>. سيتم مراجعة إيصال التحويل وشحن طلبكم فوراً.
                  </p>
                  <button 
                    onClick={() => {
                      setOrderConfirmed(false);
                      setCart([]);
                      setActiveTab('home');
                    }}
                    className="px-6 py-2.5 bg-[#13382D] text-white rounded-xl text-xs font-bold hover:bg-[#0E2820]"
                  >
                    العودة للرئيسية
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="p-3.5 bg-[#F4F8F5] rounded-xl border border-[#D6E6DC] flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-bold text-[#0D231C]">إجمالي الطلب المستحق:</span>
                    <span className="font-extrabold text-[#E5A855] text-base">{cartTotal} ر.س</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold mb-1">الاسم بالكامل *</label>
                      <input 
                        type="text" 
                        required 
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                        placeholder="اسم المستلم" 
                        className="w-full p-2.5 rounded-lg border border-[#D6E6DC] text-xs" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">رقم الجوال السعودي *</label>
                      <input 
                        type="tel" 
                        required 
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        placeholder="05XXXXXXXX" 
                        pattern="^05[0-9]{8}$"
                        className="w-full p-2.5 rounded-lg border border-[#D6E6DC] text-xs dir-ltr text-left" 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold mb-1">المدينة بالمملكة *</label>
                      <select 
                        value={customerData.city}
                        onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#D6E6DC] text-xs bg-white"
                      >
                        <option value="الرياض">الرياض</option>
                        <option value="جدة">جدة</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                        <option value="الدمام / الخبر">الدمام / الخبر</option>
                        <option value="الأحساء">الأحساء</option>
                        <option value="الطائف">الطائف</option>
                        <option value="القصيم / بريدة">القصيم / بريدة</option>
                        <option value="أبها">أبها</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold mb-1">العنوان الوطني بالتفصيل *</label>
                      <input 
                        type="text" 
                        required 
                        value={customerData.address}
                        onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                        placeholder="الحي، الشارع، رقم المبنى، الرمز البريدي" 
                        className="w-full p-2.5 rounded-lg border border-[#D6E6DC] text-xs" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#E9F2ED]">
                    <h4 className="text-xs font-bold text-[#0D231C]">بوابة الدفع المعتمدة بالمملكة:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mada')}
                        className={`p-2.5 rounded-xl border text-right transition-all ${paymentMethod === 'mada' ? 'border-[#E5A855] bg-[#E5A855]/10' : 'border-[#D6E6DC]'}`}
                      >
                        <p className="text-xs font-bold text-emerald-800">مدى & أبل باي</p>
                        <p className="text-[10px] text-[#4A6B60]">فوري وآمن</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('stcpay')}
                        className={`p-2.5 rounded-xl border text-right transition-all ${paymentMethod === 'stcpay' ? 'border-[#E5A855] bg-[#E5A855]/10' : 'border-[#D6E6DC]'}`}
                      >
                        <p className="text-xs font-bold text-purple-700">STC Pay</p>
                        <p className="text-[10px] text-[#4A6B60]">0509876543</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('rajhi')}
                        className={`p-2.5 rounded-xl border text-right transition-all ${paymentMethod === 'rajhi' ? 'border-[#E5A855] bg-[#E5A855]/10' : 'border-[#D6E6DC]'}`}
                      >
                        <p className="text-xs font-bold text-blue-800">مصرف الراجحي</p>
                        <p className="text-[10px] text-[#4A6B60]">حساب آيبان</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('tamara')}
                        className={`p-2.5 rounded-xl border text-right transition-all ${paymentMethod === 'tamara' ? 'border-[#E5A855] bg-[#E5A855]/10' : 'border-[#D6E6DC]'}`}
                      >
                        <p className="text-xs font-bold text-amber-800">تمارا / تابي</p>
                        <p className="text-[10px] text-[#4A6B60]">4 دفعات</p>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0D231C]">
                        رفع صورة إيصال التحويل (Screenshot) *
                      </label>
                      <div 
                        onClick={() => document.getElementById('receiptAppInput')?.click()}
                        className="border-2 border-dashed border-[#D6E6DC] hover:border-[#E5A855] rounded-xl p-4 text-center cursor-pointer bg-[#F4F8F5]"
                      >
                        <input 
                          type="file" 
                          id="receiptAppInput" 
                          accept="image/*" 
                          onChange={handleReceiptUpload} 
                          className="hidden" 
                        />
                        {receiptImage ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={receiptImage} alt="Receipt" className="h-12 w-auto rounded border" />
                            <div className="text-right">
                              <span className="text-xs text-emerald-700 font-bold">✓ تم إرفاق الإيصال بنجاح</span>
                              <p className="text-[11px] text-[#4A6B60]">{receiptName}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-5 h-5 text-[#E5A855] mx-auto" />
                            <p className="text-xs font-bold text-[#0D231C]">اضغط لرفع لقطة الشاشة لرسالة التحويل</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-[#13382D] hover:bg-[#0E2820] text-white font-bold font-['Cairo'] rounded-xl shadow-sm transition-colors text-xs sm:text-sm"
                  >
                    تأكيد الطلب وشحن العطور
                  </button>
                </form>
              )}
            </div>
          </main>
        )}

        {/* 3. الفوتر (Footer) */}
        <footer className="w-full py-4 px-6 sm:px-10 border-t border-[#DFECE4]/80">
          <div className="flex items-center justify-between">
            <div className="font-['Cinzel',serif] text-lg sm:text-xl font-bold tracking-wider text-[#0D231C]">
              SAMOU ROYALE
            </div>
            <div className="hidden sm:block font-['Cinzel',serif] text-lg sm:text-xl font-bold tracking-wider text-[#0D231C]">
              SAMOU ROYALE
            </div>
            <div className="flex items-center gap-2 text-[#0D231C] opacity-75">
              <div className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full border border-[#0D231C] inline-block -mr-1"></span>
                <span className="w-3.5 h-3.5 rounded-full border border-[#0D231C] inline-block"></span>
              </div>
              <CreditCard className="w-4 h-4 ml-1" />
            </div>
          </div>
        </footer>

      </div>

      {/* درج سلة التسوق المنبثقة */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#E9F2ED]">
                <h3 className="font-bold font-['Cairo'] text-lg text-[#0D231C]">سلة المشتريات</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-[#4A6B60] py-12">السلة فارغة حالياً</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F4F8F5] border border-[#D6E6DC]">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded bg-white" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#0D231C] truncate font-['Cairo']">{item.name}</p>
                        <p className="text-xs text-[#E5A855] font-bold">{item.price} ر.س</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded bg-white border text-xs font-bold">-</button>
                          <span className="text-xs px-1 font-bold">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded bg-white border text-xs font-bold">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#E9F2ED] space-y-3">
                <div className="flex justify-between font-bold text-base text-[#0D231C]">
                  <span>الإجمالي:</span>
                  <span>{cartTotal} ر.س</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('checkout');
                  }}
                  className="w-full py-3 bg-[#13382D] hover:bg-[#0E2820] text-white font-bold font-['Cairo'] text-sm rounded-xl shadow-md transition-colors"
                >
                  إتمام الطلب والدفع
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* توست سريع */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D231C] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xl border border-[#E5A855]/30 flex items-center gap-2 animate-in fade-in">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
