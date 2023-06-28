import { FormData } from '../../typings';

export function generateBasePrompt(formObject: FormData) {
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
			'content': `You are an AI application expert and assistant specialized in writing professional cover letters. Use the provided information to generate a detailed and effective cover letter in multiple languages.`,
		},
		{
			'role': 'user',
			'content': `
                Personal Details:
                Name: ${firstname} ${lastname}
                Email: ${email}
            
                Job Details:
                Job Title: ${jobTitle}
                Workload: ${workload}
                Company Name: ${companyName}
                Job Description:
                ${jobDescription}
            `,
		},
		{
			'role': 'user',
			'content': `Based on the provided information, please generate a first draft of a cover letter in German.`,
		}
	];

	return messages;
}
