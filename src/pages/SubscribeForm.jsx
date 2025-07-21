import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook to Mailchimp, Brevo, ConvertKit, etc.
    console.log("Subscribed:", email);
    setSubscribed(true);
  };

  return (
    <motion.div
      className="bg-gray-100 p-6 rounded-xl max-w-lg mx-auto shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-3">Join Our Mailing List</h3>
      {subscribed ? (
        <p className="text-green-600">You’ve been subscribed!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Subscribe
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
