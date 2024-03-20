import Link from 'next/link';

type LessonRef = {
    href: string;
    title: string;
    ready: boolean;
};

const subPagesList: LessonRef[] = [
    {
        href: 'lesson1',
        title: 'Basic about Coordinates',
        ready: true,
    },
    {
        href: 'lesson2',
        title: 'Basic about Coordinates (other v)',
        ready: true,
    },
];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col p-24">
            <h1 className="mb-5 text-5xl">Hands-on Maths Tutorial</h1>

            {subPagesList.map((lessonRef, index) => {
                if (lessonRef.ready) {
                    return (
                        <div className="mb-4 rounded-sm p-4 shadow-sm">
                            <h2 className="text-3xl text-gray-700 transition-all hover:text-4xl">
                                <Link href={lessonRef.href}>
                                    {lessonRef.title}
                                </Link>
                            </h2>
                        </div>
                    );
                }
                return (
                    <div className="mb-4 rounded-sm p-4 shadow-sm">
                        <h2 className="text-3xl text-gray-600">
                            {lessonRef.title}(WIP)
                        </h2>
                    </div>
                );
            })}
        </main>
    );
}
