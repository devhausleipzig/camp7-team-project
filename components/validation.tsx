export default function Validation() {
	if (
		typeof input["email"] !== "undefined" &&
		typeof input["confirm_email"] !== "undefined"
	) {
		if (input["email"] != input["confirm_email"]) {
			isValid = false;

			errors["email"] = "Your email address doesn't match.";
		}
	}
}
