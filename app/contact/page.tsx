// app/contact/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { getContactData, ContactData } from "@/api/contact";
import { Newsletter } from "@/components/newsletter";

export default function ContactPage() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getContactData();
        if (res?.data) {
          setContact(res.data);
        }
      } catch (err) {
        console.error("Error al cargar la información de contacto:", err);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {contact?.title || "Get in Touch"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {contact?.subtitle ||
                "Have a question, suggestion, or just want to say hello? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible."}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you have a question about recipes, want to collaborate, or just want to share your cooking experience, we're here to help.
                </p>

                <div className="space-y-6">
                  {contact?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Email
                        </h3>
                        <p className="text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  )}

                  {contact?.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Location
                        </h3>
                        <p className="text-muted-foreground">{contact.address}</p>
                      </div>
                    </div>
                  )}

                  {contact?.schedule && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Working Hours
                        </h3>
                        <p className="text-muted-foreground">{contact.schedule}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Map Placeholder */}
                <div className="mt-10 aspect-video rounded-xl bg-secondary/50 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop"
                    alt="Location map"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-card p-8 lg:p-10 rounded-2xl shadow-sm border">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    {contact?.formTitle || "Send Us a Message"}
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mb-10">
                Find quick answers to common questions about PlatoSmart.
              </p>

              <div className="space-y-6 text-left">
                <div className="bg-card p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">
                    How can I submit my own recipe?
                  </h3>
                  <p className="text-muted-foreground">
                    We love featuring community recipes! Simply create an account and use our recipe submission form in your profile dashboard.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">
                    Can I save recipes for later?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! Once logged in, you can save any recipe to your personal cookbook by clicking the bookmark icon.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">
                    Are the nutritional values accurate?
                  </h3>
                  <p className="text-muted-foreground">
                    Our nutritional information is calculated based on standard ingredient databases. For dietary concerns, we recommend consulting with a nutritionist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Newsletter />

      <Footer />
    </div>
  );
}