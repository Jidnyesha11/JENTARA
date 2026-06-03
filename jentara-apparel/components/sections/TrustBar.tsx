import Container from "../layout/Container";

export default function TrustBar() {
  return (
    <section className="bg-[#4b1e1e] text-white">

      <Container>

        <div className="grid md:grid-cols-4 py-4 text-center">

          <div>PARTIAL COD AVAILABLE</div>

          <div>100% GENUINE PRODUCT</div>

          <div>100% SECURE PAYMENT</div>

          <div>FREE SHIPPING ₹999+</div>

        </div>

      </Container>

    </section>
  );
}