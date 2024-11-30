import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export default function HeroSection() {
    return (
        <section className='flex flex-col items-center justify-center leading-6 mt-[3rem]' aria-label="Invoice Management Platform">
            <h1 className={`${TITLE_TAILWIND_CLASS} scroll-m-20 font-semibold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white`}>
                Streamline Your Business with Smart Client & Invoice Management
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 text-center mt-2 dark:text-gray-400">
                The all-in-one platform that helps you manage clients, create professional invoices, and get paid faster
            </p>
            <div className="flex justify-center items-center gap-3">
                <Link href="/dashboard" className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
                        Start Free Trial
                    </Button>
                </Link>

                <Link href="/pricing" className="mt-5">
                    <Button variant="outline" className="flex gap-1">
                        View Pricing
                        <ArrowRight className='w-4 h-4' aria-hidden="true" />
                    </Button>
                </Link>
            </div>
            <div className="flex gap-4 mt-6 items-center justify-center text-sm text-gray-500">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    14-day free trial
                </div>
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    No credit card required
                </div>
            </div>
            <div>
                <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
                    <div className="relative rounded-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
                            alt="Invoice Management Dashboard"
                            width={1100}
                            height={550}
                            priority={true}
                            className="block rounded-[inherit] border object-cover shadow-lg dark:hidden"
                        />
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
                            width={1100}
                            height={550}
                            alt="Invoice Management Dashboard Dark Mode"
                            priority={true}
                            className="dark:block rounded-[inherit] border object-cover shadow-lg hidden"
                        />
                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                </div>
            </div>
        </section>
    )
}