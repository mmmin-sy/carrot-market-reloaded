
import {z} from	'zod';
import {PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from '@/lib/constants';

const checkUsername = (username: string) => !username.includes("potato")
const checkPassword = ({ password, confirm_password} : {password: string, confirm_password: string}) => password === confirm_password

const formSchema = z.object({
	username: z
			.string({
				invalid_type_error: "Username must be a string!",
				required_error: "Where is my username?"
			})
			.min(5, "Way too short!!")
			.max(10, "Too looooooong!")
			.toLowerCase()
			.trim()
			.refine(checkUsername, "No potato in username!"),
	email: z.string().email(),
	password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
	confirm_password: z.string().min(10)
}).refine(checkPassword, {
	message: "Both passwords should be the same!",
	path: ["confirm_password"]
})
export async function createAccount(prevState: any, formData: FormData){
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirm_password: formData.get("confirm_password"),
	}

	const result = formSchema.safeParse(data);
	// console.log(result.error?.flatten())
	if (!result.success) {
		return result.error.flatten();
	} else {
		console.log(result.data);
	}
	// try {
	// 	formSchema.parse(data);
	// } catch (e){
	// 	console.log(e)
	// }

}