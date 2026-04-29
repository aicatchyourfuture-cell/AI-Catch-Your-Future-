import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useCreateInquiry } from "@workspace/api-client-react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

type InquiryType = "lookbook" | "trade" | "general";

const INQUIRY_OPTIONS: ReadonlyArray<{
  value: InquiryType;
  label: string;
  description: string;
}> = [
  {
    value: "lookbook",
    label: "Request the Lookbook",
    description: "A private viewing of the current Puresar collection.",
  },
  {
    value: "trade",
    label: "Trade & Wholesale",
    description: "For ateliers, designers, and considered retailers.",
  },
  {
    value: "general",
    label: "General Correspondence",
    description: "Press, partnerships, and bespoke commissions.",
  },
];

export function Inquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("lookbook");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useCreateInquiry({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setInquiryType("lookbook");
      },
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutation.isPending) return;

    mutation.mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
        inquiryType,
        message: message.trim(),
      },
    });
  };

  const errorMessage = mutation.isError
    ? "Something went wrong. Please try again in a moment."
    : null;

  return (
    <section
      id="inquiry"
      className="relative w-full bg-forest text-cream weave-texture overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-1/2 bg-beige hidden lg:block" />

      <div className="container relative z-10 mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            className="text-forest lg:pr-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
          >
            <p className="text-sm uppercase tracking-[0.25em] font-sans text-forest/60 mb-6">
              Begin the Correspondence
            </p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-8">
              Be in <span className="italic text-gold">touch</span>.
            </h2>
            <p className="font-serif italic text-xl text-forest/75 mb-8 max-w-md">
              Sovereign by craft. Inherited by invitation.
            </p>
            <div className="font-sans text-forest/80 leading-relaxed space-y-5 max-w-md">
              <p>
                Puresar is released in small, considered editions. Share a few
                words about your interest and a member of our atelier will write
                back personally, often within two working days.
              </p>
              <p>
                For pieces requiring private commission or specific provenance,
                please mention it in your message.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-forest/15 grid grid-cols-2 gap-8 max-w-md">
              <div>
                <p className="text-xs uppercase tracking-widest font-sans text-forest/50 mb-2">
                  Atelier
                </p>
                <p className="font-serif text-forest">
                  atelier@catchfuture.com
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-sans text-forest/50 mb-2">
                  Studio
                </p>
                <p className="font-serif text-forest">Bengaluru, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <div className="absolute -top-3 -left-3 right-3 bottom-3 border border-gold/40 hidden md:block" />
            <div className="relative bg-cream text-forest p-8 md:p-12 shadow-2xl">
              {submitted ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="min-h-[28rem] flex flex-col justify-center text-center"
                >
                  <p className="text-xs uppercase tracking-[0.25em] font-sans text-gold mb-6">
                    Received with care
                  </p>
                  <h3 className="font-serif text-4xl leading-tight mb-6">
                    Thank you.
                  </h3>
                  <p className="font-sans text-forest/75 leading-relaxed max-w-sm mx-auto mb-10">
                    Your note has reached the atelier. We read every message
                    personally and will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-[0.25em] font-sans text-forest/70 hover:text-gold transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <p className="text-xs uppercase tracking-[0.25em] font-sans text-gold">
                    Private Inquiry
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-widest font-sans text-forest/60 mb-3"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-forest/20 pb-3 font-serif text-lg text-forest placeholder:text-forest/30 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Anaya Mehta"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-widest font-sans text-forest/60 mb-3"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-forest/20 pb-3 font-serif text-lg text-forest placeholder:text-forest/30 focus:outline-none focus:border-gold transition-colors"
                        placeholder="anaya@studio.com"
                      />
                    </div>

                    <fieldset>
                      <legend className="block text-xs uppercase tracking-widest font-sans text-forest/60 mb-4">
                        Nature of inquiry
                      </legend>
                      <div className="space-y-3">
                        {INQUIRY_OPTIONS.map((option) => {
                          const selected = inquiryType === option.value;
                          return (
                            <label
                              key={option.value}
                              className={`group relative flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                                selected
                                  ? "border-gold bg-gold/5"
                                  : "border-forest/15 hover:border-forest/30"
                              }`}
                            >
                              <input
                                type="radio"
                                name="inquiryType"
                                value={option.value}
                                checked={selected}
                                onChange={() => setInquiryType(option.value)}
                                className="sr-only"
                              />
                              <span
                                className={`mt-1 block w-3 h-3 rounded-full border transition-colors ${
                                  selected
                                    ? "border-gold bg-gold"
                                    : "border-forest/30 group-hover:border-forest/60"
                                }`}
                                aria-hidden
                              />
                              <span className="block">
                                <span className="block font-serif text-lg text-forest leading-tight">
                                  {option.label}
                                </span>
                                <span className="block font-sans text-sm text-forest/60 mt-1">
                                  {option.description}
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-widest font-sans text-forest/60 mb-3"
                      >
                        Your message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent border border-forest/15 p-4 font-sans text-forest placeholder:text-forest/30 focus:outline-none focus:border-gold transition-colors resize-none"
                        placeholder="Tell us a little about what you are looking for..."
                      />
                    </div>
                  </div>

                  {errorMessage ? (
                    <p
                      className="text-sm font-sans text-red-700"
                      role="alert"
                    >
                      {errorMessage}
                    </p>
                  ) : null}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="group relative inline-flex items-center justify-center bg-forest text-cream px-12 py-5 font-sans text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-forest transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>
                        {mutation.isPending ? "Sending..." : "Send Inquiry"}
                      </span>
                      <span
                        className="ml-4 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                    <p className="mt-6 text-xs font-sans text-forest/50 max-w-sm leading-relaxed">
                      By sending this inquiry you consent to be contacted
                      privately by the Catch Future atelier.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
