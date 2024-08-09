import Image from "next/image";
import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <div className="h-screen p-24">
      <div className="flex flex-col gap-y-6 justify-center items-center">
        <h1 className="text-7xl max-w-5xl tracking-wide">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-xl text-yellow-300 tracking-widest max-w-3xl text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </p>
        <Link href={"/dashboard"}>
          <button className="text-3xl border border-white rounded-full px-8 py-4 mt-8">
            Get Started
          </button>
        </Link>
      </div>
      <div className="flex justify-center py-10">
        {/* <Image
          className="py-20"
          src={"/assets/landing/coins.svg"}
          alt="coins"
          width={400}
          height={400}
        /> */}
        <Image
          className="rounded-2xl "
          src={"/assets/landing/hero.svg"}
          alt="investing"
          width={600}
          height={600}
        />
        {/* <Image
          className="py-20"
          src={"/assets/landing/coins.svg"}
          alt="coins"
          width={400}
          height={400}
        /> */}
      </div>
    </div>
  );
};
