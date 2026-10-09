import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}


const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );
  const datas: IProduct[] = await res.json();

  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-white border-b border-gray-200 shadow-sm">
      <div>
        <div className="py-2.5">
          <MarqueeText
            direction="right"
            duration={20}
            pauseOnHover={true}
            className="flex items-center"
          >
            {datas.map((data, index) => (
              <div
                key={data.id}
                className={`flex items-center gap-2.5 px-4 py-1.5 ${
                  index !== datas.length - 1
                    ? "border-r border-gray-300"
                    : ""
                }`}
              >
                
                <span className="text-xl leading-none">{data.image}</span>

                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {data.nameBn}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {(data.today)} টাকা/{data.unit}
                  </span>
                </div>

                
                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    data.change.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {data.change.dir === "up" ? (
                    <FaCaretUp className="text-xs" />
                  ) : (
                    <FaCaretDown className="text-xs" />
                  )}
                  <span>{(data.change.pct)}%</span>
                </div>
              </div>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;