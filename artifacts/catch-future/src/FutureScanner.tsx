export default function FutureScanner() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-6">
          Future Scanner
        </h1>

        <p className="text-xl mb-10">
          اكتشف مدى جاهزيتك للمستقبل باستخدام الذكاء الاصطناعي
        </p>

        <div className="space-y-8">

          <div>
            <h2 className="font-semibold mb-3">
              ما مجالك الحالي؟
            </h2>

            <select className="w-full p-3 border rounded-xl">
              <option>التكنولوجيا</option>
              <option>الأعمال</option>
              <option>التعليم</option>
              <option>الصحة</option>
              <option>الصناعة</option>
            </select>
          </div>

          <button className="px-6 py-3 rounded-xl">
            تحليل مستقبلي
          </button>

        </div>

      </div>
    </main>
  );
}
