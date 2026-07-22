import {
  FaUtensils,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
     <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-black shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-2 py-4 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            <FaUtensils />
          </div>

          <div>
            <h2 className="text-md font-bold text-white">
              BlueBite
            </h2>

           
          </div>
        </div>

        <div className="flex gap-4">
          <FaFacebookF className="cursor-pointer text-md text-white hover:text-blue-600" />
          <FaInstagram className="cursor-pointer text-md text-white hover:text-pink-600" />
          <FaTwitter className="cursor-pointer text-md text-white hover:text-sky-500" />
          <FaGithub className="cursor-pointer text-md text-white hover:text-black" />
        </div>
      </div>

    
    </footer>
  );
}

export default Footer;