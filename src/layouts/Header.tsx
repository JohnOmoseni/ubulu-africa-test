import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Logo } from "../constants/icons";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
			className="sticky top-0 bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.04)] z-10 w-full"
			style={{ height: "var(--header-sheight)" }}
		>
			<div className="h-full row-flex-btwn gap-6 py-2.5 px-3 sm:py-3 sm:px-4 mx-auto w-[90%]">
				<div className="row-flex-start gap-3">
					<SidebarTrigger />

					<Link to="/" className="">
						<Logo className="w-[128px] h-fit" />
					</Link>
				</div>

				<h3 className="flex-1 text-end capitalize">Ubulu Test Assessment</h3>
			</div>
		</header>
	);
}

export default Header;
