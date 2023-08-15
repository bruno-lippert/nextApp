
export type ProductType = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  inStock: number
}

export const fetchProducts = async () => {
  const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`).then(res => res.json())
  return products
}

// export const fetchProduct = async (id: string | number) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products/${id}`);

//     if (!response.ok) {
//       // Se a resposta não for bem-sucedida, lance um erro ou retorne um valor padrão aqui
//       throw new Error("Erro na solicitação da API");
//     }

//     const product: ProductType = await response.json();
//     return product;
//   } catch (error) {
//     console.error(error);
//     // Lidar com o erro de forma apropriada, pode ser útil lançar um erro personalizado ou retornar um valor padrão
//     throw new Error("Erro ao obter os detalhes do produto");
//   }
// }