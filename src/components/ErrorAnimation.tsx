import ErrorIcon from "@/assets/img/error.json";
import Lottie from "lottie-react";

export default function ErrorAnimation() {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div className="w-auto h-auto">
      <Lottie animationData={ErrorIcon} loop={true} style={style} />
    </div>
  );
}
