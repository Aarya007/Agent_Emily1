import React, { useState, useEffect } from 'react';
import { ColorPicker, Popover, TextInput } from '@mantine/core';

const MobileColorPicker = ({ 
  value, 
  onChange, 
  label, 
  isDarkMode = false,
  placeholder = "#000000"
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop View: Return the exact original implementation
  if (!isMobile) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className={`w-12 sm:w-16 h-8 sm:h-10 rounded-md cursor-pointer ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          }`}
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base border rounded-md sm:rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder={placeholder}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    );
  }

  // Mobile View: Popover with Wheel and Hex Input
  return (
    <div className="space-y-2">
      <style>
        {`
          .mantine-ColorPicker-thumb {
            transition: transform 0.2s ease;
          }
          .mantine-ColorPicker-thumb[data-active] {
            transform: scale(1.8);
            z-index: 100;
          }
        `}
      </style>
      
      <Popover width={300} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <div className="flex items-center space-x-3 cursor-pointer p-2 border rounded-lg active:scale-95 transition-transform bg-white/5 shadow-sm">
            <div 
              className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner" 
              style={{ backgroundColor: value || '#000000' }}
            />
            <div className="flex-1">
              <span className={`text-xs block font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {label}
              </span>
              <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {value || '#000000'}
              </span>
            </div>
          </div>
        </Popover.Target>
        
        <Popover.Dropdown p="md" className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <div className="space-y-4">
            <ColorPicker
              format="hex"
              value={value || '#000000'}
              onChange={onChange}
              fullWidth
              size="lg"
            />
            
            <div className="pt-2 border-t border-gray-100/10">
              <TextInput
                label="Hex Code"
                placeholder="#000000"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                size="sm"
                styles={{
                  input: {
                    fontFamily: 'monospace',
                    backgroundColor: isDarkMode ? '#374151' : '#fff',
                    color: isDarkMode ? '#f3f4f6' : '#111827',
                    borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
                  },
                  label: {
                    color: isDarkMode ? '#d1d5db' : '#374151',
                    fontSize: '11px',
                    marginBottom: '4px'
                  }
                }}
              />
            </div>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default MobileColorPicker;

