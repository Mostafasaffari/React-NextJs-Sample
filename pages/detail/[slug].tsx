import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <h1>Detail {slug}</h1>;
};

export default Detail;
