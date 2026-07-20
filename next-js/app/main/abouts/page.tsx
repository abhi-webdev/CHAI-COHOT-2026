import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
function AboutPage() {
  return (
    <div>
      <Link href={"/main/contact"}>Go to contact Page</Link>
      <div>--------------------------------</div>
      <Link href={"/products/1"}>Go to Product Detail Page</Link>

      <Image 
        src="https://chaicode.com/assets/white-2-pi8ziUjj.webp"
        alt="travel"
        width={200}
        height={200}
        />
    </div>
  )
}

export default AboutPage