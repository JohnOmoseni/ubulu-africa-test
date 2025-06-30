import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const iconBgVariants = cva(
	"grid place-items-center leading-none shadow-blur rounded-full",
	{
		variants: {
			iconBgVariant: {
				default: "",
				"show-bg": "size-8 cursor-pointer",
				loader: "size-6 pointer-events-none",
			},
			iconBgColor: {
				default: "bg-background",
				variant: "bg-accent",
			},

			defaultVariants: {
				iconBgVariant: "default",
				iconBgColor: "default",
			},
		},
	}
);

const iconVariants = cva("object-contain icon", {
	variants: {
		iconColor: {
			default: "",
			white: "text-white",
			loader: "text-white",
		},
		iconSize: {
			default: "size-5",
			sm: "size-4 md:size-5",
		},
	},

	defaultVariants: {
		iconColor: "default",
		iconSize: "default",
	},
});

type IconBgVariantsProps = VariantProps<typeof iconBgVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconProps extends IconBgVariantsProps, IconVariantsProps {
	title?: string;
	action?: () => void;
	icon: any;
	className?: string;
	containerClassName?: string;
}

const CustomIcon = forwardRef<any, IconProps>(
	(
		{
			title = "",
			icon: Icon,
			action,
			iconColor,
			iconSize,
			iconBgVariant,
			iconBgColor = "default",
			className,
			containerClassName,
		},
		ref
	) => {
		return (
			<div ref={ref}>
				{iconBgVariant === "show-bg" ? (
					<div
						title={title}
						className={cn(
							iconBgVariants({ iconBgVariant, iconBgColor }),
							containerClassName
						)}
						onClick={() => (action ? action?.() : null)}
					>
						<Icon
							className={cn(
								iconVariants({ iconColor, iconSize }),
								"mt-0.5",
								className
							)}
						/>
					</div>
				) : (
					<Icon
						title={title}
						onClick={() => (action ? action?.() : null)}
						className={cn(iconVariants({ iconColor, iconSize }), className)}
					/>
				)}
			</div>
		);
	}
);

export default CustomIcon;
