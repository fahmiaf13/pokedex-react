import Lottie from "lottie-react";
import IconLoading from "@/assets/img/loading.json";

export default function Loading() {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div className="w-screen fixed h-screen bg-secondary top-0 left-0 flex justify-center items-center z-10">
      <Lottie animationData={IconLoading} loop={true} style={style} />
    </div>
  );
}
