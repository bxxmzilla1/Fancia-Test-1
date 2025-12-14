import React, { useState } from 'react';
import { useInstallPrompt } from '../context/InstallPromptContext';

interface InstallButtonProps {
  variant?: 'button' | 'banner' | 'icon';
  className?: string;
}

const InstallButton: React.FC<InstallButtonProps> = ({ variant = 'button', className = '' }) => {
  const { isInstallable, isInstalled, installApp } = useInstallPrompt();
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  if (isInstalled) {
    return null;
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = () => {
    if (isIOS && !isInstallable) {
      setShowIOSInstructions(true);
      setTimeout(() => setShowIOSInstructions(false), 5000);
    } else {
      installApp();
    }
  };

  if (variant === 'banner' && isMobile && (isInstallable || isIOS)) {
    return (
      <div className={`fixed bottom-20 left-0 right-0 md:hidden bg-primary-500 text-white p-3 shadow-lg z-40 border-t border-primary-600 ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate">Install Fanciaga</p>
              <p className="text-xs text-primary-100 truncate">
                {isIOS ? 'Add to Home Screen' : 'Quick access & offline mode'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-3 py-1.5 bg-white text-primary-500 rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm flex-shrink-0"
          >
            {isIOS ? 'Add' : 'Install'}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'icon' && isInstallable) {
    return (
      <button
        onClick={handleClick}
        className={`p-2 text-primary-500 hover:bg-primary-500/10 rounded-lg transition-colors ${className}`}
        aria-label="Install app"
        title={isIOS ? 'Add to Home Screen' : 'Install App'}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </button>
    );
  }

  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium shadow-md hover:shadow-lg ${className}`}
        aria-label="Install app"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span className="hidden sm:inline">
          {isIOS ? 'Add to Home Screen' : isAndroid ? 'Install App' : 'Install'}
        </span>
        <span className="sm:hidden">Install</span>
      </button>
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-bold mb-4">Add to Home Screen</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Tap the Share button <span className="font-semibold">(square with arrow)</span> at the bottom</li>
              <li>Scroll down and tap <span className="font-semibold">"Add to Home Screen"</span></li>
              <li>Tap <span className="font-semibold">"Add"</span> in the top right</li>
            </ol>
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="mt-4 w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;

