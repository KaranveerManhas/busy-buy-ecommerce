import Form from 'react-bootstrap/Form';



export const FilterComponent = (props) => {

    const {priceRange, setPriceRange, setCategories} = props;

    const categories = [
        "Jewelry", 
        "Electronics", 
        "Men's Clothing",
        "Women's Clothing"
    ]

    const handleChange = (e,category) => {
        
        if(category === "Jewelry"){
            setCategories((prevCategories) => ({
                ...prevCategories,
                jewelry: e.target.checked
            }))
        }
        if(category === "Women's Clothing"){
            setCategories((prevCategories) => ({
                ...prevCategories,
                womensClothing: e.target.checked
            }))
        }
        if(category === "Electronics"){
            setCategories((prevCategories) => ({
                ...prevCategories,
                electronics: e.target.checked
            }))
        }
        if(category === "Men's Clothing"){
            setCategories((prevCategories) => ({
                ...prevCategories,
                mensClothing: e.target.checked
            }))
        }
        
    }
    
    return (
        <aside className="pt-3 p-4 mt-5 text-center w-md-25 bg-body-secondary position-sticky start-0 rounded-4" style={styles.aside}>
            <p className="mb-3 fs-3 fw-semibold">Filters</p>
            <Form className="d-flex flex-column p-2">
                <Form.Label>Price: {priceRange}</Form.Label>
                <input type="range" name="price_range" id="priceRange" min={1} max={1099} step={1} onChange={(e)=>setPriceRange(e.target.value)} />
                <div className="category mt-3">
                    <Form.Label className="mb-3 fw-semibold fs-4">Categories</Form.Label>
                    {categories.map((category, index) => 
                        <Form.Check
                        key={index}
                        type='checkbox'
                        id={category}
                        label={category}
                        className="text-start fs-5"
                        onChange={(e)=>handleChange(e,category)}
                        />
                    )}
                </div>
            </Form> 
        </aside>
    )

}


const styles = {
    aside: {
        height: "fit-content",
        top: "100px",
        minWidth: "200px"
    }
}

