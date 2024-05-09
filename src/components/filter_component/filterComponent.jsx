import Form from 'react-bootstrap/Form';
import { useState } from 'react';


export const FilterComponent = () => {

    const [range, setRange] = useState(0);

    const categories = ["Jewelry", "Electronics", "Men's Clothing", "Women's Clothing"]

    const handleChange = (e) => {
        setRange(e.target.value);
    }

    return (
        <aside className="pt-3 p-4 mt-5 text-center w-md-25 bg-body-secondary position-sticky start-0 rounded-4" style={styles.aside}>
            <p className="mb-3 fs-3 fw-semibold">Filters</p>
            <Form className="d-flex flex-column p-2">
                <Form.Label>Price: {range}</Form.Label>
                <input type="range" name="price_range" id="priceRange" min={0} max={10000} step={1} onChange={handleChange} />
                <div className="category mt-3">
                    <Form.Label className="mb-3 fw-semibold fs-4">Categories</Form.Label>
                    {categories.map((category, index) => 
                        <Form.Check
                        key={index}
                        type='checkbox'
                        id={category}
                        label={category}
                        className="text-start fs-5"
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

