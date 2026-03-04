import { Helmet } from "react-helmet-async";
import ContactSection from "@/components/shared/ContactSection";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Volasec</title>
        <meta
          name="description"
          content="Book a strategy call or send us a message. Cloud security architecture for high-stakes environments."
        />
      </Helmet>

      <div className="pt-20">
        <ContactSection />
      </div>
    </>
  );
}
