
import { defineConfig } from 'windicss/helpers'


export default defineConfig({
  //darkMode: 'class', // or 'media'
  attributify: true,
  preflight: false,
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-400 hover:bg-green-700',
    'btn-pink': 'text-white bg-pink-400 hover:bg-pink-700',
    'btn-red': 'text-white bg-red-400 hover:bg-red-700',
    icon: "hover:text-blue-500",
  },
})