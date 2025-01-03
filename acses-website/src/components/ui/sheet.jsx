import React from 'react';

export const Sheet = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <div className="sheet-overlay">
      <div className="sheet-content">
        {children}
        <button onClick={() => onOpenChange(false)}>Close</button>
      </div>
    </div>
  );
};

export const SheetContent = ({ children }) => <div>{children}</div>;
export const SheetTrigger = ({ children, asChild }) => children;
