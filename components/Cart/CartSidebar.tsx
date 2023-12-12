import React from "react";
import { useToast } from "../ui/use-toast";

const CartSidebar = () => {
	const toast = useToast();
	toast({
		title: "Account created.",
		description: "We've created your account for you.",
		status: "success",
		duration: 9000,
		isClosable: true,
	});
	const showToast = (props) => {
		toast.toast(props);
	};

	showToast({ title: "Hello", status: "success" });

	return <div>Enter</div>;
};

export default CartSidebar;
