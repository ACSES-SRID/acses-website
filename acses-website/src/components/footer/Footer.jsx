import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t flex justify-center">
      <div className="container px-4 md:px-6 py-12 bg-acses-green-500 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About ACSES</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  History
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Mission & Vision
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Leadership
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Computer Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Course Catalog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Research
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Association of Computer Science and
            Engineering Students (ACSES). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
