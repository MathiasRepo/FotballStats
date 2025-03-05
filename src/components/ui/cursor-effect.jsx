import { useEffect, useState } from 'react';

/**
 * Custom cursor effect component that follows the mouse with a subtle red blur
 */
function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check if hovering over interactive elements
    const handleHoverState = (e) => {
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', '.interactive'];
      const target = e.target;
      
      // Check if target or any of its parents match our interactive elements
      let currentElement = target;
      let isInteractive = false;
      
      while (currentElement && !isInteractive) {
        if (interactiveElements.some(selector => {
          return selector.startsWith('.') 
            ? currentElement.classList.contains(selector.substring(1))
            : currentElement.tagName === selector;
        })) {
          isInteractive = true;
        }
        currentElement = currentElement.parentElement;
      }
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverState);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className={`w-8 h-8 rounded-full bg-red-500/30 blur-xl ${
          isHovering ? 'animate-pulse-fast scale-150' : 'animate-pulse'
        }`}
      ></div>
    </div>
  );
}

export default CursorEffect;
