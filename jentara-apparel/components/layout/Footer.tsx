import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">

      <Container>

        <div className="grid md:grid-cols-4 gap-12">

          <div>
            <h2 className="text-4xl font-bold">
              JENTARA
            </h2>

            <p className="mt-4 text-neutral-400">
              Premium streetwear with authentic identity.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Shop
            </h3>

            <ul className="space-y-2">
              <li>All Products</li>
              <li>Best Sellers</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Company
            </h3>

            <ul className="space-y-2">
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Legal
            </h3>

            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms</li>
              <li>Returns</li>
            </ul>
          </div>

        </div>

      </Container>

    </footer>
  );
}