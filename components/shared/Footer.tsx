import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href={'/'}>
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={40}
          />
        </Link>
        © Rendez 2024. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
