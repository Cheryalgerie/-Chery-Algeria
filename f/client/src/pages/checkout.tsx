import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { algeriaWilayas, algeriaCommunesByWilaya, type OrderFormData } from "@shared/algeria-data";

export default function Checkout() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    wilayaId: "",
    commune: "",
    address: "",
    productId: id || "",
    selectedSize: "",
    quantity: 1
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
          <Link href="/" className="text-gray-400 hover:text-white">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const selectedWilaya = algeriaWilayas.find(w => w.id === formData.wilayaId);
  const availableCommunes = formData.wilayaId ? algeriaCommunesByWilaya[formData.wilayaId] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone || 
        !formData.wilayaId || !formData.commune || !formData.selectedSize) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // محاكاة إرسال الطلب
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "تم تأكيد طلبك!",
      description: "سيتم التواصل معك قريباً لتأكيد التفاصيل"
    });
  };

  const updateFormData = (field: keyof OrderFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // إعادة تعيين البلدية عند تغيير الولاية
      ...(field === 'wilayaId' ? { commune: '' } : {})
    }));
  };

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">تم تأكيد طلبك!</h2>
          <p className="text-gray-400 mb-6">
            شكراً لك! تم استلام طلبك بنجاح. سيتم التواصل معك خلال 24 ساعة لتأكيد التفاصيل وترتيب التوصيل.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-6 text-right">
            <h3 className="font-bold mb-2">تفاصيل الطلب:</h3>
            <p className="text-sm text-gray-300">
              المنتج: {product.name}<br/>
              المقاس: {formData.selectedSize}<br/>
              الكمية: {formData.quantity}<br/>
              العميل: {formData.firstName} {formData.lastName}<br/>
              الهاتف: {formData.phone}<br/>
              الولاية: {selectedWilaya?.ar_name}<br/>
              البلدية: {formData.commune}
            </p>
          </div>
          <Link href="/" className="inline-block bg-white text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors">
            العودة للتسوق
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link href={`/product/${id}`} className="text-white hover:text-gray-400">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-montserrat font-bold">إتمام الطلب</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">ملخص المنتج</h2>
            <div className="bg-gray-900 p-6 rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-white mb-4">
                DA {parseFloat(product.price).toLocaleString()}
              </p>
              
              {/* Size Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">اختر المقاس *</label>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFormData('selectedSize', size)}
                      className={`w-12 h-12 rounded border-2 font-medium transition-all ${
                        formData.selectedSize === size
                          ? "bg-white text-black border-white"
                          : "border-gray-600 text-white hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">الكمية</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateFormData('quantity', Math.max(1, formData.quantity - 1))}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400"
                  >
                    -
                  </button>
                  <span className="text-lg min-w-[3rem] text-center">{formData.quantity}</span>
                  <button
                    onClick={() => updateFormData('quantity', formData.quantity + 1)}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">معلومات التوصيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اللقب *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                    placeholder="أدخل لقبك"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                  placeholder="مثال: 0555 123 456"
                  required
                />
              </div>

              {/* Wilaya Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">الولاية *</label>
                <select
                  value={formData.wilayaId}
                  onChange={(e) => updateFormData('wilayaId', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                  required
                >
                  <option value="">اختر الولاية</option>
                  {algeriaWilayas.map((wilaya) => (
                    <option key={wilaya.id} value={wilaya.id}>
                      {wilaya.code.padStart(2, '0')} - {wilaya.ar_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commune Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">البلدية *</label>
                <select
                  value={formData.commune}
                  onChange={(e) => updateFormData('commune', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                  disabled={!formData.wilayaId}
                  required
                >
                  <option value="">اختر البلدية</option>
                  {availableCommunes.map((commune) => (
                    <option key={commune} value={commune}>
                      {commune}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2">العنوان التفصيلي</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
                  placeholder="رقم المنزل، اسم الشارع، معلومات إضافية..."
                  rows={3}
                />
              </div>

              {/* Total */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>المجموع:</span>
                  <span>DA {(parseFloat(product.price) * formData.quantity).toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}