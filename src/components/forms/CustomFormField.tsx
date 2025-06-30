import { Input, type InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
import { type FormikErrors, type FormikTouched } from "formik";
import { type FocusEventHandler, type KeyboardEventHandler } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Textarea, type TextareaProps } from "../ui/textarea";
import CustomIcon from "../reuseables/CustomIcon";

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	RADIO = "radio",
	SELECT = "select",
	SKELETON = "skeleton",
}

interface CustomProps {
	name: string;
	field?: InputProps &
		TextareaProps & {
			value: any;
			type?: string;
			placeholder?: string;
		};
	isShowPasswordError?: boolean;
	containerStyles?: string;
	fieldType: FormFieldType;
	label?: string;
	tag?: string;
	iconSrc?: any;
	dir?: "left" | "right";
	disabled?: boolean;
	selectList?: Array<any>;
	labelStyles?: string;
	children?: React.ReactNode;
	errors?: FormikErrors<any>;
	touched?: FormikTouched<any>;
	required?: boolean;
	inputStyles?: string;
	errorStyles?: string;
	selectContainerStyles?: string;
	renderSkeleton?: (field: any) => React.ReactNode;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onChange?: any;
	onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const RenderInput = ({ props }: { props: CustomProps }) => {
	const {
		field,
		fieldType,
		name,
		onBlur,
		onKeyDown,
		onChange,
		inputStyles,
		selectContainerStyles,
		containerStyles,
		iconSrc: IconSrc,
		selectList,
	} = props;
	const placeholder = field?.placeholder ?? "";

	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<>
					{IconSrc && (
						<span className="ml-2.5 mr-1 lblock">
							<CustomIcon
								icon={IconSrc}
								className="w-[19px] h-fit text-foreground-variant"
							/>
						</span>
					)}
					<Input
						name={name}
						{...field}
						value={field?.value as string}
						onChange={onChange}
						onBlur={onBlur}
						onKeyDown={onKeyDown}
						className={cn("!i-reset ", inputStyles)}
					/>
				</>
			);

		case FormFieldType.TEXTAREA:
			return (
				<Textarea
					placeholder={placeholder}
					name={name}
					{...field}
					value={field?.value as string}
					onChange={onChange}
					onBlur={onBlur}
					className={cn(
						"bg-background-200 resize-none border-none focus-visible:border-none focus-visible:ring-0",
						inputStyles
					)}
				/>
			);

		case FormFieldType.SELECT:
			return (
				<Select
					onValueChange={onChange}
					value={field?.value as string}
					defaultValue={field?.value as string}
				>
					<SelectTrigger
						className={cn(
							"border-none shad-trigger focus-visible:border-none focus-visible:ring-0 shadow-none",
							containerStyles
						)}
					>
						<SelectValue
							placeholder={
								<span className="placeholder:text-muted-foreground text-sm">
									{placeholder || "Select"}
								</span>
							}
						/>
					</SelectTrigger>
					<SelectContent className={cn("z-[999]", selectContainerStyles)}>
						{props.children
							? props.children
							: selectList?.map((item, index) => (
									<SelectItem key={index} value={item?.value} className="">
										{item?.label}
									</SelectItem>
							  ))}

						{selectList?.length === 0 && (
							<SelectItem disabled={true} value="no-option" className="w-full">
								No option
							</SelectItem>
						)}
					</SelectContent>
				</Select>
			);

		case FormFieldType.SKELETON:
			return props.renderSkeleton ? props.renderSkeleton(field) : null;

		default:
			return null;
	}
};

const CustomFormField = (props: CustomProps) => {
	const {
		name,
		label,
		labelStyles,
		errors,
		touched,
		containerStyles,
		errorStyles,
		fieldType,
	} = props;

	const result = (
		<>
			{label && (
				<Label className={cn("labelStyles", labelStyles)}>{label}</Label>
			)}

			{fieldType !== FormFieldType.SKELETON ? (
				<div
					className={cn(
						"row-flex-start relative w-full gap-0.5 overflow-hidden bg-background-100 rounded-md border border-input shadow-xs",
						containerStyles,
						errors?.[name] && touched?.[name] && "border-red-400"
					)}
				>
					<RenderInput props={props} />
				</div>
			) : (
				<RenderInput props={props} />
			)}
		</>
	);

	return (
		<div
			className={cn(
				"group w-full",
				errors?.[name] && touched?.[name] ? "is-error flex-column gap-0.5" : ""
			)}
		>
			{result}

			<p
				className={cn(
					"mt-0.5 ml-0.5 transition-sm hidden text-xs w-full font-semibold text-red-500 group-[.is-error]:block group-[.is-error]:animate-in",
					errorStyles
				)}
			>
				{errors?.[name] as string}
			</p>
		</div>
	);
};
export default CustomFormField;
