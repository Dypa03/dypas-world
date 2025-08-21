import { useState, useEffect } from "react";

// The only AI generated code until now lmao

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <>
      {isVisible && (
        <i
          onClick={scrollToTop}
          className="fa fa-arrow-up cursor-pointer fixed bottom-36 right-12 p-3 rounded-full bg-black bg-opacity-30 transition"
        >
        </i>
      )}
    </>
  );
}
