import ProductDetails from "@/src/components/ProductDetails";
import Header from "@/src/components/header";
import { ProductType, fetchProducts } from "@/src/services/products";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "reactstrap";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id;

  if (typeof id === "string") {
    const product = (await fetchProducts()).find((prod) => prod.id.toString() === id);

    if (product) {
      return { props: { product }, revalidate: 10 };
    }
  }
  return {
    notFound: true,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()

    const paths = products.map(product => {
        return { params: { id: product.id.toString() } }
    })

    return { paths, fallback: false } // A propriedade fallback está definida como false, o que significa que apenas os caminhos especificados em paths serão pré-renderizados. Se um caminho não estiver presente em paths, o Next.js retornará um erro 404.
}

const Product: NextPage = (props: {
  children?: ReactNode
  product?: ProductType
}) => {
  return (
    <div>
      <Head>
        <title>{props.product!.name}</title>
        <meta name="description" content={props.product!.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container className="mt-5">
        <ProductDetails product={props.product!} />
      </Container>
    </div>
  )
}

export default Product