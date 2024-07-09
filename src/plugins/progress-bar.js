
import ProgressBar from "@aacassandra/vue3-progressbar";

const ProgressBarOptions = {
    color: "rgb(67 138 255)",
    failedColor: "rgb(67 138 255)",
    thickness: "3px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
    autoFinish: false,
};

export {
    ProgressBarOptions,
    ProgressBar
}