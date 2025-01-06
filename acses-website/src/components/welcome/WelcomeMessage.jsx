'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WelcomeSection() {
  const [isHODExpanded, setIsHODExpanded] = useState(false)
  const [isPresidentExpanded, setIsPresidentExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const MotionCard = motion(Card)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-secondary/5">
      <div className="container px-4 md:px-6">
        <motion.h1 
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to ACSES
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <MotionCard 
            className="w-full hover:shadow-lg transition-shadow duration-300 lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="HOD"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle>Message from the HOD</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prof. John Smith
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {isHODExpanded ? (
                  <>
                    Welcome to the Association of Computer Science and Engineering Students (ACSES). 
                    Our department strives for excellence in education and research in the fields of 
                    Computer Science, Engineering, and Data Science. We are committed to nurturing 
                    talented individuals who will shape the future of technology. Our curriculum is 
                    designed to provide a strong foundation in theoretical concepts while also 
                    emphasizing practical skills and industry-relevant knowledge.
                  </>
                ) : (
                  <>
                    Welcome to the Association of Computer Science and Engineering Students (ACSES). 
                    Our department strives for excellence in education and research in the fields of 
                    Computer Science, Engineering, and Data Science. We are committed to nurturing 
                    talented individuals who will shape the future of technology.
                  </>
                )}
              </p>
              <Button 
                variant="link" 
                onClick={() => setIsHODExpanded(!isHODExpanded)}
                aria-expanded={isHODExpanded}
                className="mt-2"
              >
                {isHODExpanded ? 'Read less' : 'Read more'}
              </Button>
            </CardContent>
          </MotionCard>
          <MotionCard 
            className="w-full hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="President"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle>Message from the President</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Jane Doe
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {isPresidentExpanded ? (
                  <>
                    As the President of ACSES, I welcome you to our vibrant community. 
                    Our association represents the diverse talents and aspirations of students 
                    in Computer Science, Engineering, and Data Science. Together, we create 
                    opportunities for growth, learning, and professional development. We organize 
                    various events, workshops, and competitions throughout the year to enhance 
                    your skills and broaden your horizons.
                  </>
                ) : (
                  <>
                    As the President of ACSES, I welcome you to our vibrant community. 
                    Our association represents the diverse talents and aspirations of students 
                    in Computer Science, Engineering, and Data Science. Together, we create 
                    opportunities for growth, learning, and professional development.
                  </>
                )}
              </p>
              <Button 
                variant="link" 
                onClick={() => setIsPresidentExpanded(!isPresidentExpanded)}
                aria-expanded={isPresidentExpanded}
                className="mt-2"
              >
                {isPresidentExpanded ? 'Read less' : 'Read more'}
              </Button>
            </CardContent>
          </MotionCard>
        </div>
      </div>
    </section>
  )
}

