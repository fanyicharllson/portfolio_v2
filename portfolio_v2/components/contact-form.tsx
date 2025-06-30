import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/hooks/useContactForm"; // <-- import your hook

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMutation = useContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    contactMutation.mutate(form, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>
        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={5}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
