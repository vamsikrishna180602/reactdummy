import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 mb-2 rounded-md ">
  <button
    className="w-full py-4 text-left flex justify-between items-center  hover:bg-gray-200 rounded-md p-2"
    onClick={() => setIsOpen(!isOpen)}
  >
    <span className="text-lg font-semibold">{title}</span>
    <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
  </button>
  {isOpen && <div className="p-4 bg-white shadow-md rounded">{children}</div>}
</div>
  )
};

export default Accordion;
