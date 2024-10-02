import Image from "next/image";

export default function About() {
  return (
    <>
        <div className="text-3xl flex justify-center">
            About Us
        </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-14 mt-8">
        <div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div><div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div><div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div><div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div><div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div><div className="">
          <Image src="/search.svg" height={20} width={20} alt="search" />
          <h3>Innovation</h3>
          <p>
            Create a multilingual AI-driven symptom checker that understands
            multiple Indian languages.
          </p>
        </div>
      </div>
    </>
  );
}
