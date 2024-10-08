
 import { useState, useEffect } from 'react'
 import { motion, AnimatePresence } from 'framer-motion'
 import { supabase } from '../config/supabase'
import {  useLocation, useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/Background_Image.jpg'
 
 
 export default function ModernAuthComponent() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [name, setName] = useState('')
   const [isLogin, setIsLogin] = useState(true)
   const [isLoading, setIsLoading] = useState(false)
   const [isDarkMode, setIsDarkMode] = useState(false)
   const location =useLocation();
   const navigate = useNavigate()
   const {setIslogout} =location.state || {};
 
   useEffect(() => {
     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
       if (session) {
        setIslogout(session.user);
        navigate('/');
       }
     })
 
     return () => {
       if (authListener) {
         authListener.subscription.unsubscribe()
       }
     }
   }, [navigate])
 
   const handleSignUp = async () => {
     setError('')
     setIsLoading(true)
     if (!name || !email || !password) {
       setError('Please fill in all fields.')
       setIsLoading(false)
       return
     }
 
     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
       email,
       password,
     })
 
     if (signUpError) {
       setError(signUpError.message)
     } else {
       const { error: insertError } = await supabase.from('profiles').insert({
         id: signUpData.user.id,
         name,
         email,
       })
 
       if (insertError) {
         setError(insertError.message)
       } else {
         alert('Signup successful! Please check your email for confirmation.')
       }
     }
     setIsLoading(false)
   }
 
   const handleLogin = async () => {
     setError('')
     setIsLoading(true)
     if (!email || !password) {
       setError('Please enter your email and password.')
       setIsLoading(false)
       return
     }
 
     const { error: loginError } = await supabase.auth.signInWithPassword({
       email,
       password,
     })
 
     if (loginError) {
       setError(loginError.message)
     } else {
      setIslogout(loginData.user);
       alert('Login successful!')
     }
     setIsLoading(false)
   }
 
   const handleGoogleLogin = async () => {
     const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
     if (error) setError(error.message)
   }
 
   const toggleLoginSignup = () => {
     setIsLogin((prev) => !prev)
     setError('')
   }
 
   const toggleDarkMode = () => {
     setIsDarkMode((prev) => !prev)
   }
 
   return (
    //  <div className={`min-h-screen flex justify-center items-center p-4 bg-cover bg-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : ''}`} style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}>
    <div
    className={`min-h-screen flex justify-center items-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : ''}`}
    style={{
      backgroundImage: isDarkMode ? 'none' : `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
       <div className="absolute inset-0 bg-black opacity-50"></div>
       <motion.div
         className={`p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 backdrop-blur-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
       >
         <motion.h1
           className="text-4xl font-bold mb-6 text-center"
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
         >
           {isLogin ? 'Welcome Back' : 'Create Account'}
         </motion.h1>
 
         <AnimatePresence mode="wait">
           {error && (
             <motion.p
               className="text-red-500 mb-4 text-center"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
               {error}
             </motion.p>
           )}
         </AnimatePresence>
 
         <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
           {!isLogin && (
             <div>
               <label className="block text-sm font-medium mb-1" htmlFor="name">
                 Name
               </label>
               <input
                 id="name"
                 type="text"
                 placeholder="Enter your name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
               />
             </div>
           )}
           <div>
             <label className="block text-sm font-medium mb-1" htmlFor="email">
               Email
             </label>
             <input
               id="email"
               type="email"
               placeholder="Enter your email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1" htmlFor="password">
               Password
             </label>
             <input
               id="password"
               type="password"
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
             />
           </div>
         </motion.div>
 
         <motion.div className="mt-6 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
           <motion.button
             onClick={isLogin ? handleLogin : handleSignUp}
             className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-1 ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={isLoading}
           >
             {isLoading ? (
               <motion.div
                 className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mx-auto"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               />
             ) : (
               isLogin ? 'Login' : 'Sign Up'
             )}
           </motion.button>
           <button
             onClick={handleGoogleLogin}
             className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-1 flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
           >
             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
               <path
                 fill="#4285F4"
                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
               />
               <path
                 fill="#34A853"
                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
               />
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
               <path
                 fill="#EA4335"
                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
               />
               <path fill="none" d="M1 1h22v22H1z" />
             </svg>
             Continue with Google
           </button>
         </motion.div>
 
         <motion.p
           className="mt-4 text-center text-sm"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
         >
           {isLogin ? "Don't have an account? " : 'Already have an account? '}
           <button className="text-purple-500 hover:underline focus:outline-none" onClick={toggleLoginSignup}>
             {isLogin ? 'Sign Up' : 'Login'}
           </button>
         </motion.p>
 
         <motion.button
           className={`mt-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
           onClick={toggleDarkMode}
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
         >
           {isDarkMode ? '🌞' : '🌙'}
         </motion.button>
       </motion.div>
     </div>
   )
 }