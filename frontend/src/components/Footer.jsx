export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">© 2024 CadastRAR. All rights reserved.</div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-500">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary-500">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
