"use client"
import { TITLE_TAILWIND_CLASS } from '@/utils/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "../ui/card"
import { Users2, Receipt, CreditCard, BarChart2, Clock, Shield } from 'lucide-react';

const ProjectsData = [
  {
    id: 1,
    name: 'Client Management',
    description: 'Organize client information, track interactions, and manage relationships all in one place',
    icon: <Users2 className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    id: 2,
    name: 'Smart Invoicing',
    description: 'Create and send professional invoices in seconds with customizable templates',
    icon: <Receipt className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    id: 3,
    name: 'Payment Processing',
    description: 'Accept payments online and automatically reconcile invoices',
    icon: <CreditCard className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    id: 4,
    name: 'Financial Insights',
    description: 'Track revenue, outstanding payments, and generate detailed financial reports',
    icon: <BarChart2 className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    id: 5,
    name: 'Automated Reminders',
    description: 'Set up automatic payment reminders and follow-ups for overdue invoices',
    icon: <Clock className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    id: 6,
    name: 'Secure & Compliant',
    description: 'Bank-level security for your data and compliance with financial regulations',
    icon: <Shield className="w-12 h-12 text-blue-500 mb-4" />,
  },
]

const SpringAnimatedFeatures = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:w-[75%]">
      <div className='flex flex-col mb-[3rem]'>
        <h2 className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}>
          Nextjs Starter Kit: Built with the best
        </h2>
        <p className="mx-auto max-w-[500px] text-gray-600 dark:text-gray-400 text-center mt-2 ">
          Your customers deserve a product built with the best technologies in our Nextjs Starter Kit
        </p>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: 'spring',
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border p-6 rounded-md dark:bg-black"
            >
              <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
                {project.icon}
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SpringAnimatedFeatures