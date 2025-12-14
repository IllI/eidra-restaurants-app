import styles from './FoodCategoryCard.module.css'

interface FoodCategoryCardProps {
  label: string
  image: string
  isActive?: boolean
  onClick?: () => void
}

export default function FoodCategoryCard({ 
  label, 
  image, 
  isActive, 
  onClick 
}: FoodCategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles['fcc-card']} ${isActive ? styles['fcc-active'] : ''}`}
    >
      <p className={styles['fcc-label']}>
        {label}
      </p>
      <div className={styles['fcc-image-wrapper']}>
        <img src={image} alt={label} className={styles['fcc-image']} />
      </div>
    </div>
  )
}