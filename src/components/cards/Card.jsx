import Button from 'react-bootstrap/Button';


export const CardComponent = ({product}) => {
  return (
    <div className="d-flex justify-content-center flex-wrap rounded-2 p-4 shadow bg-body" style={styles.card}>
      <div style={styles.imageContainer} className="d-flex align-items-center justify-content-center">
        <img src={product.image} alt={product.title} style={styles.image} />
      </div>
      <div style={styles.infoDiv} className="d-flex flex-column justify-content-end">
        <h5 style={styles.title} >{product.title}</h5>
        <h5 className="fw-bold">$ {product.price}</h5>
        <Button variant="primary">Add to Cart</Button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '250px',
    height: "500px",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
  },
  image: {
    width: "170px",
  },
  infoDiv: {
    height: "30%",
    alignSelf: "flex-end"
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}