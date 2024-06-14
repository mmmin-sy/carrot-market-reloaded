"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import {useFormState} from "react-dom";
import {login} from "@/app/login/actions";
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
export default function LogIn() {
	// server action
	const [state, action] = useFormState(login, null)
	return (
			<div className="flex flex-col gap-10 py-8 px-6">
				<div className="flex flex-col gap-2 *:font-medium">
					<h1 className="text-2xl">안녕하세요!</h1>
					<h2 className="text-xl">Log in with email and password.</h2>
				</div>
				<form className="flex flex-col gap-3" action={action}>
					<FormInput name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
					<FormInput
							name="password"
							type="password"
							placeholder="Password"
							required
							minLength={PASSWORD_MIN_LENGTH}
							errors={state?.fieldErrors.password}
					/>
					<FormButton text="Log in" />
				</form>
				<SocialLogin />
			</div>
	);
}
