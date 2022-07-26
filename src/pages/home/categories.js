import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from 'features/categorySlice';

export function Categories() {
    const navigate = useNavigate();
    const { categoryList, error, loading } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
           await (dispatch(fetchCategories()));
        })();
    }, [dispatch])

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
