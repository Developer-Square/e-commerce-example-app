import React from 'react';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  return (
    <div className="border-t border-gray-300 py-8 text-center text-sm">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
      <span role="img" aria-label="Love">
        ♥
      </span>{' '}
      by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
    </div>
  );
};

export default Footer;
