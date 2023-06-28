import { FormData } from '../../typings';

export function generateBasePrompt(formObject: FormData, language: string = 'German') {
	const {
		firstname,
		lastname,
		email,
		jobTitle,
		workload,
		companyName,
		jobDescription,
	} = formObject;

	const messages = [
		{
			'role': 'system',
			'content': `You are an AI application expert and assistant specialized in writing professional cover letters. Use the provided information to generate a detailed and effective cover letter text`,
		},
		{
			'role': 'user',
			'content': `
                Details:
                Name: ${firstname} ${lastname}
                Email: ${email}
                Job: ${jobTitle}
                Workload: ${workload}
                Company: ${companyName}
                Job Description: ${jobDescription}
            `,
		},
		{
			'role': 'user',
			'content': `Generate a cover letter (text only) in ${language}. If the job title or description is not serious, respond with "Invalid Job Description in ${language}"`,
		}
	];

	return messages;
}