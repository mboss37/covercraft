import type {NextPage} from 'next';
import Form from "@/app/workflow/Form";

const CvGenerator: NextPage = () => {
    return (
        <div className="flex flex-grow w-full max-w-5xl min-h-screen px-5 py-16 mx-auto overflow-auto md:py-24 2xl:py-44 2xl:h-full">
            <Form/>
        </div>
    );
}
export default CvGenerator;