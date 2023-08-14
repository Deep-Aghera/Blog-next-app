import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex flex-row bg-neutral-800  p-4 text-white">
      <div className="w-2/4 md:w-2/3">  
        <Link href="/">
          <span className="text-lg md:text-xl font-semibold">
           About Us
          </span>
        </Link>
      </div>
      <div className="w-2/4 md:w-1/3">
        <Link href="/reading-list">
          <span className="text-lg md:text-xl font-semibold">
            Follow us
          </span>
        </Link>
      </div>
      </div>
  )
}

Footer.propTypes = {}

export default Footer