import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Stripe from 'stripe'
import { HomeContainer, Product } from '@/styles/pages/home'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string,
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  return (
    <HomeContainer>
      <Product>
        <Image src={} width={520} height={480} alt='' />
        <footer>
          <strong>Camiseta XXX</strong>
          <span>Camiseta XXX</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100)
    }
  })

  return {
    props: {
      products
    }
  }
}
