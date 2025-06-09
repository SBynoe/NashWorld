import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'


export default function Page() {
  return (
    <div className="flex flex-row items-start gap-6 w-[1080px]">
      <div className="flex-1">
        <div className="w-[500px]">
          <h1 className="text-5xl font-bold mb-2">About</h1>
          <p className="text-xl text-gray-400 mb-4">My Story</p>
          <p className="mb-4 font-medium">
            My name is Syd, a passionate computer science graduate with a deep interest in music technology, AI, and immersive front-end development.
          </p>
          <p className="mb-8">
            On the side, I play bass guitar for a local church and use the Nashville Number System frequently there. The goal of this project was to create a safe space for individuals similar to me - those who struggle to learn and adapt to the Nashville Number System.
          </p>
          {/* <div className="my-8">
          <BlogPosts />
        </div> */}
          <div>
            <h2 className="text-2xl font-semibold mb-1">
              Contact Me
            </h2>
            <form className="flex flex-col gap-2">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Message" />
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send</button>
            </form>
          </div>

        </div>
      </div>
      <div>
        <Image
          src="/images/syd.png"
          width={320}
          height={380}
          alt="Syd on Bass"
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
