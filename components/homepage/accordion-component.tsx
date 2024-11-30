import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionComponent() {
    return (
        <div className="w-full max-w-[800px]">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does the billing and invoicing system work?</AccordionTrigger>
                    <AccordionContent>
                        Our platform allows you to create professional invoices in minutes using customizable templates. You can set up recurring invoices, automate payment reminders, and accept various payment methods. All payments are automatically reconciled, and you can track payment status in real-time.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I migrate my existing client data?</AccordionTrigger>
                    <AccordionContent>
                        Yes! We provide easy import tools to migrate your existing client data from spreadsheets or other CRM systems. Our support team can assist you with the migration process to ensure a smooth transition.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
                    <AccordionContent>
                        We support all major payment methods including credit cards, bank transfers, and popular payment gateways. You can also enable multiple payment options for your clients to choose from, making it easier for them to pay you.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>How secure is my data?</AccordionTrigger>
                    <AccordionContent>
                        We take security seriously. All data is encrypted using bank-level security standards, and we maintain strict compliance with financial regulations. We perform regular security audits and maintain multiple backups of your data.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger>Do you offer integrations with accounting software?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we integrate with popular accounting software like QuickBooks, Xero, and FreshBooks. This allows for seamless synchronization of your invoices, payments, and client data across all your business tools.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                    <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
                    <AccordionContent>
                        We provide 24/7 customer support through email and chat. Premium plans include priority support and dedicated account managers. We also offer comprehensive documentation, video tutorials, and regular webinars to help you get the most out of our platform.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
