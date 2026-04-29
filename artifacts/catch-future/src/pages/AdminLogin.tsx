import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  useAdminLogin,
  getAdminMeQueryKey,
} from "@workspace/api-client-react";
import { fadeInUp } from "@/lib/animations";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const mutation = useAdminLogin({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getAdminMeQueryKey(),
        });
        navigate("/admin");
      },
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutation.isPending || !password) return;
    mutation.mutate({ data: { password } });
  };

  const errorMessage = mutation.isError ? "Incorrect password." : null;

  return (
    <main className="relative min-h-screen w-full bg-forest text-cream weave-texture overflow-hidden flex items-center justify-center px-6 py-24">
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-beige hidden md:block"
        aria-hidden
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute -top-3 -left-3 right-3 bottom-3 border border-gold/40 hidden md:block" />
        <div className="relative bg-cream text-forest p-10 md:p-12 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.25em] font-sans text-gold mb-4">
            Catch Future · Atelier
          </p>
          <h1 className="font-serif text-4xl leading-tight mb-2">
            The <span className="italic">Lookbook</span>.
          </h1>
          <p className="font-sans text-sm text-forest/65 leading-relaxed mb-10">
            A private ledger of every inquiry received from the salon floor.
            Enter the atelier password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-widest font-sans text-forest/60 mb-3"
              >
                Atelier password
              </label>
              <input
                id="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-forest/20 pb-3 font-serif text-lg text-forest placeholder:text-forest/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            {errorMessage ? (
              <p className="text-sm font-sans text-red-700" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative inline-flex items-center justify-center bg-forest text-cream px-10 py-4 font-sans text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-forest transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{mutation.isPending ? "Verifying..." : "Enter"}</span>
              <span
                className="ml-3 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </button>
          </form>
        </div>

        <a
          href="/"
          className="mt-8 block text-center text-xs uppercase tracking-[0.25em] font-sans text-cream/60 hover:text-gold transition-colors"
        >
          ← Return to Catch Future
        </a>
      </motion.div>
    </main>
  );
}
