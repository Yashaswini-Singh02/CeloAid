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

      <Image
        className="rounded-2xl mx-auto"
        src={"/assets/landing/hero.svg"}
        alt="investing"
        width={600}
        height={600}
      />
    </div>
  );
};
