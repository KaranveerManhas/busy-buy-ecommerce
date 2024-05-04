import Form from 'react-bootstrap/Form';
import { useState } from 'react';


export const FilterComponent = () => {

    const [range, setRange] = useState(0);

    const categories = ["Men's Clothing", "Women's Clothing", "Jewelry", "Electronics"]

    const handleChange = (e) => {
        setRange(e.target.value);
    }

    return (
        <aside className="pt-3 p-4 border text-center w-25 bg-body-secondary position-sticky top-50 start-0 rounded-4" style={styles.aside}>
            <p className="mb-3 fs-3 fw-semibold">Filters</p>
            <Form className="d-flex flex-column p-2">
                <Form.Label>Price: {range}</Form.Label>
                <input type="range" name="price_range" id="priceRange" min={0} max={10000} step={1} onChange={handleChange} />
                <div className="category mt-3">
                    {categories.map((category) => 
                        <Form.Check
                        type='checkbox'
                        id={category}
                        label={category}
                        />
                    )}
                </div>
            </Form> 
        </aside>
    )

}


const styles = {
    aside: {
        height: "fit-content"
    }
}

