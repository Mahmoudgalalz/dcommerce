import { createFileRoute } from '@tanstack/react-router'
import ProductManager from '../components/ProductManager'

export const Route = createFileRoute('/')({
  component: () => <div><ProductManager/></div>
})