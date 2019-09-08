import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <h1>this is detail page {slug}</h1>;
};

export default Detail;
