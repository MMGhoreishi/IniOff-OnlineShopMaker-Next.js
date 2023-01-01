import Head from "next/head";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <meta content="" name="description" />
        <meta content="" name="keywords" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* Vendor CSS Files */}
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />

        {/* Template Main CSS File */}
        <link href="/assets/css/style-manager.css" rel="stylesheet" />
      </Head>
      {children}
    </>
  );
};

export default AdminLayout;
