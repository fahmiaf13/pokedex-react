import EmptyIcon from "@/assets/img/empty.json";
import Lottie from "lottie-react";

export default function EmptyAnimation() {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div className="w-auto h-auto">
      <Lottie animationData={EmptyIcon} loop={true} style={style} />
    </div>
  );
}
