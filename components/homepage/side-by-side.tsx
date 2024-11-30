import { Computer, Network } from 'lucide-react'
import { FaBusinessTime } from 'react-icons/fa'
import { OrbitingCirclesComponent } from './orbiting-circles'
import { TITLE_TAILWIND_CLASS } from '@/utils/constants'
import { Check } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    name: 'Build faster.',
    description:
      'Get up and running in no time with pre-configured settings and best practices. Say goodbye to setup and focus on what truly matters - building your application.',
    icon: Computer,
  },
  {
    name: 'Focus on business logic.',
    description: 'Concentrate on solving business problems instead of dealing with the repetitive setup.',
    icon: FaBusinessTime,
  },
  {
    name: 'Ready for scale.',
    description: 'Prepare for growth from day one. With built-in optimizations and scalable architecture, your application will be ready to handle increased traffic and complexity.',
    icon: Network,
  },
]

const benefits = [
    "Save 10+ hours per week on invoice management",
    "Get paid 2x faster with automated reminders",
    "Reduce payment delays by 75%",
    "Track all client interactions in one place",
    "Generate professional financial reports instantly",
    "Seamless integration with popular accounting software"
];

export default function SideBySide() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-[1200px] items-center p-4">
        <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">
                Transform Your Business Operations
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                Stop wrestling with spreadsheets and chasing payments. Our platform streamlines your entire client and invoice management workflow, letting you focus on growing your business.
            </p>
            <div className="space-y-4">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex-1 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                    src="/dashboard-preview.png"
                    alt="Dashboard Preview"
                    width={600}
                    height={400}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
            </div>
        </div>
    </div>
  )
}
