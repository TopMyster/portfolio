import { motion, AnimatePresence } from 'motion/react'
import './App.css'
import MainContent from './MainContent'
import Footer from './Footer'
export default function App() {
  return (
   <>
      <AnimatePresence>
        <motion.div className='content' 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <MainContent/>
          <Footer/>
        </motion.div>
      </AnimatePresence>
   </>
  )
}

