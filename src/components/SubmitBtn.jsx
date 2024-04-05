import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const isSubmitting = useNavigation().state == "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn btn-primary btn-block"
    >
      {isSubmitting ? 
      (
        <>
        <span className="loading loading-spinner">
        </span>
            sending...
        </>
      )
      : (
        text || "Submit"
      )}
    </button>
  );
};

export default SubmitBtn;
