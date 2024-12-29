const LogoTop = () => {
  const title = process.env.REACT_APP_TITLE;
  return (
    <h2 className="text-[#7F55DA]  text-2xl leading-6 font-semibold">
      {title}
    </h2>
  );
};

export default LogoTop;
