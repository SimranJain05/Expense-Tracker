import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { clearSuccess } from "../redux/slices/success.slice";

export default function Success() {
  const { success } = useSelector((state) => state.success);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [success, dispatch]);

  return (
    success && (
      <motion.div
        className="bg-green-50 border-green-600 text-green-600 fixed top-2 left-2 border-l-4 p-4 rounded-md"
        role="alert"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <p className="font-bold">Success</p>
        <p>{success}</p>
      </motion.div>
    )
  );
}
