type IncreaseQuantityButtonProps = {
	handler: () => void;
};

const IncreaseQuantityButton = ({ handler }: IncreaseQuantityButtonProps) => {
	return (
		<button
			onClick={handler}
			className="flex items-center justify-center px-3 font-bold text-white bg-[#61d37f] 
      transition duration-300 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-90
      "
		>
			+
		</button>
	);
};

export default IncreaseQuantityButton;
