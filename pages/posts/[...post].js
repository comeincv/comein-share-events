import Head from "next/head";
import axiosInstance from "../../comeInApi/axiosInstance";
import { useEffect } from "react";

const Post = ({ postData, postType }) => {
  const { dados } = postData;

  const getPostPath = () => {
    const postName = dados.nome
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .replaceAll("/", "_")
      .replaceAll(".", "");

    return `/${postType}/${dados.id}/${postName}`;
  };

  useEffect(() => {
    if (dados) {
      window.location.href = "https://comein.cv" + getPostPath();
    }
  }, [dados]);

  return (
    <div>
      {dados && (
        <Head>
          <title>{dados.nome}</title>
          <meta
            property="og:image"
            content={`https://comein.cv/comeincv/server/src/${postType}Img/${dados.imagem}`}
          />
        </Head>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { post } = context.query;

  const [postType, postId] = post;

  try {
    const response = await axiosInstance.get(`/${postType}/listar/${postId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return {
      props: {
        postData: response.data,
        postType: postType,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        postData: null,
      },
    };
  }
}

export default Post;
