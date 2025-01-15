import React, { useState, useEffect } from "react";
import "./../styles/CollapseStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

function Collapse({ title, children }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const chevronOpen = isOpen ? "rotated" : "";
  const contentExpanded = isOpen ? "expanded" : "";

  return (
    <div className="menu_collapse">
      <div className="collapse_container">
        <div className="collapse_title" onClick={toggleCollapse}>
          <span>{title}</span>{" "}
          <span className={`chevron ${chevronOpen}`}>
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </div>
        {isOpen && (
          <div className={`collapse_content ${contentExpanded}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collapse;
