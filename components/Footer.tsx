import clsx from "clsx";

const Footer = () => {
  return (
    <footer
      className={clsx("relative h-12 bg-slate-800 bottom-0 left-0 right-0")}
    >
      <div className={clsx("flex justify-center h-full items-center")}>
        <h3 className={clsx("text-sm text-slate-200")}>
          © Quentin Aellen 2020
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
