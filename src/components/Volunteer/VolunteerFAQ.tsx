'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How much time commitment is required?',
    answer:
      'The time you can give us is what we\'ll work with. For effectiveness and engagement we look at 4-6 hours a month. But, we are flexible.',
  },
  {
    question: 'Do I need prior experience?',
    answer:
      'We are looking for volunteers with a passion to work with children and young adults. Your experience and expertise would be highly beneficial to them.',
  },
  {
    question: 'Is remote volunteering available?',
    answer:
      'We can definitely organise remote online sessions for you to handle although, we would need prior information from you to make the necessary scheduling arrangements.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Please fill in your information below and we will get in touch with you.',
  },
  {
    question: 'What training is provided?',
    answer:
      'Depending on the role you are ready to take on, you will receive training (especially for facilitation for in-classroom sessions). You will also have the opportunity to observe a few sessions before getting started, should you wish to.',
  },
]

export default function VolunteerFAQ() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-tertiary-600">
            Everything you need to know about volunteering with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-[5px] p-8 md:p-12 shadow-lg rounded-none"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="border border-tertiary-200 px-6 py-2 bg-white hover:bg-primary-50/50 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-tertiary hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-tertiary-700 pt-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
