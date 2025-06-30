import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Logo } from "../constants/icons";

function Header() {
	const headerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateHeaderHeight = () => {
			if (headerRef.current) {
				document.documentElement.style.setProperty(
					"--header-height",
					`${headerRef.current.offsetHeight}px`
				);
			}
		};

		updateHeaderHeight();
		window.addEventListener("resize", updateHeaderHeight);

		return () => window.removeEventListener("resize", updateHeaderHeight);
	}, []);

	return (
		<header
			ref={headerRef}
			className="sticky top-0 bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.04)] z-[99] w-full"
			style={{ height: "var(--header-sheight)" }}
		>
			<div className="h-full row-flex-btwn gap-6 py-2.5 px-3 sm:py-3 sm:px-4 mx-auto w-[90%]">
				<Link to="/" className="">
					<Logo className="w-[128px] h-fit" />
				</Link>

				<h3 className="flex-1 text-end capitalize">Ubulu Test Assessment</h3>
			</div>
		</header>
	);
}

export default Header;
