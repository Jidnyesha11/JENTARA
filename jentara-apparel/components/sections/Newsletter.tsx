export default function Newsletter() {
  return (
    <section className="bg-[#4b1e1e] text-white py-20">

      <div className="container-custom text-center">

        <h2 className="text-4xl font-bold">
          Join The Community
        </h2>

        <p className="mt-4">
          Get updates on new arrivals and exclusive drops.
        </p>

        <div className="max-w-xl mx-auto flex mt-8">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-4 text-black"
          />

          <button className="bg-black px-8">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}