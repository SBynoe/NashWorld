import Nset from 'components/Nset';
import Link from 'next/link'

export default function Page() {
    const trainingOptions = [
        {
            title: 'Ear Training',
            href: '/ear-training',
            description: 'Detect which notes are playing through an interactive game!',
        },
        {
            title: 'Number System Ear Training',
            href: '/number-system-ear-training',
            description: 'Determine which numbers are being played based on randomized audio input!',
        },
        {
            title: 'Number Calls Training',
            href: '/number-calls-training',
            description: 'Test yourself and your ability to respond to number calls!',
        },
    ];

    return (
        // <section className="p-8 max-w-4xl mx-auto">
        //     <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-800">
        //         Choose Training Method
        //     </h1>
        //     <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        //         {trainingOptions.map(({ title, href, description }) => (
        //             <Link
        //                 key={href}
        //                 href={href}
        //                 className="block p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white hover:bg-gray-50"
        //             >
        //                 <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
        //                 <p className="text-gray-600">{description}</p>
        //             </Link>
        //         ))}
        //     </div>
        // </section>
        <Nset/>
    );
}
