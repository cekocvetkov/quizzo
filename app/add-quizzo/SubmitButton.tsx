"use client";

import { experimental_useFormStatus } from "react-dom";

function SubmitButton({ props: { buttonText } }: { props: { buttonText: string } }) {
	const { pending } = experimental_useFormStatus();

	return (
		<div className="submit-button">
			<button disabled={pending} type="submit">
				{buttonText}
			</button>
			{pending ? <div className="loading-delete-submit"></div> : <></>}
		</div>
	);
}

export default SubmitButton;
