export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} <span className="font-bold text-yellow-500">Legion</span> Software. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">🔗 LinkedIn</a>
            <a href="#" className="hover:text-blue-400">📘 Facebook</a>
            <a href="#" className="hover:text-blue-400">🐦 Twitter</a>
          </div>
        </div>
      </footer>
    );
  }
  