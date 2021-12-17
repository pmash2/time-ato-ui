import logo from "../assets/tomato.svg";
import "../style/logo.css";

interface Props {
  spinning: boolean;
}

export const Logo = ({ spinning }: Props) => {
  let classes: string[];
  classes = ["App-logo"];

  if (spinning) classes.push("App-logo-spinning");

  let classList = classes.join(" ");

  return <img src={logo} className={classList} alt="logo" id="logo" />;
};
