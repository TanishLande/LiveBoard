import Image from 'next/image';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-4">
      {/* Animated Logo */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src="/logo.svg"
          alt="Logo"
          height={120}
          width={120}
        />
      </motion.div>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-gray-700 rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: i * 0.3, repeat: Infinity, repeatDelay: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
