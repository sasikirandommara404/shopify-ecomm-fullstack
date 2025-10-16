import toast from "react-hot-toast";


export const showSuccess = (message) => {
  toast.success(message, {
    duration: 1000,
    position: "top-right",
    style: {
      background: "#4BB543",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};


export const showError = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "top-right",
    style: {
      background: "#FF4B4B",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

