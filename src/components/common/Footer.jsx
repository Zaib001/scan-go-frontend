const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Scan & Go. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
