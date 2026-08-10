import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import PropTypes from "prop-types";

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);
  const isRTL = document.documentElement.dir === "rtl";

  return (
    <div ref={selectRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium text-white/90 bg-[#181818]/90 hover:bg-[#222222] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/30 backdrop-blur-md shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-white/70" />
        <span>{selectedOption?.label || value}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 min-w-[130px] ${
            isRTL ? "left-0" : "right-0"
          } bg-[#181818] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl py-1.5 animate-in fade-in zoom-in-95 duration-200`}
        >
          <ul role="listbox" tabIndex={-1}>
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <li
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomSelect;
