import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const Footer = ({ isVisible }: { isVisible: boolean }) => {
	const footerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateHeaderHeight = () => {
			if (footerRef.current) {
				document.documentElement.style.setProperty(
					"--footer-height",
					`${footerRef.current.offsetHeight}px`
				);
			}
		};

		updateHeaderHeight();
		window.addEventListener("resize", updateHeaderHeight);

		return () => window.removeEventListener("resize", updateHeaderHeight);
	}, []);

	return (
		<footer
			ref={footerRef}
			className={cn(
				"bg-background md:hidden w-full z-[300] fixed inset-0 top-auto drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)] border-t border-border",
				"transition-transform duration-300",
				!isVisible && "max-md:translate-y-full"
			)}
		></footer>
	);
};

export default Footer;
