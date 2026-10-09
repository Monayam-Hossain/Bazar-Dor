import ProductSections from "@/components/ProductSections";
import Hero from "@/components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      
        <Suspense fallback={<div>লোড হচ্ছে...</div>}>
          <Hero />
        </Suspense>
      <ProductSections />
    </div>
  );
}
