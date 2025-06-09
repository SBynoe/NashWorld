import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'
import Link from 'next/link'



export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter bg-white-500">
        Nashville Number
      </h1>

      <p className="text-gray-500 whitespace-pre-wrap pb-4">
        Nashville Number System made simple! Learn which numbers are being played based on what you play on your instrument.

      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-[1000px] mx-auto">
          <Image
            src="/images/bass.png"
            width={1000}
            height={200}
            alt="Syd on Bass"
            className="rounded-lg object-cover w-full h-[350px] border border-black"
          />
        </div>
      </div>
      <div className="pt-4">
        <Link href="/learn">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:cursor-pointer">Get Started</button>

        </Link>
      </div>
    </section>
  )
}
