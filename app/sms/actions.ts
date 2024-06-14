"use server";

import {z} from "zod";
import validator from "validator";
import {redirect} from "next/navigation";

const phoneSchema =
		z.string().trim().refine(phone => validator.isMobilePhone(phone, "de-DE"), "Wrong phone format");

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
	token: boolean;
}
export async function smsLogIn(prevState: ActionState, formData: FormData){
	const data = {
		phone: formData.get("phone"),
		token: formData.get("token")
	}
	if(!prevState.token){
		const result = phoneSchema.safeParse(data.phone);
		if(!result.success){
			return {
				token: false,
			}
		} else {
			return {
				token: true
			}
		}
	} else {
		const result = tokenSchema.safeParse(data.token)
		if(!result.success){
			return {
				token: true,
				error: result.error.flatten()
			}
		} else {
			redirect("/")
		}
	}
}