import Head from "next/head";

const AddTitle = ({ title }) => {
  return (
    <Head>
      <title>اینی آف - {title}</title>
    </Head>
  );
};

export default AddTitle;
