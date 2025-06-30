import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "./Header";

export default function DashboardLayout() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollRef.current) {
				const currentScrollY = scrollRef.current.scrollTop;

				if (currentScrollY === 0) {
					setIsVisible(true);
				} else if (currentScrollY > lastScrollY) {
					// Scrolling down
					setIsVisible(false);
				} else {
					// Scrolling up
					setIsVisible(true);
				}

				setLastScrollY(currentScrollY);
			}
		};

		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll, {
				passive: true,
			});
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleScroll);
			}
		};
	}, [isVisible, lastScrollY, scrollRef]);

	return (
		<div className="wrapper font-lato max-w-[1100px] mx-auto">
			<Header />
			<Outlet />
			{/* <Footer isVisible={isVisible} /> */}
		</div>
	);
}
