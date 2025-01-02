import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

const stats = [
    {
      title: "Total Students",
      value: 1200,
    },
    {
      title: "Graduates",
      value: 450,
    },
    {
      title: "CE Students",
      value: 800,
    },
    {
      title: "DS Students",
      value: 400,
    },
  ]
  
  const yearlyData = [
    {
      year: "2020",
      "CS&E": 180,
      "DS": 80,
    },
    {
      year: "2021",
      "CS&E": 200,
      "DS": 100,
    },
    {
      year: "2022",
      "CS&E": 220,
      "DS": 120,
    },
    {
      year: "2023",
      "CS&E": 240,
      "DS": 140,
    },
  ]

  function Counter({ value }) {
    const [count, setCount] = useState(0)
  
    useEffect(() => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepValue = value / steps
      let current = 0
  
      const timer = setInterval(() => {
        current += 1
        setCount(Math.min(Math.floor(current * stepValue), value))
        if (current >= steps) clearInterval(timer)
      }, duration / steps)
  
      return () => clearInterval(timer)
    }, [value])
  
    return <span>{count.toLocaleString()}</span>
  }

const Statistics = () => {
  return (
    <section className="py-16 flex justify-center md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          ACSES Statistics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium">{stat.title}</h3>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-bold"
              >
                <Counter value={stat.value} />
              </motion.div>
            </div>
          ))}
        </div>
        <div className="border rounded-lg shadow-md p-4 bg-white">
          <h3 className="text-lg font-medium mb-4">Yearly Student Distribution</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Bar dataKey="CS&E" fill="hsl(200, 70%, 50%)" />
                <Bar dataKey="DS" fill="hsl(100, 70%, 50%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics