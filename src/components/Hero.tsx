'use client';

import Image from 'next/image';

export default function BazarHero() {

  const formattedDate = new Date().toLocaleString("bn-BD", {
      dateStyle: "full",
    });


  return (
    <section className="bg-[#f2f4f2] py-8 px-4 flex justify-center items-center">
    
      <div className="card w-full max-w-7xl bg-white shadow-sm border border-base-200 rounded-2xl p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 flex flex-col items-start space-y-4">
            
            <div className="inline-flex items-center gap-2 bg-[#e6f4ea] text-[#137333] px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#137333]"></span>
              {formattedDate || 'লোড হচ্ছে...'}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <a 
                href="#sob-ponyo" 
                className="btn bg-[#0d823a] hover:bg-[#0b6b30] text-white border-none px-6 rounded-xl font-normal shadow-md inline-flex items-center justify-center"
              >
                সব পণ্য দেখুন
              </a>
            </div>

          </div>

          <div className="md:col-span-5 flex justify-center items-center w-full">
            <Image
              src="/images/bazar-hero.png"
              alt="Bazar Hero Illustration"
              width={400}
              height={300}
              className="w-full h-auto max-h-56 object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}