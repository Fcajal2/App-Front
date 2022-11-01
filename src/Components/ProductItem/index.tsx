import { useState, FC } from "react";
import { Inputs, Product, handleDelete } from "../../App";

const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const [inputs, setInputs] = useState({
    name: product.name,
    brand: product.brand,
    price: product.price,
  });
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Inputs;
    //@ts-ignore
    inputs[name] = e.target.value;
    setInputs({ ...inputs });
  };

  return (
    <div className="d-flex">
      <div key={product.id} className="m-1">
        <div className="bg-primary p-1 flex-column gap-1">
          {!isEditable ? (
            <>
              <p>{product.name}</p>
              <p>{product.brand}</p>
              <p>{product.price}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => setIsEditable(!isEditable)}>Editar</button>
            </>
          ) : (
            <>
              <form>
                <input
                  placeholder={"name"}
                  name={"name"}
                  value={inputs.name}
                  onChange={handleChange}
                />
                <input
                  placeholder={"brand"}
                  name={"brand"}
                  value={inputs.brand}
                  onChange={handleChange}
                />
                <input
                  placeholder={"price"}
                  type={"number"}
                  value={inputs.price}
                  name={"price"}
                  onChange={handleChange}
                />
                <button onClick={() => handleEdit(product.id)}>Confirm</button>
                <button onClick={() => setIsEditable(!isEditable)}>
                  Cancelar
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
