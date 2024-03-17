import logo from "../assets/Logo.png";

const Logo = ({ text, width }: { text: string, width:string }) => {
  return (
    <div className="flex items-center gap-5 sm:gap-7">
      <img src={logo} alt="logo" className={`${width} invert`} />
      <p className={`${text} font-semibold sm:font-bold text-white tracking-wide`}>
        SocialSync
      </p>
    </div>
  );
};

export default Logo;
