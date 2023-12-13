import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			className="mt-10 mb-5 font-bold disabled:cursor-not-allowed"
		>
			{pending ? "Processing..." : "Checkout"}
		</Button>
	);
};

export default SubmitButton;
