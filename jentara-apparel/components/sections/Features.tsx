import Container from "../layout/Container";

const items = [
  {
    title: "Perfect Oversized Fit",
    desc: "Comfort, structure and street presence.",
  },
  {
    title: "High Quality Fabric",
    desc: "Premium fabric built for everyday wear.",
  },
  {
    title: "Premium Print Quality",
    desc: "Long lasting prints with crisp detailing.",
  },
];

export default function Features() {
  return (
    <section className="py-24">

      <Container>

        <div className="grid md:grid-cols-3 gap-12">

          {items.map((item) => (
            <div
              key={item.title}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-neutral-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}