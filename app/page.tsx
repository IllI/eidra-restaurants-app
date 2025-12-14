'use client'

import { useRouter } from 'next/navigation'
import RestaurantsScreen from '@/components/pages/RestaurantsScreen'

export default function Home() {
  const router = useRouter()

  return <RestaurantsScreen />
}
