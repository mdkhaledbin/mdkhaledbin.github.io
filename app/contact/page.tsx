import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact | MD Khaled Bin",
  description:
    "Get in touch for project inquiries, collaborations, or opportunities.",
};

export default function ContactPage() {
  return (
    <div className="pt-4">
      <Contact />
    </div>
  );
}
