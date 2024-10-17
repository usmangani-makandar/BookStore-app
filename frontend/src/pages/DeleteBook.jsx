import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import { useParams } from 'react-router-dom';


const DeleteBook = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('an error happened')
                console.log(error);

            })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>delete book</h1>
            {loading ? (
                <Spinner />
            ) : ''}
            <div className="flex flex-col item-centre border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <div className="text-2xl">Are you sure you want to delete this book ?</div>
                <button className='p-4 bg-red-600 text-white m-8 w-mid'
                    onClick={handleDeleteBook}>Yes delete it</button>
            </div>
        </div>
    )
}
export default DeleteBook