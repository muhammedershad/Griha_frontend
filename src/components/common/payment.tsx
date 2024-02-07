import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(`${import.meta.env.VITE_FIREBASE_API_KEY}`);

