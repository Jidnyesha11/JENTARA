const reviews = [
  {
    name: "Aarav Kumar",
    text: "Amazing quality and fit.",
  },
  {
    name: "Priya Sharma",
    text: "Premium fabric and design.",
  },
  {
    name: "Rohan Singh",
    text: "My favourite streetwear brand.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-neutral-50 py-24">

      <div className="container-custom">

        <h2 className="text-5xl font-bold text-center">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white p-8 rounded-xl shadow"
            >
              <p>{review.text}</p>

              <h4 className="mt-6 font-bold">
                {review.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}