import { useFormik } from "formik";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { formConfig } from "@/constants";
import { FormBuilderSchema } from "@/schema/validation";
import { wait } from "@/lib";
import type { InferType } from "yup";
import { useState } from "react";
import FormWrapper from "@/components/forms/FormWrapper";
import Modal from "@/components/ui/components/Modal";

const FormBuilder = () => {
	const [openModal, setOpenModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [data, setData] = useState({});

	const onSubmit = async (
		values: InferType<typeof FormBuilderSchema>,
		actions: any
	) => {
		setIsSubmitting(true);

		try {
			await wait(1000);

			setOpenModal(true);
			setData({ ...values });
			actions.resetForm();
		} catch (error: any) {
			console.log("Error", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			name: "",
			email: "",
			gender: "",
		},
		validationSchema: FormBuilderSchema,
		onSubmit,
	});

	return (
		<>
			<FormWrapper
				btnStyles="w-max"
				containerStyles="max-w-full"
				buttonLabel="Submit"
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			>
				{formConfig?.length > 0 &&
					formConfig.map((field) => {
						const fieldType =
							FormFieldType[
								field.type.toUpperCase() as keyof typeof FormFieldType
							] || FormFieldType.INPUT;

						return (
							<CustomFormField
								key={field.name}
								fieldType={fieldType}
								name={field.name}
								label={field.label}
								onBlur={handleBlur}
								errors={errors}
								touched={touched}
								field={{
									value: (values as Record<string, any>)[field.name],
								}}
								onChange={
									fieldType === FormFieldType.SELECT
										? (value: string) => setFieldValue(field.name, value)
										: handleChange
								}
								selectList={
									fieldType === FormFieldType.SELECT ? field.options : undefined
								}
							/>
						);
					})}
			</FormWrapper>

			<Modal
				openModal={Boolean(openModal && data)}
				setOpenModal={() => {
					setOpenModal(false);
					setData({});
				}}
				modalStyles="!max-w-[400px] !min-h-[220px]"
			>
				<div className="flex-column items-center justify-center gap-6 mt-4">
					<h3 className="text-xl">Submitted Data</h3>
					<ul className="flex-column gap-2">
						{Object.entries(data).map(([key, value]) => (
							<li key={key} className="row-flex-start gap-2">
								<span className="font-semibold min-w-[6ch] capitalize">
									{key}:
								</span>
								<span className=""> {value as string}</span>
							</li>
						))}
					</ul>
				</div>
			</Modal>
		</>
	);
};

export default FormBuilder;
