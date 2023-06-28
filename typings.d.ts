
// Type for the event parameter in the handleInputChange function
export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

// Type for the event parameter in the handleSubmit function
export type FormSubmitEvent = FormEvent<HTMLFormElement>;

// Type for the FormData object
interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    jobTitle: string;
    workload: string;
    companyName: string;
    jobDescription: string;
}