export default function InstagramSection() {
  return (
    <section className="py-24">

      <div className="container-custom">

        <h2 className="text-5xl font-bold text-center">
          Instagram
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-neutral-200 rounded-xl"
            />
          ))}

        </div>

      </div>
    </section>
  );
}