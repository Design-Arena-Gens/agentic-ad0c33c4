'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
  delay: number
}

const MetricCard = ({ title, value, change, trend, icon, delay }: MetricCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={styles.metricCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.cardGlow}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      <div className={styles.cardHeader}>
        <motion.span
          className={styles.icon}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {icon}
        </motion.span>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <motion.div
        className={styles.cardValue}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.div>
      <div className={styles.cardChange}>
        <motion.span
          className={`${styles.changeBadge} ${trend === 'up' ? styles.up : styles.down}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {trend === 'up' ? '↑' : '↓'} {change}
        </motion.span>
        <span className={styles.changeLabel}>vs last month</span>
      </div>
    </motion.div>
  )
}

const ChartBar = ({ value, label, delay, max }: { value: number; label: string; delay: number; max: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const height = (value / max) * 100

  return (
    <motion.div
      className={styles.chartBar}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.barFill}
        initial={{ height: 0 }}
        animate={{ height: `${height}%` }}
        transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scaleY: 1.05, originY: 1 }}
      >
        <motion.div
          className={styles.barGlow}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className={styles.barValue}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {value}k
      </motion.div>
      <div className={styles.barLabel}>{label}</div>
    </motion.div>
  )
}

const ActivityItem = ({ icon, text, time, delay }: { icon: string; text: string; time: string; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={styles.activityItem}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.activityIcon}
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 10 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <div className={styles.activityText}>
        <div className={styles.activityDescription}>{text}</div>
        <motion.div
          className={styles.activityTime}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
        >
          {time}
        </motion.div>
      </div>
      <motion.div
        className={styles.activityIndicator}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? 1 : 0.5
        }}
        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
      />
    </motion.div>
  )
}

const ToggleSwitch = ({ label, delay }: { label: string; delay: number }) => {
  const [isOn, setIsOn] = useState(false)

  return (
    <motion.div
      className={styles.toggleContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className={styles.toggleLabel}>{label}</span>
      <motion.div
        className={`${styles.toggleSwitch} ${isOn ? styles.on : ''}`}
        onClick={() => setIsOn(!isOn)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={styles.toggleHandle}
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          animate={{
            x: isOn ? 24 : 0,
            rotate: isOn ? 360 : 0
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const chartData = [
    { value: 45, label: 'Mon' },
    { value: 62, label: 'Tue' },
    { value: 38, label: 'Wed' },
    { value: 71, label: 'Thu' },
    { value: 55, label: 'Fri' },
    { value: 68, label: 'Sat' },
    { value: 52, label: 'Sun' },
  ]

  const maxValue = Math.max(...chartData.map(d => d.value))

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.backgroundPattern}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className={styles.headerLeft}>
          <motion.h1
            className={styles.title}
            whileHover={{ scale: 1.02 }}
          >
            Dashboard
          </motion.h1>
          <motion.div
            className={styles.time}
            key={time.toLocaleTimeString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {time.toLocaleTimeString()}
          </motion.div>
        </div>
        <motion.button
          className={styles.headerButton}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(88, 101, 242, 0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ⚙
          </motion.span>
        </motion.button>
      </motion.header>

      <div className={styles.metricsGrid}>
        <MetricCard
          title="Total Revenue"
          value="$45,231"
          change="12.5%"
          trend="up"
          icon="💰"
          delay={0.1}
        />
        <MetricCard
          title="Active Users"
          value="8,456"
          change="8.2%"
          trend="up"
          icon="👥"
          delay={0.2}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.24%"
          change="2.1%"
          trend="down"
          icon="📊"
          delay={0.3}
        />
        <MetricCard
          title="Avg. Session"
          value="4m 32s"
          change="15.3%"
          trend="up"
          icon="⏱"
          delay={0.4}
        />
      </div>

      <div className={styles.mainGrid}>
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className={styles.cardTitleBar}>
            <h2 className={styles.sectionTitle}>Weekly Performance</h2>
            <motion.div
              className={styles.chartLegend}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.legendDot} />
              Active Sessions
            </motion.div>
          </div>
          <div className={styles.chart}>
            {chartData.map((data, i) => (
              <ChartBar
                key={data.label}
                value={data.value}
                label={data.label}
                delay={0.6 + i * 0.1}
                max={maxValue}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.activityCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            <ActivityItem
              icon="🎯"
              text="New milestone reached"
              time="2 minutes ago"
              delay={0.7}
            />
            <ActivityItem
              icon="📈"
              text="Sales increased by 15%"
              time="1 hour ago"
              delay={0.8}
            />
            <ActivityItem
              icon="👤"
              text="New user registered"
              time="3 hours ago"
              delay={0.9}
            />
            <ActivityItem
              icon="💬"
              text="5 new messages received"
              time="5 hours ago"
              delay={1.0}
            />
            <ActivityItem
              icon="🔔"
              text="System update completed"
              time="8 hours ago"
              delay={1.1}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.settingsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className={styles.sectionTitle}>Quick Settings</h2>
          <div className={styles.settingsList}>
            <ToggleSwitch label="Email Notifications" delay={0.8} />
            <ToggleSwitch label="Dark Mode" delay={0.9} />
            <ToggleSwitch label="Auto-save" delay={1.0} />
            <ToggleSwitch label="Analytics Tracking" delay={1.1} />
          </div>

          <motion.button
            className={styles.primaryButton}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 40px rgba(88, 101, 242, 0.4)'
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Export Data →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={styles.footerText}
        >
          Designed with engineered micro-interactions
        </motion.div>
      </motion.footer>
    </div>
  )
}
