import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { clearError } from "../redux/slices/error.slice";

export default function Error() {
  const { error } = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [error, dispatch]);

  return (
    error && (
      <motion.div
        className="bg-red-50 border-red-600 text-red-600 fixed top-2 left-2 border-l-4 p-4 rounded-md"
        role="alert"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </motion.div>
    )
  );
}
