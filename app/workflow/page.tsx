import type {NextPage} from 'next';
import Form from "@/app/workflow/Form";

const CvGenerator: NextPage = () => {
    return (
        <div className="flex mx-auto w-full max-w-5xl flex-grow px-5 h-screen pt-16 md:pt-24 2xl:pt-44 2xl:h-full">
            <Form/>
        </div>
    );
}
export default CvGenerator;