import React from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h2 className="py-6">This is the test page</h2>
      <div>
        <a href="https://placehold.co/728x90" target="_blank">
          <img src="https://placehold.co/728x90" alt="Your Title" />
        </a>
      </div>
    </div>
  );
}
