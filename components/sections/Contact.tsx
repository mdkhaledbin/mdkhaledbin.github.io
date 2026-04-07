"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, GitBranch, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ContactStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "project",
    message: "",
  });
  const [status, setStatus] = useState<ContactStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mdkhaledbin1221@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "project", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      className="bg-neutral-50 py-20 dark:bg-neutral-900/50"
      id="contact"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-heading mb-4 font-bold">
            Let&apos;s Build Together
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
            Whether you need an AI-native workflow, a resilient product
            platform, or a strategic engineering partner, I am ready to
            collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Card className="border-neutral-200 p-6 dark:border-neutral-800">
              <div className="mb-4 flex items-start gap-3">
                <Mail className="mt-1 text-primary" size={20} />
                <div>
                  <h3 className="mb-1 font-medium">Email</h3>
                  <a
                    href="mailto:mdkhaledbin1221@gmail.com"
                    className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-400"
                  >
                    mdkhaledbin1221@gmail.com
                  </a>
                </div>
              </div>

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="mt-1 text-primary" size={20} />
                <div>
                  <h3 className="mb-1 font-medium">Location</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sylhet, Bangladesh
                    <br />
                    <span className="text-xs">Available for remote work</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-primary" size={20} />
                <div>
                  <h3 className="mb-1 font-medium">Response Time</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-neutral-200 p-6 dark:border-neutral-800">
              <h3 className="mb-4 font-medium">Connect Elsewhere</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/mdkhaledbin"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400"
                >
                  <GitBranch size={18} />
                  <span>github.com/mdkhaledbin</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/md-khaled-bin-814a4b225/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400"
                >
                  <Briefcase size={18} />
                  <span>MD Khaled Bin</span>
                </a>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-neutral-200 p-8 dark:border-neutral-800">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-neutral-800 dark:bg-neutral-900"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-neutral-800 dark:bg-neutral-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(event) =>
                      setFormData({ ...formData, subject: event.target.value })
                    }
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <option value="project">Project Inquiry</option>
                    <option value="job">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({ ...formData, message: event.target.value })
                    }
                    className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-neutral-800 dark:bg-neutral-900"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <Send size={16} className="ml-2" />
                </Button>

                {status === "success" ? (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Message sent successfully. I will get back to you soon.
                  </p>
                ) : null}

                {status === "error" ? (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Failed to send message. Please try again or email directly.
                  </p>
                ) : null}
              </motion.form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
