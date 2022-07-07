import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Categories() {
    const [categoryList, setCategoryList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const { status, data: { categories } } = await axios.get('/api/categories');
                if (status === 200 && categories) {
                    setCategoryList(categories)
                } else {
                    throw new Error('Something went wrong while loading categories, Please try again');
                }
            } catch (error) {
                setCategoryList([]);
                setError(error.message)
            }
            setIsLoading(false);
        })();

        return () => {
            setCategoryList([]);
            setError(false);
            setIsLoading(false);
        }
    }, [])

    const categoryRedirect = (categoryName) => {
        navigate('/explore', { state: { categoryName } });
    }

    if (error) {
        return <h5 className='text_center'>{error}</h5>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h2 className='m-2'>Categories</h2>
            <section className='flex align_center justify_spacebtw p-2 categories'>
                {categoryList.map(({ id, categoryName, img, description, shortForm }) => {
                    return (
                        <section className='home_category flex flex_dcolumn' key={id} onClick={() => categoryRedirect(shortForm)}>
                            <img src={img} alt={description} className='home_category_img pointer' />
                            <span className='home_categoryname p-1 relative_pos pointer'>{categoryName}</span>
                        </section>
                    )
                })}
            </section>
        </>
    )
}
